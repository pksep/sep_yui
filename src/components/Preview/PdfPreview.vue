<template>
  <canvas ref="canvas"> </canvas>
</template>

<script setup lang="ts">
import { IPdfPreviewProps } from '@/components/Preview/interface';
import { onMounted, ref, watch } from 'vue';
import pdfWorker from 'pdfjs-dist/build/pdf.worker?url';
import {
  getDocument,
  GlobalWorkerOptions,
  PDFPageProxy,
  RenderTask
} from 'pdfjs-dist';
import cachePdf from '@/helpers/file/cache-pdf';

defineOptions({
  name: 'PdfPreview'
});

GlobalWorkerOptions.workerSrc = pdfWorker;

const props = defineProps<IPdfPreviewProps>();
const canvas = ref<HTMLCanvasElement | null>(null);
let intersenctionObserver: IntersectionObserver | undefined;
let currentRenderTask: RenderTask | null = null;

watch([() => props.src, () => props.page], () => {
  intersenctionObserver?.disconnect();
  clearCanvas();

  init();
});

const setPdf = async (): Promise<void> => {
  try {
    if (!canvas.value || !props.src) return;

    if (currentRenderTask) {
      currentRenderTask?.cancel();
      currentRenderTask = null;
    }

    let pdf;
    const cachedPdf = cachePdf.getCache(props.src);
    if (cachedPdf) {
      pdf = cachedPdf;
    } else {
      pdf = await getDocument(props.src).promise;

      cachePdf.setCache(props.src, pdf);
    }

    if (!pdf) return;
    const numberOfPage = props.page ?? 1;
    const cacheKey = `${props.src}-${numberOfPage}`;
    const cachedPage = cachePdf.getPageCache(cacheKey);

    let page: PDFPageProxy;
    if (cachedPage) {
      page = cachedPage;
    } else {
      page = await pdf.getPage(numberOfPage);
      cachePdf.setPageCache(cacheKey, page);
    }

    const rect = canvas.value.getBoundingClientRect();

    // viewport при масштабе 1
    const baseViewport = page.getViewport({ scale: 1 });

    const scaleX = rect.width / baseViewport.width;
    const scaleY = rect.height / baseViewport.height;

    // чтобы полностью влезло (contain)
    const scale = Math.min(scaleX, scaleY);

    const viewport = page.getViewport({ scale });
    const ctx = canvas.value.getContext('2d');

    if (ctx === null) return;

    canvas.value.width = viewport.width;
    canvas.value.height = viewport.height;

    const renderTask = page.render({
      canvas: canvas.value,
      canvasContext: ctx,
      viewport
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
  }
};

const init = (): void => {
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

  if (canvas.value) {
    intersenctionObserver.observe(canvas.value);
  }
};

const clearCanvas = (): void => {
  if (!canvas.value) return;

  const ctx = canvas.value.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
};

onMounted(() => {
  init();
});
</script>

<style scoped></style>
