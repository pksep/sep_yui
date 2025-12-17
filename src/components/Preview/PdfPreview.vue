<template>
  <canvas ref="canvas"> </canvas>
</template>

<script setup lang="ts">
import { IPdfPreviewProps } from '@/components/Preview/interface';
import { onMounted, ref, watch } from 'vue';
import pdfWorker from 'pdfjs-dist/build/pdf.worker?url';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import cachePdf from '@/helpers/file/cache-pdf';

defineOptions({
  name: 'PdfPreview'
});

GlobalWorkerOptions.workerSrc = pdfWorker;

const props = defineProps<IPdfPreviewProps>();
const canvas = ref<HTMLCanvasElement | null>(null);

watch([() => props.src, () => props.page], () => {
  setPdf();
});

const setPdf = async (): Promise<void> => {
  try {
    if (!canvas.value || !props.src) return;

    let pdf;
    if (props.cacheKeyPdfDocument) {
      pdf = cachePdf.getCache(props.cacheKeyPdfDocument);
    } else {
      pdf = await getDocument(props.src).promise;
    }

    if (!pdf) return;

    const page = await pdf.getPage(props.page ?? 1);

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

    await page.render({
      canvas: canvas.value,
      canvasContext: ctx,
      viewport
    }).promise;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  setPdf();
});
</script>

<style scoped></style>
