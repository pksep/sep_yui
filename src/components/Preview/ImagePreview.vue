<template>
  <canvas v-if="!state.isError" ref="canvasRef" class="image-preview" />

  <img v-else :src="closedCamer" />
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, watch } from 'vue';
import closedCamer from '@/assets/images/slider/closed-camera.svg';

defineOptions({
  name: 'ImagePreview'
});

const props = defineProps<{
  src: string | undefined;
}>();

const state = reactive<{
  isError: boolean;
  rotate: number;
}>({ isError: false, rotate: 0 });

watch(
  () => props.src,
  () => {
    // Сбрасываем ошибку
    state.isError = false;
    // Сбрасываем угол поворота
    state.rotate = 0;

    nextTick(() => {
      initImage();
    });
  }
);

const canvasRef = ref<HTMLCanvasElement | null>(null);

/**
 * Инициализация изображения
 */
const initImage = async (): Promise<void> => {
  try {
    // Если canvas не существует, то выходим
    if (!canvasRef.value || !props.src) return;
    // Загружаем изображение
    const image = new Image();
    image.src = props.src;

    image.addEventListener('load', () => {
      if (!canvasRef.value) return;
      // Получаем контекст
      const ctx = canvasRef.value?.getContext('2d');
      if (!ctx) return;

      // Получаем размеры изображения
      const width = image.width;
      const height = image.height;

      // Устанавливаем размеры для canvas
      let canvasWidth = width;
      let canvasHeight = height;

      // Если угол поворота не кратен 180, то меняем размеры местами
      if (state.rotate % 180 !== 0) {
        canvasWidth = height;
        canvasHeight = width;
      }

      // Устанавливаем размеры для canvas
      canvasRef.value.width = canvasWidth;
      canvasRef.value.height = canvasHeight;

      ctx.save();
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Сдвиг в центр
      ctx.translate(canvasWidth / 2, canvasHeight / 2);

      // Вращаем
      ctx.rotate((state.rotate * Math.PI) / 180);

      // Рисуем изображение относительно центра
      ctx.drawImage(image, -width / 2, -height / 2, width, height);

      ctx.restore();
    });

    image.addEventListener('error', () => {
      state.isError = true;
    });
  } catch (error) {
    console.log(error);

    state.isError = true;
  }
};

/**
 * Поворачивает изображение
 * @param deltaAngle
 */
const rotateImage = async (deltaAngle: number): Promise<void> => {
  // Расчитываем угол попорота.
  // Округляем его до ближайшего кратного 90
  const angle = Math.round(deltaAngle / 90) * 90;
  // Устанавливаем для компонента угол поворота
  state.rotate += angle;

  nextTick(() => {
    initImage();
  });
};

onMounted(() => {
  nextTick(() => {
    initImage();
  });
});

defineExpose({ rotateImage });
</script>

<style scoped></style>
