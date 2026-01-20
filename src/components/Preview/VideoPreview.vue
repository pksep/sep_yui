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

const emit = defineEmits<{
  (e: 'error', error: Event): void;
  (e: 'load'): void;
}>();

const state = reactive<{
  isError: boolean;
}>({ isError: false });

watch(
  () => props.src,
  () => {
    state.isError = false;
    nextTick(() => {
      initVideo();
    });
  }
);

const canvasRef = ref<HTMLCanvasElement | null>(null);

const initVideo = async (): Promise<void> => {
  try {
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
      emit('load');
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

    video.addEventListener('error', (error: Event) => {
      state.isError = true;
      emit('error', error);
    });
  } catch (error) {
    emit('error', new Event('error'));

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
