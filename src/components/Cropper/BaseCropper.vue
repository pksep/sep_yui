<template>
  <div
    ref="container"
    class="base-cropper"
    :data-testid="`BaseCropper-${state.id}`"
  >
    <canvas
      ref="canvas"
      class="base-cropper__canvas"
      :data-testid="`BaseCropper-${state.id}-canvas`"
      @mousedown="startMove"
      @wheel.prevent="scaleImage"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import {
  nextTick,
  onMounted,
  reactive,
  useId,
  useTemplateRef,
  watch
} from 'vue';
import type { IBaseCropperEmit, IBaseCropperProps } from './interface';

defineOptions({
  name: 'BaseCropper'
});

const props = withDefaults(defineProps<IBaseCropperProps>(), {
  max: 3,
  min: 1,
  step: 0.5
});

const emit = defineEmits<IBaseCropperEmit>();

const canvas = useTemplateRef<HTMLCanvasElement>('canvas');
const container = useTemplateRef<HTMLElement>('container');

const state = reactive<{
  ctx: CanvasRenderingContext2D | null;
  image: HTMLImageElement | null;
  scale: number;
  position: {
    x: number;
    y: number;
  };
  id: string;
  isDragging: boolean;
  startX: number;
  startY: number;
  minScale: number;
  maxScale: number;
  stepScale: number;
}>({
  ctx: null,
  image: null,
  id: useId(),
  scale: 1,
  position: {
    x: 0,
    y: 0
  },
  isDragging: false,
  startX: 0,
  startY: 0,
  minScale: props.min,
  maxScale: props.max,
  stepScale: props.step
});

watch(
  () => props.image,
  () => {
    if (props.image) {
      loadImage(props.image);
    }
  }
);

const init = (): void => {
  if (canvas.value) {
    state.ctx = canvas.value.getContext('2d');
  }

  // Устанавливакм начальный размер
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
};

const resizeCanvas = (): void => {
  if (container.value) {
    const { width, height } = container.value.getBoundingClientRect();
    if (canvas.value) {
      canvas.value.width = width;
      canvas.value.height = height;
    }
    if (state.image) drawImage();
  }
};

const drawImage = (): void => {
  if (state.image) {
    const ctxEl = state.ctx;
    const canvasEl = canvas.value;

    if (ctxEl && canvasEl) {
      ctxEl.clearRect(0, 0, canvasEl.width, canvasEl.height);

      ctxEl.drawImage(
        state.image,
        state.position.x,
        state.position.y,
        state.image.width * state.scale,
        state.image.height * state.scale
      );
    }
  }
};

const loadImage = (file: File): void => {
  const reader = new FileReader();
  reader.onload = async e => {
    if (typeof e.target?.result === 'string') {
      state.image = new Image();
      state.image.src = e.target.result;
      state.image.onload = async () => {
        await nextTick();

        if (canvas.value && state.image) {
        // Размеры контейнера
        const containerWidth = canvas.value.width;
        const containerHeight = canvas.value.height;

        // Соотношение сторон изображения
        const imageAspect = state.image.width / state.image.height;
        const containerAspect = containerWidth / containerHeight;

        // Уменьшаем изображение с сохранением пропорций
        if (imageAspect > containerAspect) {
          // Изображение шире, чем контейнер
          state.image.width = containerWidth;
          state.image.height = containerWidth / imageAspect;
        } else {
          // Изображение выше, чем контейнер
          state.image.height = containerHeight;
          state.image.width = containerHeight * imageAspect;
        }

        resizeCanvas(); // Пересчёт размеров canvas перед отрисовкой

        state.position.x = (canvas.value.width - state.image.width) / 2;
        state.position.y = (canvas.value.height - state.image.height) / 2;
        drawImage();
      };
    }
  };

  reader.readAsDataURL(file);
};

const startMove = (event: MouseEvent): void => {
  state.isDragging = true;
  state.startX = event.clientX - state.position.x;
  state.startY = event.clientY - state.position.y;

  window.addEventListener('mousemove', moveImage);
  window.addEventListener('mouseup', stopMove);
};

const moveImage = (event: DragEvent): void => {
  if (!state.isDragging && !canvas.value) return;

  // Рассчитываем новую позицию
  let newX = event.clientX - state.startX;
  let newY = event.clientY - state.startY;

  // Проверяем, если изображение меньше контейнера по оси X, и даем возможность двигать внутри
  if (canvas.value && state.image) {
    const maxX = canvas.value.width - state.image.width * state.scale;
    if (state.image.width * state.scale < canvas.value.width) {
      newX = Math.min(
        Math.max(newX, 0),
        canvas.value.width - state.image.width * state.scale
      );
    } else {
      // Если изображение больше контейнера, ограничиваем движение
      if (newX > 0) {
        newX = 0; // левая сторона изображения не должна выходить за контейнер
      }
      if (newX < maxX) {
        newX = maxX; // правая сторона изображения не должна выходить за контейнер
      }
    }

  // Проверяем, если изображение меньше контейнера по оси Y, и даем возможность двигать внутри
  const maxY = canvas.value.height - state.image.height * state.scale;
  if (state.image.height * state.scale < canvas.value.height) {
    newY = Math.min(
      Math.max(newY, 0),
      canvas.value.height - state.image.height * state.scale
    );
  } else {
    // Если изображение больше контейнера, ограничиваем движение
    if (newY > 0) {
      newY = 0; // верхняя сторона изображения не должна выходить за контейнер
    }
    if (newY < maxY) {
      newY = maxY; // нижняя сторона изображения не должна выходить за контейнер
    }
  }

  // Устанавливаем новые значения для позиции
  state.position.x = newX;
  state.position.y = newY;
  }
  drawImage();
};

const stopMove = (): void => {
  state.isDragging = false;
  window.removeEventListener('mousemove', moveImage);
  window.removeEventListener('mouseup', stopMove);
};

const getCorrectScale = (newScale: number): number =>
  Math.max(state.minScale, Math.min(newScale, state.maxScale));

const setScalePostion = (deltaScale: number): void => {
  if (canvas.value) {
    const centerX = canvas.value.width / 2;
    const centerY = canvas.value.height / 2;

    state.position.x = centerX - (centerX - state.position.x) * deltaScale;
    state.position.y = centerY - (centerY - state.position.y) * deltaScale;
  }
};

// событие мыши
const scaleImage = (event: WheelEvent): void => {
  const oldScale = state.scale;
  const newScale = state.scale + event.deltaY * -0.001;

  // завершаем функцию, если уперлись в граинцу масштабирования
  if (oldScale === getCorrectScale(newScale)) return;

  state.scale = getCorrectScale(newScale);

  const deltaScale = newScale / oldScale;

  setScalePostion(deltaScale);

  emit('unmount-scale', state.scale);
  drawImage();
};

const scalePlus = (): void => {
  const newScale = state.scale + state.stepScale;
  state.scale = getCorrectScale(newScale);
  drawImage();
};

const scaleMinus = (): void => {
  const newScale = state.scale - state.stepScale;
  state.scale = getCorrectScale(newScale);
  drawImage();
};

const setScale = (value: number): void => {
  const oldScale = state.scale;
  const newScale = value;

  const deltaScale = newScale / oldScale;

  state.scale = getCorrectScale(value);

  setScalePostion(deltaScale);
  drawImage();
};

const cropImage = (): File | null => {
  if (container.value) {
    const { width, height } = container.value.getBoundingClientRect();
    const croppedCanvas = document.createElement('canvas');
    croppedCanvas.width = width;
    croppedCanvas.height = height;
    const croppedCtx = croppedCanvas.getContext('2d');

    if (croppedCtx && state.image) {
      croppedCtx.drawImage(
        state.image,
        state.position.x,
        state.position.y,
        state.image.width * state.scale,
        state.image.height * state.scale
      );
    }

    const url = croppedCanvas.toDataURL('image/png');
    const byteString = atob(url.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: 'image/png' });

    if (props.image) {
      const file = new File([blob], props.image.name, { type: 'image/png' });
      return file;
    }
    return null;
  }

  return null;
};

defineExpose({
  cropImage,
  scalePlus,
  scaleMinus,
  setScale
});

onMounted(() => {
  init();

  if (props.image) {
    loadImage(props.image);
  }
});
</script>

<style scoped>
.base-cropper {
  display: flex;

  background-color: #fafafa;

  background-image: linear-gradient(
      45deg,
      #ebebeb 25%,
      transparent 25%,
      transparent 74%,
      #ebebeb 75%,
      #ebebeb
    ),
    linear-gradient(
      45deg,
      #ebebeb 25%,
      transparent 25%,
      transparent 74%,
      #ebebeb 75%,
      #ebebeb
    );
  background-size: 32px 32px;
  background-position:
    0 0,
    16px 16px;
}

.base-cropper__canvas {
  cursor: move;
}
</style>
