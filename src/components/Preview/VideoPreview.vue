<template>
  <canvas v-if="!state.isError" ref="canvasRef" class="video-preview" />

  <img v-else :src="closedCamer" />
</template>

<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import closedCamer from '@/assets/images/slider/closed-camera.svg';
import checkPath from '@/helpers/file/check-path';

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

let videoObjectUrl: string | null = null;

const VIDEO_MIME_BY_EXTENSION: Record<string, string> = {
  mp4: 'video/mp4',
  webm: 'video/webm',
  mkv: 'video/x-matroska',
  avi: 'video/x-msvideo',
  mov: 'video/quicktime',
  qt: 'video/quicktime',
  m4v: 'video/x-m4v'
};

watch(
  () => props.src,
  () => {
    state.isError = false;
    cleanupVideoSource();
    nextTick(() => {
      void initVideo();
    });
  }
);

const canvasRef = ref<HTMLCanvasElement | null>(null);

const getVideoMimeType = (path: string): string => {
  const extension = checkPath(path)?.toLowerCase();

  if (!extension) return 'video/mp4';

  return VIDEO_MIME_BY_EXTENSION[extension] ?? 'video/mp4';
};

const cleanupVideoSource = (): void => {
  if (!videoObjectUrl) return;

  URL.revokeObjectURL(videoObjectUrl);
  videoObjectUrl = null;
};

const initVideo = async (): Promise<void> => {
  try {
    if (!canvasRef.value || !props.src) return;
    const video = document.createElement('video');
    video.muted = true;
    video.preload = 'metadata';
    video.playsInline = true;

    const response = await fetch(props.src);

    if (!response.ok) throw new Error('Failed to fetch video');

    const blob = new Blob([await response.arrayBuffer()], {
      type: getVideoMimeType(props.src)
    });

    videoObjectUrl = URL.createObjectURL(blob);
    video.src = videoObjectUrl;

    const ctx = canvasRef.value.getContext('2d');

    if (!ctx) return;

    const drawFrame = (): void => {
      if (!canvasRef.value) return;

      const width = video.videoWidth || 1;
      const height = video.videoHeight || 1;

      canvasRef.value.width = width;
      canvasRef.value.height = height;

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(video, 0, 0, width, height);
      emit('load');
    };

    video.addEventListener('loadedmetadata', () => {
      if (!canvasRef.value) return;

      canvasRef.value.width = video.videoWidth || 1;
      canvasRef.value.height = video.videoHeight || 1;

      const targetTime =
        Number.isFinite(video.duration) && video.duration > 1 ? 1 : 0;

      if (targetTime === 0) {
        drawFrame();
        return;
      }

      video.currentTime = targetTime;
    });

    video.addEventListener('seeked', () => {
      drawFrame();
    });

    video.addEventListener('loadeddata', () => {
      if (!canvasRef.value?.width || !canvasRef.value?.height) {
        drawFrame();
      }
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
    void initVideo();
  });
});

onUnmounted(() => {
  cleanupVideoSource();
});
</script>

<style scoped></style>
