<template>
  <canvas ref="canvas"> </canvas>
</template>

<script setup lang="ts">
import { IPdfPreviewProps } from '@/components/Preview/interface';
import { onMounted, ref, watch } from 'vue';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker?url';

defineOptions({
  name: 'PdfPreview'
});

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const props = defineProps<IPdfPreviewProps>();
const canvas = ref<HTMLCanvasElement | null>(null);

watch(
  () => props.src,
  () => {
    setPdf();
  }
);

const setPdf = async (): Promise<void> => {
  if (!canvas.value || !props.src) return;

  const pdf = await pdfjsLib.getDocument(props.src).promise;
  const page = await pdf.getPage(1);

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
};

onMounted(() => {
  setPdf();
});
</script>

<style scoped></style>
