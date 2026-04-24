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

const getDroppedFiles = (dataTransfer: DataTransfer): File[] => {
  const itemFiles = Array.from(dataTransfer.items ?? [])
    .filter(item => item.kind === 'file')
    .map(item => item.getAsFile())
    .filter((file): file is File => !!file);

  if (itemFiles.length) {
    return itemFiles;
  }

  return Array.from(dataTransfer.files ?? []);
};

const hasDraggedFiles = (dataTransfer?: DataTransfer | null): boolean => {
  if (!dataTransfer) return false;

  const types = Array.from(dataTransfer.types ?? []);

  if (types.includes('Files')) {
    return true;
  }

  return Array.from(dataTransfer.items ?? []).some(
    item => item.kind === 'file'
  );
};

const toSafeFile = async (file: File): Promise<File> => {
  const buffer = await file.arrayBuffer();

  return new File([buffer], file.name, {
    type: file.type,
    lastModified: file.lastModified
  });
};

const handleDrop = async (e: DragEvent): Promise<void> => {
  e.preventDefault();
  state.dragging = false;

  if (!e.dataTransfer) return;

  const files = getDroppedFiles(e.dataTransfer);
  if (!files.length) return;

  const safeFiles = await Promise.all(files.map(toSafeFile));

  emits('files-dropped', safeFiles);
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
  if (e.clientX === 0 && e.clientY === 0) {
    state.dragging = false;
  }
};

const handleWindowDragEnd = (): void => {
  state.dragging = false;
};

const handleDragLeave = (e: DragEvent): void => {
  if (e.clientX === 0 && e.clientY === 0) state.dragging = false;
};

onMounted(() => {
  window.addEventListener('dragenter', handleWindowDragEnter);
  window.addEventListener('dragover', handleWindowDragover);
  window.addEventListener('drop', handleWindowDrop);
  window.addEventListener('dragleave', handleWindowDragLeave);
  window.addEventListener('dragend', handleWindowDragEnd);
});

onUnmounted(() => {
  window.removeEventListener('dragenter', handleWindowDragEnter);
  window.removeEventListener('dragover', handleWindowDragover);
  window.removeEventListener('drop', handleWindowDrop);
  window.removeEventListener('dragleave', handleWindowDragLeave);
  window.removeEventListener('dragend', handleWindowDragEnd);
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
