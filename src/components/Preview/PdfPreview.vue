<template>
  <canvas v-if="!state.isError" ref="canvas"> </canvas>

  <img v-else :src="closedCamer" />
</template>

<script setup lang="ts">
import { IPdfPreviewProps } from '@/components/Preview/interface';
import { nextTick, onMounted, reactive, ref, watch } from 'vue';
import pdfWorker from 'pdfjs-dist/build/pdf.worker?url';
import {
  getDocument,
  GlobalWorkerOptions,
  PDFPageProxy,
  RenderTask
} from 'pdfjs-dist';
import cachePdf from '@/helpers/file/cache-pdf';
import closedCamer from '@/assets/images/slider/closed-camera.svg';

defineOptions({
  name: 'PdfPreview'
});

GlobalWorkerOptions.workerSrc = pdfWorker;

const props = defineProps<IPdfPreviewProps>();

const state = reactive<{
  isError: boolean;
  rotate: number;
}>({
  isError: false,
  rotate: 0
});

const canvas = ref<HTMLCanvasElement | null>(null);
let intersenctionObserver: IntersectionObserver | undefined;
let currentRenderTask: RenderTask | null = null;

watch([() => props.src, () => props.page], () => {
  intersenctionObserver?.disconnect();
  clearCanvas();

  state.isError = false;
  // Выполняем после отрисовки, чтобы canvas был доступен
  nextTick(() => {
    init();
  });
});

watch(
  () => props.src,
  () => {
    state.rotate = 0;
  }
);

/**
 * Отрисовывает pdf файл
 */
const setPdf = async (): Promise<void> => {
  try {
    // Если canvas не существует, то выходим
    if (!canvas.value || !props.src) throw new Error('Canvas not found');

    // Отменяем предыдущее рендеринг, если есть
    if (currentRenderTask) {
      currentRenderTask?.cancel();
      currentRenderTask = null;
    }

    // Подгружаем pdf
    let pdf;
    // Если pdf есть в кэше, то берем его
    const cachedPdf = cachePdf.getCache(props.src);
    if (cachedPdf) {
      pdf = cachedPdf;
    } else {
      pdf = await getDocument(props.src).promise;

      // Устанавливаем в кэш
      cachePdf.setCache(props.src, pdf);
    }

    // Если pdf не существует, то выходим
    if (!pdf) throw new Error('Pdf not found');
    // Получаем нужную страницу
    const numberOfPage = props.page ?? 1;
    // Формируем ключ для кэша
    const cacheKey = `${props.src}-${numberOfPage}`;
    // Получаем страницу из кэша
    const cachedPage = cachePdf.getPageCache(cacheKey);

    let page: PDFPageProxy;
    // Если страница есть в кэше, то берем ее
    if (cachedPage) {
      page = cachedPage;
    } else {
      page = await pdf.getPage(numberOfPage);

      // Устанавливаем в кэш страницу
      cachePdf.setPageCache(cacheKey, page);
    }

    // Получаем размеры canvas
    const rect = canvas.value.getBoundingClientRect();

    // viewport при масштабе 1
    const baseViewport = page.getViewport({ scale: 1 });

    // рассчитываем масштаб
    const scaleX = rect.width / baseViewport.width;
    const scaleY = rect.height / baseViewport.height;

    // чтобы полностью влезло (contain)
    const scale = Math.min(scaleX, scaleY);

    const dpr = window.devicePixelRatio || 1;

    // Устаннавливаем масштаб и поворот
    const viewport = page.getViewport({
      scale: scale * dpr,
      rotation: state.rotate
    });

    // Получаем контекст
    const ctx = canvas.value.getContext('2d');

    // Если контекст не существует, то выходим
    if (ctx === null) throw new Error('Context not found');

    // Устанавилваем размеры для canvas
    canvas.value.width = viewport.width;
    canvas.value.height = viewport.height;

    // Рендерим
    const renderTask = page.render({
      canvas: canvas.value,
      canvasContext: ctx,
      viewport
    });

    // Устанавливаем текущий рендеринг
    currentRenderTask = renderTask;

    await renderTask.promise;
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'name' in error &&
      error?.name === 'RenderingCancelledException'
    ) {
      return;
    }

    console.error(error);
    state.isError = true;
  } finally {
    currentRenderTask = null;
  }
};

/**
 * Поворачивает pdf
 * @param deltaAngle
 */
const rotatePdf = async (deltaAngle: number): Promise<void> => {
  try {
    // Если canvas не существует, то выходим
    if (!canvas.value) return;

    // Получаем страницу из кэша
    // Она должна существовать, если мы просматриваем текущий компоент
    const page = cachePdf.getPageCache(`${props.src}-${props.page}`);

    // Если страница не существует, то выходим
    if (!page) return;

    // Получаем контекст
    const ctx = canvas.value.getContext('2d');

    // Если контекст не существует, то выходим
    if (!ctx) return;
    // Расчитываем угол попорота.
    // Округляем его до ближайшего кратного 90
    const angle = Math.round(deltaAngle / 90) * 90;
    // Устанавливаем для компонента угол поворота
    state.rotate += angle;

    // Получаем размеры canvas
    const { width, height } = canvas.value;

    // Очищаем canvas
    ctx.clearRect(0, 0, width, height);

    // Получаем viewport
    const viewprot = page.getViewport({ scale: 1, rotation: state.rotate });

    // Устанавливаем размеры
    canvas.value.width = viewprot.width;
    canvas.value.height = viewprot.height;

    // Рендерим
    const renderTask = page.render({
      canvas: canvas.value,
      canvasContext: ctx,
      viewport: viewprot
    });

    currentRenderTask = renderTask;

    await renderTask.promise;
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'name' in error &&
      error?.name === 'RenderingCancelledException'
    ) {
      return;
    }

    console.error(error);
    state.isError = true;
  } finally {
    currentRenderTask = null;
  }
};

/**
 * Инициализируем компонента
 *
 */
const init = (): void => {
  if (!canvas.value) return;
  // Используем IntersectionObserver для оптимизации и подгрузки контента, когда он входит в зону видимости
  intersenctionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(
      entry => {
        if (entry.isIntersecting) {
          setPdf();

          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '50px'
      }
    );
  });

  intersenctionObserver.observe(canvas.value);
};

/** Очищает canvas */
const clearCanvas = (): void => {
  if (!canvas.value) return;

  const ctx = canvas.value.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
};

defineExpose({
  clearCanvas,
  rotatePdf
});

onMounted(() => {
  init();
});
</script>

<style scoped></style>
