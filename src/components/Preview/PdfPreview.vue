<template>
  <canvas v-if="!state.isError" ref="canvas"> </canvas>

  <img v-else :src="closedCamer" />
</template>

<script setup lang="ts">
import {
  IPdfPreviewEmit,
  IPdfPreviewProps
} from '@/components/Preview/interface';
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
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

const props = withDefaults(defineProps<IPdfPreviewProps>(), {
  resolutionScale: 1
});
const emit = defineEmits<IPdfPreviewEmit>();

const state = reactive<{
  isError: boolean;
  rotate: number;
}>({
  isError: false,
  rotate: 0
});

const canvas = ref<HTMLCanvasElement | null>(null);
let intersenctionObserver: IntersectionObserver | undefined;
let resizeObserver: ResizeObserver | undefined;
let resizeRenderFrame: number | null = null;
let currentRenderTask: RenderTask | null = null;
let displayBounds: { width: number; height: number } | null = null;
let renderRequestId = 0;
let renderedDevicePixelRatio = 0;

const MAX_CANVAS_DIMENSION = 8192;
const MAX_CANVAS_PIXELS = 16_777_216;

const getPdfDocumentSource = async () => {
  if (props.file) {
    const arrayBuffer = await props.file.arrayBuffer();
    return { data: new Uint8Array(arrayBuffer) };
  }

  return props.src;
};

watch([() => props.src, () => props.page], () => {
  intersenctionObserver?.disconnect();
  renderRequestId += 1;
  currentRenderTask?.cancel();
  clearCanvas();
  displayBounds = null;
  renderedDevicePixelRatio = 0;

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

watch(
  () => props.resolutionScale,
  () => {
    if (displayBounds === null) return;

    setPdf(false);
  }
);

const getDisplayBounds = (): { width: number; height: number } => {
  if (!canvas.value) throw new Error('Canvas not found');

  const canvasRect = canvas.value.getBoundingClientRect();
  const parentRect = canvas.value.parentElement?.getBoundingClientRect();
  const width =
    parentRect?.width || canvas.value.offsetWidth || canvasRect.width;
  const height =
    parentRect?.height || canvas.value.offsetHeight || canvasRect.height;

  if (width <= 0 || height <= 0) {
    throw new Error('Canvas has no display size');
  }

  return { width, height };
};

const getOutputScale = (
  width: number,
  height: number,
  requestedScale: number
): number => {
  const dimensionScale = Math.min(
    MAX_CANVAS_DIMENSION / width,
    MAX_CANVAS_DIMENSION / height
  );
  const pixelScale = Math.sqrt(MAX_CANVAS_PIXELS / (width * height));

  return Math.min(requestedScale, dimensionScale, pixelScale);
};

const waitForRenderCancellation = async (): Promise<void> => {
  const renderTask = currentRenderTask;
  if (!renderTask) return;

  renderTask.cancel();

  try {
    await renderTask.promise;
  } catch {
    // RenderingCancelledException — ожидаемый результат отмены.
  }

  if (currentRenderTask === renderTask) {
    currentRenderTask = null;
  }
};

/**
 * Отрисовывает pdf файл
 */
const setPdf = async (recalculateDisplayBounds = true): Promise<void> => {
  const requestId = ++renderRequestId;
  let renderTask: RenderTask | null = null;

  try {
    // Если canvas не существует, то выходим
    if (!canvas.value || !props.src) throw new Error('Canvas not found');

    // Отменяем предыдущее рендеринг, если есть
    await waitForRenderCancellation();

    if (requestId !== renderRequestId) return;

    // Подгружаем pdf
    let pdf;
    // Если pdf есть в кэше, то берем его
    const cachedPdf = cachePdf.getCache(props.src);
    if (cachedPdf) {
      pdf = cachedPdf;
    } else {
      pdf = await getDocument(await getPdfDocumentSource()).promise;

      if (requestId !== renderRequestId) return;

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

      if (requestId !== renderRequestId) return;

      // Устанавливаем в кэш страницу
      cachePdf.setPageCache(cacheKey, page);
    }

    if (!canvas.value || requestId !== renderRequestId) return;

    if (recalculateDisplayBounds || displayBounds === null) {
      displayBounds = getDisplayBounds();
    }

    const rotation = (page.rotate + state.rotate + 360) % 360;
    const baseViewport = page.getViewport({ scale: 1, rotation });
    const displayScale = Math.min(
      displayBounds.width / baseViewport.width,
      displayBounds.height / baseViewport.height
    );
    const viewport = page.getViewport({ scale: displayScale, rotation });

    const dpr = window.devicePixelRatio || 1;
    const resolutionScale = Number.isFinite(props.resolutionScale)
      ? Math.max(1, props.resolutionScale)
      : 1;
    const outputScale = getOutputScale(
      viewport.width,
      viewport.height,
      dpr * resolutionScale
    );
    renderedDevicePixelRatio = dpr;

    // Получаем контекст
    const ctx = canvas.value.getContext('2d');

    // Если контекст не существует, то выходим
    if (ctx === null) throw new Error('Context not found');

    // CSS-размер отвечает за layout, backing-store — за чёткость при зуме.
    canvas.value.style.width = `${viewport.width}px`;
    canvas.value.style.height = `${viewport.height}px`;
    canvas.value.width = Math.floor(viewport.width * outputScale);
    canvas.value.height = Math.floor(viewport.height * outputScale);

    // Рендерим
    renderTask = page.render({
      canvas: canvas.value,
      canvasContext: ctx,
      viewport,
      transform:
        outputScale === 1 ? undefined : [outputScale, 0, 0, outputScale, 0, 0]
    });

    // Устанавливаем текущий рендеринг
    currentRenderTask = renderTask;

    await renderTask.promise;

    if (requestId === renderRequestId) {
      emit('load');
    }
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'name' in error &&
      error?.name === 'RenderingCancelledException'
    ) {
      return;
    }

    if (requestId !== renderRequestId) return;

    console.error(error);
    state.isError = true;
    emit('error', error);
  } finally {
    if (currentRenderTask === renderTask) {
      currentRenderTask = null;
    }
  }
};

/**
 * Поворачивает pdf
 * @param deltaAngle
 */
const rotatePdf = async (deltaAngle: number): Promise<void> => {
  // Рассчитываем угол поворота и округляем его до ближайшего кратного 90.
  const angle = Math.round(deltaAngle / 90) * 90;
  state.rotate += angle;

  // Сохраняем исходный размер страницы и текущее разрешение при повороте.
  await setPdf(false);
};

/**
 * Инициализируем компонента
 *
 */
const init = (): void => {
  if (!canvas.value) return;
  // Используем IntersectionObserver для оптимизации и подгрузки контента, когда он входит в зону видимости
  intersenctionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        setPdf();
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: '50px'
    }
  );

  intersenctionObserver.observe(canvas.value);

  resizeObserver?.disconnect();
  resizeObserver = new ResizeObserver(() => {
    if (!canvas.value || displayBounds === null) return;

    const nextBounds = getDisplayBounds();
    const boundsChanged =
      Math.abs(nextBounds.width - displayBounds.width) > 0.5 ||
      Math.abs(nextBounds.height - displayBounds.height) > 0.5;
    const dprChanged =
      renderedDevicePixelRatio !== (window.devicePixelRatio || 1);

    if (!boundsChanged && !dprChanged) return;

    displayBounds = nextBounds;

    if (resizeRenderFrame !== null) {
      cancelAnimationFrame(resizeRenderFrame);
    }

    resizeRenderFrame = requestAnimationFrame(() => {
      resizeRenderFrame = null;
      setPdf(false);
    });
  });

  resizeObserver.observe(canvas.value.parentElement ?? canvas.value);
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

onUnmounted(() => {
  intersenctionObserver?.disconnect();
  resizeObserver?.disconnect();

  if (resizeRenderFrame !== null) {
    cancelAnimationFrame(resizeRenderFrame);
  }

  renderRequestId += 1;
  currentRenderTask?.cancel();
  currentRenderTask = null;
});
</script>

<style scoped></style>
