<template>
  <canvas v-if="!state.isError" ref="canvasRef" class="video-preview" />

  <img v-else :src="closedCamer" />
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, watch } from 'vue';
import closedCamer from '@/assets/images/slider/closed-camera.svg';

defineOptions({
  name: 'VideoPreview'
});

const props = defineProps<{
  src: string | undefined;
}>();

const state = reactive<{
  isError: boolean;
}>({ isError: false });

watch(
  () => props.src,
  () => {
    initVideo();
  }
);

const canvasRef = ref<HTMLCanvasElement | null>(null);

const initVideo = async (): Promise<void> => {
  try {
    state.isError = false;
    if (!canvasRef.value || !props.src) return;
    const video = document.createElement('video');
    video.muted = true;
    video.preload = 'metadata';

    const response = await fetch(props.src);

    if (!response.ok) throw new Error('Failed to fetch video');

    const blob = new Blob([await response.arrayBuffer()]);

    video.src = URL.createObjectURL(blob);

    const ctx = canvasRef?.value?.getContext('2d');

    if (!ctx) return;

    video.addEventListener('loadeddata', () => {
      video.currentTime = 0;
    });

    video.addEventListener('seeked', () => {
      if (!canvasRef.value) return;

      ctx.drawImage(
        video,
        0,
        0,
        canvasRef.value?.width,
        canvasRef.value?.height
      );
    });
  } catch (error) {
    console.log(error);

    state.isError = true;
  }
};

onMounted(() => {
  nextTick(() => {
    initVideo();
  });
});
</script>

<style scoped></style>
