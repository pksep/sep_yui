<template>
  <Transition name="drag">
    <div
      v-if="state.dragging"
      class="drag-overlay"
      @dragleave="handleDragLeave"
      @dragover.prevent
      @drop.prevent="handleDrop"
    >
      Загрузить файл
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { reactive, onMounted, onUnmounted } from 'vue';

const emits = defineEmits<{
  (e: 'files-dropped', files: File[]): void;
}>();

const state = reactive({
  dragging: false
});

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

/**
 *  Проверка — можно ли вообще читать файл
 */
const isFileReadable = async (file: File): Promise<boolean> => {
  try {
    await file.slice(0, 1).arrayBuffer();
    return true;
  } catch {
    return false;
  }
};

/**
 *  Безопасное чтение с retry (macOS fix)
 */
const readFileSafe = async (file: File, retries = 3): Promise<void> => {
  for (let i = 0; i < retries; i++) {
    try {
      await file.arrayBuffer();
      return;
    } catch (e) {
      if (i === retries - 1) throw e;
      await delay(100);
    }
  }
};

/**
 *  Нормализация файлов (фильтр + retry)
 */
const normalizeFiles = async (files: File[]) => {
  const valid: File[] = [];
  const rejected: File[] = [];

  for (const file of files) {
    try {
      const readable = await isFileReadable(file);

      if (!readable) {
        rejected.push(file);
        continue;
      }

      await readFileSafe(file);

      valid.push(file);
    } catch {
      rejected.push(file);
    }
  }

  return { valid, rejected };
};

const getDroppedFiles = (dataTransfer: DataTransfer): File[] => {
  if (dataTransfer.files && dataTransfer.files.length > 0) {
    return Array.from(dataTransfer.files);
  }

  // fallback (редко нужен, но пусть будет)
  return Array.from(dataTransfer.items ?? [])
    .filter(item => item.kind === 'file')
    .map(item => item.getAsFile())
    .filter((file): file is File => !!file);
};

const hasDraggedFiles = (dataTransfer?: DataTransfer | null): boolean => {
  if (!dataTransfer) return false;

  if (dataTransfer.types?.includes('Files')) return true;

  return Array.from(dataTransfer.items ?? []).some(
    item => item.kind === 'file'
  );
};

const handleDrop = async (e: DragEvent): Promise<void> => {
  e.preventDefault();
  state.dragging = false;

  if (!e.dataTransfer) return;

  const files = getDroppedFiles(e.dataTransfer);
  if (!files.length) return;

  const { valid, rejected } = await normalizeFiles(files);

  if (rejected.length) {
    console.warn('Unreadable files (macOS issue):', rejected);
  }

  if (valid.length) {
    emits('files-dropped', valid);
  }
};

const handleWindowDrop = (e: DragEvent): void => {
  e.preventDefault();
  state.dragging = false;
};

const handleWindowDragover = (e: DragEvent): void => {
  e.preventDefault();
};

const handleWindowDragEnter = (e: DragEvent): void => {
  e.preventDefault();
  if (hasDraggedFiles(e.dataTransfer)) {
    state.dragging = true;
  }
};

const handleWindowDragLeave = (e: DragEvent): void => {
  // когда курсор уходит за пределы окна
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

const handlePaste = async (e: ClipboardEvent) => {
  const files = Array.from(e.clipboardData?.files ?? []);
  if (!files.length) return;

  const { valid } = await normalizeFiles(files);

  if (valid.length) {
    emits('files-dropped', valid);
  }
};

onMounted(() => {
  window.addEventListener('dragenter', handleWindowDragEnter);
  window.addEventListener('dragover', handleWindowDragover);
  window.addEventListener('drop', handleWindowDrop);
  window.addEventListener('dragleave', handleWindowDragLeave);
  window.addEventListener('dragend', handleWindowDragEnd);
  window.addEventListener('paste', handlePaste);
});

onUnmounted(() => {
  window.removeEventListener('dragenter', handleWindowDragEnter);
  window.removeEventListener('dragover', handleWindowDragover);
  window.removeEventListener('drop', handleWindowDrop);
  window.removeEventListener('dragleave', handleWindowDragLeave);
  window.removeEventListener('dragend', handleWindowDragEnd);
  window.removeEventListener('paste', handlePaste);
});
</script>

<style scoped>
.drag-overlay {
  position: fixed;
  margin: 10px;
  padding-top: 25vh;
  inset: 0;
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: center;
  z-index: 9999;
  border: 4px dashed var(--primary-color);
  background-color: #4a83e01a;
  color: var(--text-neutral-color);
  font-weight: 700;
  font-size: 30px;
}

.drag-overlay-left {
  width: calc(50% - 15px);
}

.drag-overlay-right {
  width: calc(50% - 15px);
  margin-left: calc(50% + 5px);
}

/* Transition classes */
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
