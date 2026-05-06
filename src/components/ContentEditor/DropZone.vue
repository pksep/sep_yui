<template>
  <Transition name="drag">
    <div v-if="state.dragging" class="drag-overlay" @dragover.prevent>
      <!-- ЕСЛИ ЕСТЬ МЕДИА -->
      <template v-if="state.hasMedia">
        <div
          class="drag-overlay__zone"
          @dragleave="handleDragLeave"
          @drop.prevent="handleDrop($event, false)"
        >
          <div class="drag-overlay__title">Загрузить файл</div>
        </div>

        <div
          class="drag-overlay__zone drag-overlay__zone--media"
          @dragleave="handleDragLeave"
          @drop.prevent="handleDrop($event, true)"
        >
          <div class="drag-overlay__title">Загрузить фото/видео</div>
        </div>
      </template>

      <!-- ЕСЛИ НЕТ МЕДИА -->
      <template v-else>
        <div
          class="drag-overlay__zone drag-overlay__zone--full"
          @dragleave="handleDragLeave"
          @drop.prevent="handleDrop($event, false)"
        >
          <div class="drag-overlay__title">Загрузить файл</div>
        </div>
      </template>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { reactive, onMounted, onUnmounted } from 'vue';

const emits = defineEmits<{
  (e: 'files-dropped', payload: { files: File[]; onlyMedia: boolean }): void;
}>();

const state = reactive({
  dragging: false,
  hasMedia: false
});

const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 *  определяем есть ли медиа в drag
 */
const detectMediaFromDataTransfer = (dt?: DataTransfer | null): boolean => {
  if (!dt) return false;

  const items = Array.from(dt.items ?? []);

  return items.some(item => {
    if (item.kind !== 'file') return false;

    const type = item.type.toLowerCase();
    return type.startsWith('image/') || type.startsWith('video/');
  });
};

const hasDraggedFiles = (dataTransfer?: DataTransfer | null): boolean => {
  if (!dataTransfer) return false;

  if (dataTransfer.types?.includes('Files')) return true;

  return Array.from(dataTransfer.items ?? []).some(
    item => item.kind === 'file'
  );
};

const getDroppedFiles = (dataTransfer: DataTransfer): File[] => {
  if (dataTransfer.files && dataTransfer.files.length > 0) {
    return Array.from(dataTransfer.files);
  }

  return Array.from(dataTransfer.items ?? [])
    .filter(item => item.kind === 'file')
    .map(item => item.getAsFile())
    .filter((file): file is File => !!file);
};

const waitDroppedFiles = async (
  dataTransfer: DataTransfer,
  retries = 5
): Promise<File[]> => {
  for (let i = 0; i <= retries; i++) {
    const files = getDroppedFiles(dataTransfer);

    if (files.length || i === retries) {
      return files;
    }

    await delay(100);
  }

  return [];
};

const handleDrop = async (e: DragEvent, onlyMedia: boolean): Promise<void> => {
  e.preventDefault();
  state.dragging = false;

  if (!e.dataTransfer) return;

  const files = await waitDroppedFiles(e.dataTransfer);
  if (!files.length) return;

  emits('files-dropped', { files, onlyMedia });
};

const handleWindowDragEnter = (e: DragEvent): void => {
  e.preventDefault();

  if (hasDraggedFiles(e.dataTransfer)) {
    state.dragging = true;

    // определяем медиа заранее
    state.hasMedia = detectMediaFromDataTransfer(e.dataTransfer);
  }
};

const handleWindowDragOver = (e: DragEvent): void => {
  e.preventDefault();

  // иногда типы обновляются только здесь (особенно Safari)
  state.hasMedia = detectMediaFromDataTransfer(e.dataTransfer);
};

const handleWindowDrop = (e: DragEvent): void => {
  e.preventDefault();
  state.dragging = false;
};

const handleWindowDragLeave = (e: DragEvent): void => {
  if (e.clientX === 0 && e.clientY === 0) {
    state.dragging = false;
  }
};

const handleWindowDragEnd = (): void => {
  state.dragging = false;
};

const handleDragLeave = (e: DragEvent): void => {
  if (e.clientX === 0 && e.clientY === 0) {
    state.dragging = false;
  }
};

onMounted(() => {
  window.addEventListener('dragenter', handleWindowDragEnter);
  window.addEventListener('dragover', handleWindowDragOver);
  window.addEventListener('drop', handleWindowDrop);
  window.addEventListener('dragleave', handleWindowDragLeave);
  window.addEventListener('dragend', handleWindowDragEnd);
});

onUnmounted(() => {
  window.removeEventListener('dragenter', handleWindowDragEnter);
  window.removeEventListener('dragover', handleWindowDragOver);
  window.removeEventListener('drop', handleWindowDrop);
  window.removeEventListener('dragleave', handleWindowDragLeave);
  window.removeEventListener('dragend', handleWindowDragEnd);
});
</script>

<style scoped>
.drag-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  padding: 10px;
  backdrop-filter: blur(20px);
  background-color: #4a83e01a;
}

/* когда одна зона */
.drag-overlay__zone--full {
  grid-row: span 2;
}

.drag-overlay__zone {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px dashed var(--primary-color);
  border-radius: 24px;
  color: var(--text-neutral-color);
  background-color: rgb(255 255 255 / 55%);
}

.drag-overlay__zone--media {
  background-color: rgb(244 248 255 / 70%);
}

.drag-overlay__title {
  font-size: 30px;
  font-weight: 700;
  text-align: center;
}

.drag-enter-active,
.drag-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.drag-enter-from,
.drag-leave-to {
  opacity: 0;
  transform: scale(0.98);
}
.drag-enter-to,
.drag-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
