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

const LOG_PREFIX = '[ContentEditor][DropZone]';

const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

const SCREENSHOT_MIME_TYPES = new Set(['image/png', 'image/jpeg']);

const getDropRetryCount = (file: File): number =>
  SCREENSHOT_MIME_TYPES.has(file.type.toLowerCase()) ? 8 : 4;

const getDropRetryDelay = (attempt: number, file: File): number =>
  SCREENSHOT_MIME_TYPES.has(file.type.toLowerCase())
    ? 180 * (attempt + 1)
    : 120 * (attempt + 1);

const getFileLogMeta = (file: File) => ({
  fileName: file.name,
  fileType: file.type,
  fileSize: file.size,
  lastModified: file.lastModified
});

const isFileReadable = async (file: File): Promise<boolean> => {
  try {
    await file.slice(0, 1).arrayBuffer();
    console.warn(`${LOG_PREFIX} file became readable`, getFileLogMeta(file));
    return true;
  } catch (error) {
    console.warn(`${LOG_PREFIX} file is not readable yet`, {
      ...getFileLogMeta(file),
      error
    });
    return false;
  }
};

const warmupFile = async (file: File, retries = 3): Promise<File> => {
  for (let i = 0; i <= retries; i++) {
    try {
      console.warn(`${LOG_PREFIX} warmup attempt`, {
        ...getFileLogMeta(file),
        attempt: i + 1,
        maxAttempts: retries + 1
      });
      const buffer = await file.arrayBuffer();

      console.warn(`${LOG_PREFIX} warmup success`, {
        ...getFileLogMeta(file),
        attempt: i + 1,
        bufferSize: buffer.byteLength
      });

      return new File([buffer], file.name, {
        type: file.type,
        lastModified: file.lastModified
      });
    } catch (error) {
      if (i === retries) {
        throw error;
      }

      console.warn(`${LOG_PREFIX} warmup retry scheduled`, {
        ...getFileLogMeta(file),
        attempt: i + 1,
        nextDelayMs: getDropRetryDelay(i, file),
        error
      });
      await delay(getDropRetryDelay(i, file));
    }
  }

  return file;
};

const normalizeDroppedFiles = async (files: File[]): Promise<File[]> => {
  const normalizedFiles: File[] = [];

  for (const file of files) {
    const retries = getDropRetryCount(file);
    console.warn(`${LOG_PREFIX} normalize dropped file`, {
      ...getFileLogMeta(file),
      maxAttempts: retries + 1
    });

    for (let i = 0; i <= retries; i++) {
      try {
        const readable = await isFileReadable(file);

        if (!readable) {
          throw new Error('File is not readable yet');
        }

        normalizedFiles.push(await warmupFile(file, 1));
        break;
      } catch (error) {
        if (i === retries) {
          console.warn('Skip unreadable dropped file', {
            ...getFileLogMeta(file),
            attempt: i + 1,
            error
          });
          break;
        }

        console.warn(`${LOG_PREFIX} normalize retry scheduled`, {
          ...getFileLogMeta(file),
          attempt: i + 1,
          nextDelayMs: getDropRetryDelay(i, file),
          error
        });
        await delay(getDropRetryDelay(i, file));
      }
    }
  }

  return normalizedFiles;
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

const waitDroppedFiles = async (
  dataTransfer: DataTransfer,
  retries = 5
): Promise<File[]> => {
  for (let i = 0; i <= retries; i++) {
    const files = getDroppedFiles(dataTransfer);
    console.warn(`${LOG_PREFIX} inspect dataTransfer`, {
      attempt: i + 1,
      maxAttempts: retries + 1,
      fileCount: files.length,
      itemCount: dataTransfer.items?.length ?? 0,
      types: Array.from(dataTransfer.types ?? [])
    });

    if (files.length || i === retries) {
      return files;
    }

    await delay(100);
  }

  return [];
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

  console.warn(`${LOG_PREFIX} drop detected`, {
    itemCount: e.dataTransfer.items?.length ?? 0,
    fileCount: e.dataTransfer.files?.length ?? 0,
    types: Array.from(e.dataTransfer.types ?? [])
  });

  const files = await waitDroppedFiles(e.dataTransfer);
  if (!files.length) return;

  console.warn(
    `${LOG_PREFIX} files extracted from drop`,
    files.map(getFileLogMeta)
  );

  const normalizedFiles = await normalizeDroppedFiles(files);

  if (!normalizedFiles.length) return;

  console.warn(
    `${LOG_PREFIX} emitting normalized dropped files`,
    normalizedFiles.map(getFileLogMeta)
  );

  emits('files-dropped', normalizedFiles);
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
