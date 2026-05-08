<template>
  <div
    ref="mainMentionAnchorRef"
    class="editor-component"
    :class="{ 'editor-component--mentions-open': showMentionList }"
  >
    <div
      class="editor-component-slot"
      v-if="$slots.action && !isAttachModalOpen"
    >
      <slot name="action" />
    </div>
    <Popover
      v-if="props.activeAttachFile"
      isWCUse
      :options="mobileAttachOptions"
      translateY="calc(-100% - 47px)"
      class="mobile-item attach-file-popover"
    >
      <template #trigger>
        <Button
          :type="ButtonTypeEnum.ghost"
          :size="SizesEnum.small"
          class="toolbar-button attach-file-button mobile-buttons"
        >
          <Icon :name="IconNameEnum.paperClip" />
        </Button>
      </template>
    </Popover>

    <EditorContent
      v-if="!isAttachModalOpen"
      class="editor-content"
      :editor="editor"
    />
    <ContentEditorFormattingToolbar
      v-if="!isAttachModalOpen"
      :editor="editor || null"
    />
    <DropZone
      v-if="props.activeAttachFile && !isAttachModalOpen"
      @files-dropped="fileDropped"
    />

    <div v-if="!isAttachModalOpen" class="right-buttons">
      <Button
        :type="ButtonTypeEnum.ghost"
        :size="SizesEnum.small"
        class="toolbar-button mobile-buttons smile-button"
        @click.stop="toggleEmojiPicker"
      >
        <Icon :name="IconNameEnum.smile" />
        <div @click.stop :class="pickerClasses" v-show="showEmojiPicker">
          <EmojiPicker :native="true" @select="addEmoji" />
        </div>
      </Button>

      <Button
        v-show="!disableSend"
        :type="ButtonTypeEnum.ghost"
        :size="SizesEnum.small"
        class="toolbar-button right mobile-buttons"
        @click="handleSave"
      >
        <Icon
          :name="IconNameEnum.planeRightFill"
          :width="22"
          :height="22"
          class="content-editor__save"
        />
      </Button>
    </div>

    <div v-if="!isAttachModalOpen" class="toolbar">
      <Popover
        v-if="props.activeAttachFile"
        isWCUse
        :options="desktopAttachOptions"
        translateY="calc(-100% - 47px)"
      >
        <template #trigger>
          <Button
            :type="ButtonTypeEnum.ghost"
            :size="SizesEnum.small"
            class="toolbar-button attach-file-button"
          >
            <Icon :name="IconNameEnum.paperClip" :width="16" :height="16" />
          </Button>
        </template>
      </Popover>

      <Button
        :type="ButtonTypeEnum.ghost"
        :size="SizesEnum.small"
        class="toolbar-button smile-button"
        @click.stop="toggleEmojiPicker"
      >
        <Icon :name="IconNameEnum.smile" :width="16" :height="16" />
        <div @click.stop :class="pickerClasses" v-show="showEmojiPicker">
          <EmojiPicker
            :native="true"
            @select="addEmoji"
            v-on-click-outside.bubble="closeEmojiPicker"
          />
        </div>
      </Button>
      <Button
        v-if="props.activeSelectUser"
        :type="ButtonTypeEnum.ghost"
        class="toolbar-button"
        :size="SizesEnum.small"
        @click="toggleUserSelect"
      >
        <Icon :name="IconNameEnum.atSign" :width="16" :height="16" />
      </Button>

      <Button
        v-if="false"
        :disabled="!props.activeSelectUser"
        :type="ButtonTypeEnum.ghost"
        class="toolbar-button"
        :size="SizesEnum.small"
        @click="addLink"
      >
        <Icon :name="IconNameEnum.atSign" />
      </Button>

      <Button
        :disabled="disableSend"
        class="toolbar-button right"
        :size="SizesEnum.small"
        @click="handleSave"
      >
        <Icon
          :name="IconNameEnum.planeRight"
          :color="ColorsEnum.white"
          :width="16"
          :height="16"
        />
      </Button>
    </div>

    <Modal
      v-if="isAttachModalOpen"
      :open="isAttachModalOpen"
      @close="handleAttachModalClose"
      disable-close-on-outside-click
      position="center"
      width="min(430px, calc(100vw - 32px))"
      height="auto"
      class="attach-modal-container"
    >
      <div class="attach-modal">
        <DropZone @files-dropped="fileDropped" />

        <div class="attach-modal__header">
          <Button
            :type="ButtonTypeEnum.ghost"
            :size="SizesEnum.small"
            class="attach-modal__close"
            @click="handleAttachModalClose"
          >
            <Icon :name="IconNameEnum.crossLarge" />
          </Button>
        </div>

        <div
          class="attach-modal__attachments__all"
          v-if="
            pendingMediaPreviewChunks.length > 0 || pendingFileItems.length > 0
          "
        >
          <div class="attach-modal__media-groups">
            <div
              v-for="(chunk, chunkIndex) in pendingMediaPreviewChunks"
              :key="`media-chunk-${chunkIndex}`"
              :class="[
                'attach-modal__media-grid',
                `attach-modal__media-grid-${chunk.length}-item`
              ]"
            >
              <div
                v-for="item in chunk"
                :key="item.id"
                class="attach-modal__media-tile"
              >
                <video
                  draggable="false"
                  v-if="item.isVideo"
                  :src="item.url"
                  muted
                  playsinline
                />
                <img
                  draggable="false"
                  v-else
                  :src="item.url"
                  :alt="item.file.name"
                />
                <Button
                  :type="ButtonTypeEnum.ghost"
                  :size="SizesEnum.small"
                  class="attach-modal__media-tile-remove"
                  @click.stop="removePendingAttachment('media', item.index)"
                >
                  <Icon :name="IconNameEnum.trash" :width="24" :height="24" />
                </Button>
              </div>
            </div>

            <div
              v-if="pendingFileItems.length"
              class="attach-modal__attachments"
            >
              <div
                v-for="item in pendingFileItems"
                :key="item.id"
                class="attach-modal__attachment"
              >
                <div class="attach-modal__attachment-icon">
                  <Icon
                    :name="IconNameEnum.fileItem"
                    :width="18"
                    :height="18"
                  />
                </div>
                <div class="attach-modal__attachment-body">
                  <div class="attach-modal__attachment-name">
                    {{ getShortName(item.file.name) }}
                  </div>
                  <div class="attach-modal__attachment-size">
                    {{ formatFileSize(item.file.size) }}
                  </div>
                </div>
                <Button
                  :type="ButtonTypeEnum.ghost"
                  :size="SizesEnum.small"
                  class="attach-modal__attachment-remove"
                  @click="removePendingAttachment(item.kind, item.index)"
                >
                  <Icon :name="IconNameEnum.trash" :width="24" :height="24" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div ref="modalMentionAnchorRef" class="attach-modal__editor">
          <div class="editor-component-slot" v-if="$slots.action">
            <slot name="action" />
          </div>
          <EditorContent class="editor-content" :editor="editor" />
          <div class="attach-modal__toolbar">
            <div class="attach-modal__toolbar-left">
              <Popover
                isWCUse
                :disabled="!props.activeAttachFile"
                :options="desktopAttachOptions"
                translateY="calc(-100% - 47px)"
              >
                <template #trigger>
                  <Button
                    :type="ButtonTypeEnum.ghost"
                    :size="SizesEnum.small"
                    class="toolbar-button attach-file-button"
                    :disabled="!props.activeAttachFile"
                  >
                    <Icon
                      :name="IconNameEnum.paperClip"
                      :width="16"
                      :height="16"
                    />
                  </Button>
                </template>
              </Popover>
              <Button
                :type="ButtonTypeEnum.ghost"
                :size="SizesEnum.small"
                class="toolbar-button smile-button"
                @click.stop="toggleEmojiPicker"
              >
                <Icon :name="IconNameEnum.smile" :width="16" :height="16" />
                <div
                  @click.stop
                  :class="pickerClasses"
                  v-show="showEmojiPicker"
                >
                  <EmojiPicker
                    :native="true"
                    @select="addEmoji"
                    v-on-click-outside.bubble="closeEmojiPicker"
                  />
                </div>
              </Button>
              <Button
                v-if="props.activeSelectUser"
                :type="ButtonTypeEnum.ghost"
                class="toolbar-button"
                :size="SizesEnum.small"
                @click="toggleUserSelect"
              >
                <Icon :name="IconNameEnum.atSign" :width="16" :height="16" />
              </Button>
            </div>
            <Button
              :disabled="disableSend"
              class="toolbar-button right"
              :size="SizesEnum.small"
              @click="handleAttachModalSend"
            >
              <Icon
                :name="IconNameEnum.planeRight"
                :color="ColorsEnum.white"
                :width="16"
                :height="16"
              />
            </Button>
          </div>
        </div>
      </div>
    </Modal>

    <Modal
      v-if="isCameraModalOpen"
      :open="isCameraModalOpen"
      @close="isCameraModalOpen = false"
      position="center"
      width="320px"
      height="auto"
    >
      <div class="camera-selection">
        <div class="camera-selection-header">Выберите действие</div>
        <div class="camera-selection-options">
          <Button
            :type="ButtonTypeEnum.outline"
            @click="openCameraCapture('image')"
            class="camera-selection-item"
          >
            Сделать фото
          </Button>
          <Button
            :type="ButtonTypeEnum.outline"
            @click="openCameraCapture('video')"
            class="camera-selection-item"
          >
            Записать видео
          </Button>
        </div>
      </div>
    </Modal>

    <input
      ref="pendingFileInputRef"
      type="file"
      multiple
      class="attach-hidden-input"
      @change="handlePendingInputChange($event, false)"
    />
    <input
      ref="pendingMediaInputRef"
      type="file"
      accept="image/*,video/*"
      multiple
      class="attach-hidden-input"
      @change="handlePendingInputChange($event, true)"
    />
  </div>

  <Teleport :to="mentionTeleportTarget">
    <div
      v-if="showMentionList && mentionItems.length"
      ref="mentionListRef"
      class="editor-component__mentions-portal"
    >
      <ContentEditorMentionList
        :items="mentionItems"
        :selected-index="mentionSelectedIndex"
        is-fixed
        :position-style="mentionListStyle"
        :get-key="getMentionItemKey"
        :get-label="getMentionItemLabel"
        :get-subtitle="getMentionItemSubtitle"
        :get-avatar-url="getMentionItemAvatarUrl"
        :get-avatar-initials="getMentionItemAvatarInitials"
        :get-is-online="getMentionItemIsOnline"
        @select="selectMentionItem"
      />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {
  onBeforeUnmount,
  ref,
  watch,
  onMounted,
  nextTick,
  computed
} from 'vue';
import { EditorContent, useEditor } from '@tiptap/vue-3';
import { TextSelection } from '@tiptap/pm/state';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import EmojiPicker from 'vue3-emoji-picker';
import { Node, mergeAttributes } from '@tiptap/core';
import Button from '../Button/Button.vue';
import Icon from '../Icon/Icon.vue';
import { SizesEnum } from '@/common/sizes';
import { IconNameEnum } from '../Icon/enum/enum';
import { ButtonTypeEnum } from '../Button/enum/enum';
import 'vue3-emoji-picker/css';
import type {
  IContentEditorEmit,
  IContentEditorProps
} from './interfaces/content-editor';
import { ColorsEnum } from '@/common/colors.ts';
import Popover from '../Popover/Popover.vue';
import { vOnClickOutside } from '@vueuse/components';
import DropZone from './DropZone.vue';
import Modal from '../Modal/Modal.vue';
import ContentEditorMentionList from './ContentEditorMentionList.vue';
import ContentEditorFormattingToolbar from './ContentEditorFormattingToolbar.vue';

const props = defineProps<IContentEditorProps>();
const modelValue = defineModel<string>();
const showEmojiPicker = ref(false);
const emojiPickerPosition = ref({
  vertical: 'bottom' as 'top' | 'bottom',
  horizontal: 'left' as 'left' | 'right'
});
const emits = defineEmits<IContentEditorEmit>();
const LOG_PREFIX = '[ContentEditor]';

const editorDom = ref<HTMLElement | null>(null);
const mainMentionAnchorRef = ref<HTMLElement | null>(null);
const modalMentionAnchorRef = ref<HTMLElement | null>(null);
const mentionListRef = ref<HTMLDivElement | null>(null);
const mentionListStyle = ref<Record<string, string>>({});
const isCameraModalOpen = ref(false);
const isAttachModalOpen = ref(false);
const pendingFiles = ref<File[]>([]);
const pendingMediaFiles = ref<File[]>([]);
const currentMediaPreviewUrl = ref<string | null>(null);
const pendingMediaPreviewUrls = ref<string[]>([]);
const mentionSearch = ref<string | null>(null);
const dismissedMentionSearch = ref<string | null>(null);
const mentionSelectedIndex = ref(0);

const hasPendingAttachments = computed(
  () => pendingFiles.value.length > 0 || pendingMediaFiles.value.length > 0
);

const disableSend = computed(
  () =>
    !props.activeSend && editor.value?.isEmpty && !hasPendingAttachments.value
);

const mentionItems = computed(() => props.mentionItems ?? []);

const showMentionList = computed(
  () =>
    Boolean(props.activeSelectUser) &&
    mentionSearch.value !== null &&
    dismissedMentionSearch.value !== mentionSearch.value
);

const getMentionItemKey = (item: unknown, index: number): string | number =>
  props.mentionConfig?.getKey?.(item, index) ??
  props.mentionItemKey?.(item, index) ??
  index;

const getMentionItemLabel = (item: unknown): string =>
  props.mentionConfig?.getLabel?.(item) ?? props.mentionItemLabel?.(item) ?? '';

const getMentionItemSubtitle = (item: unknown): string =>
  props.mentionConfig?.getSubtitle?.(item) ??
  props.mentionItemSubtitle?.(item) ??
  '';

const getMentionItemAvatarUrl = (item: unknown): string =>
  props.mentionConfig?.getAvatarUrl?.(item) ??
  props.mentionItemAvatarUrl?.(item) ??
  '';

const getMentionItemAvatarInitials = (item: unknown): string =>
  props.mentionConfig?.getAvatarInitials?.(item) ??
  props.mentionItemAvatarInitials?.(item) ??
  getMentionItemLabel(item);

const getMentionItemIsOnline = (item: unknown): boolean =>
  props.mentionConfig?.getIsOnline?.(item) ??
  props.mentionItemIsOnline?.(item) ??
  false;

const pickerClasses = computed(() => [
  'emoji-picker',
  `emoji-picker-${emojiPickerPosition.value.vertical}`,
  `emoji-picker-${emojiPickerPosition.value.horizontal}`,
  !disableSend.value ? 'translateX' : ''
]);

const desktopAttachOptions = computed(() => [
  {
    value: 'Фото или видео',
    function: () => attachFile(true),
    iconName: IconNameEnum.image
  },
  {
    value: 'Файл',
    function: () => attachFile(false),
    iconName: IconNameEnum.file
  }
]);

const mobileAttachOptions = computed(() => [
  {
    value: 'Камера',
    function: () => (isCameraModalOpen.value = true),
    iconName: IconNameEnum.camera
  },
  ...desktopAttachOptions.value
]);

const pendingAttachmentItems = computed(() => [
  ...pendingMediaFiles.value.map((file, index) => ({
    id: `media-${file.name}-${file.lastModified}-${index}`,
    file,
    kind: 'media' as const,
    index
  })),
  ...pendingFiles.value.map((file, index) => ({
    id: `file-${file.name}-${file.lastModified}-${index}`,
    file,
    kind: 'file' as const,
    index
  }))
]);

const pendingFileItems = computed(() =>
  pendingAttachmentItems.value.filter(item => item.kind === 'file')
);

const pendingMediaPreviewItems = computed(() =>
  pendingMediaFiles.value
    .map((file, index) => ({
      id: `media-preview-${file.name}-${file.lastModified}-${index}`,
      file,
      index,
      url: pendingMediaPreviewUrls.value[index] || '',
      isVideo: getMimeType(file).startsWith('video/')
    }))
    .filter(item => !!item.url)
);

const chunkItems = <T,>(items: T[], chunkSize: number): T[][] => {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }

  return chunks;
};

const pendingMediaPreviewChunks = computed(() =>
  chunkItems(pendingMediaPreviewItems.value, 10)
);

const mentionAnchorRef = computed(
  () =>
    (isAttachModalOpen.value
      ? modalMentionAnchorRef.value
      : mainMentionAnchorRef.value) ?? null
);

const mentionTeleportTarget = computed(() => {
  const anchor = mentionAnchorRef.value;
  const dialog = anchor?.closest('dialog');

  return dialog ?? 'body';
});

const updateMentionListPosition = () => {
  if (!showMentionList.value || !mentionItems.value.length) {
    return;
  }

  const anchor = mentionAnchorRef.value;

  if (!anchor) {
    return;
  }

  const rect = anchor.getBoundingClientRect();
  const viewportPadding = 12;
  const gap = isAttachModalOpen.value ? 10 : 3;
  const width = Math.min(rect.width, window.innerWidth - viewportPadding * 2);
  const maxLeft = window.innerWidth - width - viewportPadding;
  const left = Math.min(Math.max(rect.left, viewportPadding), maxLeft);

  mentionListStyle.value = {
    left: `${left}px`,
    bottom: `${window.innerHeight - rect.top + gap}px`,
    width: `${width}px`,
    zIndex: '1001'
  };
};

const scrollActiveMentionIntoView = () => {
  nextTick(() => {
    const container = mentionListRef.value;

    if (!container) {
      return;
    }

    const activeItem = container.querySelector('[data-mention-active="true"]');

    if (!(activeItem instanceof HTMLElement)) {
      return;
    }

    activeItem.scrollIntoView({
      block: 'nearest'
    });
  });
};

const isMobileViewport = (): boolean => window.innerWidth <= 480;

const isPhoneTouchViewport = (): boolean =>
  window.innerWidth <= 480 &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;

const openCameraCapture = (type: 'image' | 'video') => {
  isCameraModalOpen.value = false;
  attachFile(true, type);
};

let isPasting = false;
let orderedListExitIntent: { pos: number; timestamp: number } | null = null;

const FILE_EXTENSION_TO_MIME: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  bmp: 'image/bmp',
  heic: 'image/heic',
  heif: 'image/heif',
  mov: 'video/quicktime',
  mp4: 'video/mp4',
  m4v: 'video/x-m4v',
  webm: 'video/webm'
};

const MIME_EXTENSION_ALIASES: Record<string, string> = {
  'image/png': 'png',
  'image/x-png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/pjpeg': 'jpg',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/bmp': 'bmp',
  'image/x-ms-bmp': 'bmp',
  'image/heic': 'heic',
  'image/heif': 'heif',
  'video/quicktime': 'mov',
  'video/mp4': 'mp4',
  'video/x-m4v': 'm4v',
  'video/webm': 'webm'
};

const getFileExtension = (fileName: string): string => {
  const match = fileName.match(/\.([^.]+)$/);

  return match?.[1]?.toLowerCase() ?? '';
};

const getMimeType = (file: File): string => {
  if (file.type) {
    return file.type.toLowerCase();
  }

  const extension = getFileExtension(file.name);

  return FILE_EXTENSION_TO_MIME[extension] ?? '';
};

const getNormalizedFileName = (file: File, mimeType: string): string => {
  const trimmedName = file.name.trim();
  const fallbackExtension = MIME_EXTENSION_ALIASES[mimeType];
  const hasExtension = Boolean(getFileExtension(trimmedName));

  if (!trimmedName) {
    const baseName = mimeType.startsWith('image/')
      ? 'image'
      : mimeType.startsWith('video/')
        ? 'video'
        : 'file';

    return fallbackExtension
      ? `${baseName}-${Date.now()}.${fallbackExtension}`
      : `${baseName}-${Date.now()}`;
  }

  if (hasExtension || !fallbackExtension) {
    return trimmedName;
  }

  return `${trimmedName}.${fallbackExtension}`;
};

const getFileLogMeta = (file: File, mimeType = getMimeType(file)) => ({
  fileName: file.name,
  fileType: file.type,
  normalizedMimeType: mimeType,
  fileSize: file.size,
  lastModified: file.lastModified
});

const shouldDetachFile = (mimeType: string): boolean =>
  mimeType.startsWith('image/') || mimeType.startsWith('video/');

const normalizeFile = async (file: File): Promise<File> => {
  const mimeType = getMimeType(file);
  const fileName = getNormalizedFileName(file, mimeType);

  console.warn(`${LOG_PREFIX} normalize file`, {
    ...getFileLogMeta(file, mimeType),
    normalizedFileName: fileName,
    shouldDetach: shouldDetachFile(mimeType)
  });

  if (
    mimeType === file.type &&
    fileName === file.name &&
    !shouldDetachFile(mimeType)
  ) {
    console.warn(
      `${LOG_PREFIX} keep original file`,
      getFileLogMeta(file, mimeType)
    );
    return file;
  }

  try {
    const buffer = await file.arrayBuffer();

    console.warn(`${LOG_PREFIX} detached file copy created`, {
      ...getFileLogMeta(file, mimeType),
      normalizedFileName: fileName,
      bufferSize: buffer.byteLength
    });

    return new File([buffer], fileName, {
      type: mimeType || file.type,
      lastModified: file.lastModified
    });
  } catch (error) {
    console.warn(`${LOG_PREFIX} failed to detach file, using original`, {
      ...getFileLogMeta(file, mimeType),
      normalizedFileName: fileName,
      error
    });
    return file;
  }
};

const toFileList = (files: File[]): FileList => {
  const dataTransfer = new DataTransfer();

  files.forEach(file => dataTransfer.items.add(file));

  return dataTransfer.files;
};

const emitAttachFiles = async (
  files: FileList | File[],
  onlyMedia?: boolean
): Promise<void> => {
  console.warn(`${LOG_PREFIX} emitAttachFiles called`, {
    inputCount: Array.from(files).length,
    onlyMedia
  });

  const normalizedFiles = await Promise.all(Array.from(files, normalizeFile));

  if (!normalizedFiles.length) {
    console.warn(`${LOG_PREFIX} no files after normalization`);
    return;
  }

  const isOnlyMedia =
    onlyMedia ??
    normalizedFiles.every(file => {
      const mimeType = getMimeType(file);

      return mimeType.startsWith('image/') || mimeType.startsWith('video/');
    });

  console.warn(`${LOG_PREFIX} emit normalized files`, {
    files: normalizedFiles.map(file => getFileLogMeta(file)),
    isOnlyMedia
  });

  emits('unmount-attach-file', toFileList(normalizedFiles), isOnlyMedia);
};

const queueAttachFiles = async (
  files: FileList | File[],
  onlyMedia: boolean
): Promise<void> => {
  const normalizedFiles = await Promise.all(Array.from(files, normalizeFile));

  if (!normalizedFiles.length) {
    return;
  }

  if (onlyMedia) {
    const mediaFiles = normalizedFiles.filter(file =>
      shouldDetachFile(getMimeType(file))
    );
    const regularFiles = normalizedFiles.filter(
      file => !shouldDetachFile(getMimeType(file))
    );

    if (mediaFiles.length) {
      pendingMediaFiles.value = [...pendingMediaFiles.value, ...mediaFiles];
    }

    if (regularFiles.length) {
      pendingFiles.value = [...pendingFiles.value, ...regularFiles];
    }
  } else {
    pendingFiles.value = [...pendingFiles.value, ...normalizedFiles];
  }

  isAttachModalOpen.value = true;
};

const clearPendingAttachments = (): void => {
  pendingFiles.value = [];
  pendingMediaFiles.value = [];
};

const handleAttachModalClose = (): void => {
  closeEmojiPicker();
  isAttachModalOpen.value = false;
  clearPendingAttachments();
};

const removePendingAttachment = (
  kind: 'file' | 'media',
  index: number
): void => {
  if (kind === 'media') {
    const nextMediaFiles = pendingMediaFiles.value.filter(
      (_, fileIndex) => fileIndex !== index
    );
    pendingMediaFiles.value = nextMediaFiles;

    if (!nextMediaFiles.length && !pendingFiles.value.length) {
      handleAttachModalClose();
    }

    return;
  }

  const nextFiles = pendingFiles.value.filter(
    (_, fileIndex) => fileIndex !== index
  );
  pendingFiles.value = nextFiles;

  if (!nextFiles.length && !pendingMediaFiles.value.length) {
    handleAttachModalClose();
  }
};

const handlePendingInputChange = async (
  event: Event,
  onlyMedia: boolean
): Promise<void> => {
  const target = event.target as HTMLInputElement;

  if (!target.files?.length) {
    return;
  }

  await queueAttachFiles(target.files, onlyMedia);
  target.value = '';
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getShortName = (name: string): string => {
  if (!name) return '';

  const lastDot = name.lastIndexOf('.');
  if (lastDot === -1) return name;

  const base = name.slice(0, lastDot);
  const ext = name.slice(lastDot);

  if (base.length <= 30) return name;

  const start = base.slice(0, 27);

  return `${start} ... ${ext}`;
};

watch(
  () => pendingMediaFiles.value,
  files => {
    pendingMediaPreviewUrls.value.forEach(url => URL.revokeObjectURL(url));
    pendingMediaPreviewUrls.value = files.map(file =>
      URL.createObjectURL(file)
    );
  },
  { deep: true }
);

watch(
  () => pendingMediaFiles.value[0],
  (file, previousFile) => {
    if (currentMediaPreviewUrl.value) {
      URL.revokeObjectURL(currentMediaPreviewUrl.value);
      currentMediaPreviewUrl.value = null;
    }

    if (!file || file === previousFile) {
      return;
    }

    currentMediaPreviewUrl.value = URL.createObjectURL(file);
  }
);

const SpanNode = Node.create({
  name: 'spanNode',
  inline: true,
  group: 'inline',
  atom: true,
  selectable: false,
  addAttributes() {
    return {
      class: { default: 'link' },
      content: { default: '' },
      userId: {
        default: null,
        parseHTML: element => element.getAttribute('data-user-id'),
        renderHTML: attributes => {
          if (!attributes.userId) {
            return {};
          }
          return { 'data-user-id': attributes.userId };
        }
      }
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-span]' }];
  },
  renderHTML({
    node,
    HTMLAttributes
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    node: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    HTMLAttributes: Record<string, any>;
  }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-span': '',
        contenteditable: 'false',
        class: node?.attrs.class
      }),
      node?.attrs.content
    ];
  }
});

const editor = useEditor({
  extensions: [
    StarterKit.configure({
      link: false,
      heading: false,
      blockquote: false,
      codeBlock: false
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: { class: 'link' }
    }),
    Placeholder.configure({
      placeholder: 'Начните печатать...',
      emptyEditorClass: 'is-editor-empty'
    }),
    SpanNode
  ],
  content: modelValue.value,
  editorProps: {
    handlePaste(_, event) {
      const clipboardData = event.clipboardData;
      if (!clipboardData) return false;

      if (clipboardData.files.length > 0 && props.activeAttachFile) {
        event.preventDefault();
        event.stopPropagation();

        if (isPasting) {
          return true;
        }

        isPasting = true;

        void queueAttachFiles(clipboardData.files, true);

        setTimeout(() => {
          isPasting = false;
        }, 200);

        return true;
      }

      return false;
    }
  },
  onUpdate: ({ editor }) => {
    modelValue.value = editor.getHTML();

    if (props.activeSelectUser) {
      const { $from } = editor.state.selection;
      const rangeStart = Math.max(0, $from.parentOffset - 50);
      const textBefore = $from.parent.textBetween(
        rangeStart,
        $from.parentOffset,
        null,
        '\ufffc'
      );
      const match = textBefore.match(/@([^\s]*)$/);

      if (match) {
        const nextMentionSearch = match[1].toLowerCase();

        if (mentionSearch.value !== nextMentionSearch) {
          mentionSelectedIndex.value = 0;
        }

        mentionSearch.value = nextMentionSearch;
        emits('mention-change', nextMentionSearch);
      } else {
        mentionSearch.value = null;
        dismissedMentionSearch.value = null;
        emits('mention-change', null);
      }
    }
  },
  parseOptions: { preserveWhitespace: true }
});

watch(modelValue, newVal => {
  if (editor?.value && newVal !== editor.value.getHTML()) {
    editor.value.commands.setContent(newVal ?? '', {
      parseOptions: { preserveWhitespace: true }
    });
  }
});

watch(mentionItems, items => {
  if (!items.length) {
    mentionSelectedIndex.value = 0;
    mentionListStyle.value = {};
    return;
  }

  if (mentionSelectedIndex.value >= items.length) {
    mentionSelectedIndex.value = items.length - 1;
  }

  if (showMentionList.value) {
    nextTick(() => {
      updateMentionListPosition();
      scrollActiveMentionIntoView();
    });
  }
});

watch(mentionSelectedIndex, () => {
  if (showMentionList.value) {
    nextTick(() => {
      updateMentionListPosition();
      scrollActiveMentionIntoView();
    });
  }
});

watch(showMentionList, isOpen => {
  if (!isOpen) {
    mentionSelectedIndex.value = 0;
    mentionListStyle.value = {};
    return;
  }

  dismissedMentionSearch.value = null;
  nextTick(() => {
    updateMentionListPosition();
    scrollActiveMentionIntoView();
  });
});

watch(
  () => isAttachModalOpen.value,
  () => {
    if (showMentionList.value) {
      nextTick(() => updateMentionListPosition());
    }
  }
);

const addLink = (): void => {
  if (!editor?.value) return;
  const url = prompt('Enter URL:');
  if (url) {
    editor.value
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url, class: 'link' })
      .run();
  }
};

const addEmoji = (emoji: { i: string }): void => {
  if (!editor?.value) return;
  editor.value.chain().focus().insertContent(emoji.i).run();
};

const attachFile = async (
  onlyMedia: boolean = false,
  cameraType?: 'image' | 'video'
): Promise<void> => {
  if (!editor?.value) return;
  const input = document.createElement('input');
  input.type = 'file';
  if (cameraType) {
    if (cameraType === 'video') {
      input.accept = 'video/*';
    } else if (cameraType === 'image') {
      input.accept = 'image/*';
    } else {
      input.accept = 'image/*,video/*';
    }
    input.capture = 'environment';
    input.multiple = false;
  } else {
    input.multiple = true;
    if (onlyMedia) {
      input.accept = 'image/*,video/*';
    }
  }
  input.onchange = () => {
    if (!input?.files) return;

    const shouldSendImmediately =
      isMobileViewport() && (onlyMedia || Boolean(cameraType));

    if (shouldSendImmediately) {
      void emitAttachFiles(input.files, true);
      return;
    }

    void queueAttachFiles(input.files, onlyMedia);
  };
  input.click();
};

const fileDropped = (payload: { files: File[]; onlyMedia: boolean }): void => {
  console.warn(
    `${LOG_PREFIX} fileDropped event received`,
    payload.files.map(file => getFileLogMeta(file))
  );
  void queueAttachFiles(payload.files, payload.onlyMedia);
};

const handleAttachModalSend = (): void => {
  if (!editor?.value) {
    return;
  }

  emits('unmount-send', {
    content: editor.value.getHTML(),
    files: pendingFiles.value.length
      ? toFileList(pendingFiles.value)
      : undefined,
    mediaFiles: pendingMediaFiles.value.length
      ? toFileList(pendingMediaFiles.value)
      : undefined
  });

  isAttachModalOpen.value = false;
  clearPendingAttachments();
  closeEmojiPicker();
  editor.value.chain().focus();
};

const handleSave = (): void => {
  if (!editor?.value) {
    return;
  }

  if (hasPendingAttachments.value) {
    handleAttachModalSend();
    return;
  }

  emits('unmount-send', { content: editor.value.getHTML() });
  editor.value.chain().focus();
};

const addSpanLink = (content: string, attrs?: Record<string, string>): void => {
  if (!editor?.value) return;

  const { $from } = editor.value.state.selection;
  const rangeStart = Math.max(0, $from.parentOffset - 50);
  const textBefore = $from.parent.textBetween(
    rangeStart,
    $from.parentOffset,
    null,
    '\ufffc'
  );

  const match = textBefore.match(/@([^\s]*)$/);

  if (match) {
    const matchStart = $from.start() + rangeStart + (match.index || 0);
    editor.value
      .chain()
      .focus()
      .insertContentAt(
        { from: matchStart, to: $from.pos },
        {
          type: 'spanNode',
          attrs: { content, class: 'link', ...attrs }
        }
      )
      .run();
  } else {
    editor.value
      .chain()
      .focus()
      .insertContent({
        type: 'spanNode',
        attrs: { content, class: 'link', ...attrs }
      })
      .run();
  }
};

const clearMentionState = (): void => {
  mentionSearch.value = null;
  dismissedMentionSearch.value = null;
  mentionSelectedIndex.value = 0;
  emits('mention-change', null);
};

const selectMentionItem = (item: unknown): void => {
  const getInsertLabel =
    props.mentionConfig?.getInsertLabel ?? props.mentionInsertLabel;

  if (!getInsertLabel) {
    return;
  }

  const content = getInsertLabel(item);

  if (!content) {
    return;
  }

  addSpanLink(
    content,
    (props.mentionConfig?.getInsertAttrs ?? props.mentionInsertAttrs)?.(item)
  );
  clearMentionState();
};

const toggleUserSelect = (): void => {
  if (!editor?.value) return;

  const { $from } = editor.value.state.selection;
  const rangeStart = Math.max(0, $from.parentOffset - 50);
  const textBefore = $from.parent.textBetween(
    rangeStart,
    $from.parentOffset,
    null,
    '\ufffc'
  );

  const match = textBefore.match(/@([^\s]*)$/);

  if (match) {
    const matchStart = $from.start() + rangeStart + (match.index || 0);
    editor.value
      .chain()
      .focus()
      .deleteRange({ from: matchStart, to: $from.pos })
      .run();
  } else {
    editor.value.chain().focus().insertContent('@').run();
  }
};

const focus = (): void => {
  if (!editor?.value) return;
  editor.value.chain().focus();
};

const updateEmojiPosition = (
  buttonEl: HTMLElement,
  pickerWidth = 300,
  pickerHeight = 260
): void => {
  if (!buttonEl) return;

  const rect = buttonEl.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  emojiPickerPosition.value.vertical =
    rect.bottom + pickerHeight > viewportHeight ? 'top' : 'bottom';

  emojiPickerPosition.value.horizontal =
    rect.left + pickerWidth > viewportWidth ? 'right' : 'left';
};

const toggleEmojiPicker = (event: Event): void => {
  showEmojiPicker.value = !showEmojiPicker.value;
  if (showEmojiPicker.value) {
    const btn = event.currentTarget as HTMLElement;
    nextTick(() => {
      updateEmojiPosition(btn);
    });
  }
};

const closeEmojiPicker = (): void => {
  showEmojiPicker.value = false;
};

const handleWindowUpdate = (): void => {
  const btn = document.querySelector(
    '.toolbar-button.smile-button'
  ) as HTMLElement;
  if (showEmojiPicker.value && btn) {
    updateEmojiPosition(btn);
  }

  if (showMentionList.value) {
    updateMentionListPosition();
  }
};

const getOrderedListCursorContext = () => {
  if (!editor.value) {
    return null;
  }

  const { selection, doc } = editor.value.state;

  if (!selection.empty) {
    return null;
  }

  const { $from } = selection;
  let listItemDepth = -1;
  let orderedListDepth = -1;

  for (let depth = $from.depth; depth > 0; depth -= 1) {
    const node = $from.node(depth);

    if (listItemDepth === -1 && node.type.name === 'listItem') {
      listItemDepth = depth;
    }

    if (node.type.name === 'orderedList') {
      orderedListDepth = depth;
      break;
    }
  }

  if (listItemDepth === -1 || orderedListDepth === -1) {
    return null;
  }

  const orderedListNode = $from.node(orderedListDepth);
  const listItemNode = $from.node(listItemDepth);
  const listItemIndex = $from.index(orderedListDepth);
  const orderedListAfter = $from.after(orderedListDepth);
  const cursorAtEndOfTextblock =
    $from.parent.isTextblock &&
    $from.parentOffset === $from.parent.content.size &&
    $from.index(listItemDepth) === listItemNode.childCount - 1;

  return {
    cursorPos: $from.pos,
    docSize: doc.content.size,
    isLastItem: listItemIndex === orderedListNode.childCount - 1,
    isAtEndOfItem: cursorAtEndOfTextblock,
    orderedListAfter
  };
};

const exitOrderedListToParagraph = () => {
  if (!editor.value) {
    return;
  }

  const context = getOrderedListCursorContext();

  if (!context) {
    return;
  }

  const { state, view } = editor.value;
  const positionAfterList = context.orderedListAfter;
  const nextNode = state.doc.resolve(positionAfterList).nodeAfter;
  let tr = state.tr;

  if (!nextNode || nextNode.type.name !== 'paragraph') {
    const paragraph = state.schema.nodes.paragraph.create();

    tr = tr.insert(positionAfterList, paragraph);
  }

  tr = tr.setSelection(
    TextSelection.near(tr.doc.resolve(positionAfterList + 1))
  );

  view.dispatch(tr.scrollIntoView());
  view.focus();
};

const handleKeydown = (event: KeyboardEvent): void => {
  if (window.innerWidth <= 480) {
    return;
  }

  if (event.key !== 'ArrowDown') {
    orderedListExitIntent = null;
  }

  if (showMentionList.value) {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      dismissedMentionSearch.value = mentionSearch.value;
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();

      if (
        mentionSelectedIndex.value >= 0 &&
        mentionSelectedIndex.value < mentionItems.value.length
      ) {
        selectMentionItem(mentionItems.value[mentionSelectedIndex.value]);
      }

      return;
    }

    if (
      mentionItems.value.length &&
      (event.key === 'ArrowDown' || event.key === 'ArrowUp')
    ) {
      event.preventDefault();
      event.stopPropagation();

      const delta = event.key === 'ArrowDown' ? 1 : -1;
      mentionSelectedIndex.value =
        (mentionSelectedIndex.value + delta + mentionItems.value.length) %
        mentionItems.value.length;
      return;
    }
  }

  if (
    event.key === 'Enter' &&
    event.shiftKey &&
    !(event.ctrlKey || event.metaKey) &&
    editor.value?.isActive('orderedList')
  ) {
    event.preventDefault();
    event.stopPropagation();
    orderedListExitIntent = null;
    editor.value.commands.splitListItem('listItem');
    return;
  }

  if (event.key === 'ArrowDown') {
    const orderedListContext = getOrderedListCursorContext();

    if (
      orderedListContext?.isLastItem &&
      orderedListContext.isAtEndOfItem &&
      orderedListContext.orderedListAfter >= orderedListContext.docSize
    ) {
      event.preventDefault();
      event.stopPropagation();

      const now = Date.now();

      if (
        orderedListExitIntent &&
        orderedListExitIntent.pos === orderedListContext.cursorPos &&
        now - orderedListExitIntent.timestamp < 1200
      ) {
        orderedListExitIntent = null;
        exitOrderedListToParagraph();
      } else {
        orderedListExitIntent = {
          pos: orderedListContext.cursorPos,
          timestamp: now
        };
      }

      return;
    }

    orderedListExitIntent = null;
  }

  if (
    !props.disableSendOnEnter &&
    event.key === 'Enter' &&
    !!event.code &&
    !(event.shiftKey || event.ctrlKey || event.metaKey)
  ) {
    event.preventDefault();
    event.stopPropagation();
    handleSave();
  }
};

const handleMobileContextMenu = (event: Event): void => {
  if (!isPhoneTouchViewport()) {
    return;
  }

  event.preventDefault();
};

onMounted(() => {
  if (!editor?.value?.view?.dom) return;
  editorDom.value = editor.value.view.dom;

  window.addEventListener('resize', handleWindowUpdate);
  window.addEventListener('scroll', handleWindowUpdate, true);
  editorDom.value.addEventListener('keydown', handleKeydown, { capture: true });
  editorDom.value.addEventListener('contextmenu', handleMobileContextMenu);
});

onBeforeUnmount(() => {
  editor?.value?.destroy();
  if (editorDom.value) {
    editorDom.value.removeEventListener('keydown', handleKeydown, {
      capture: true
    });
    editorDom.value.removeEventListener('contextmenu', handleMobileContextMenu);
  }

  if (currentMediaPreviewUrl.value) {
    URL.revokeObjectURL(currentMediaPreviewUrl.value);
  }

  pendingMediaPreviewUrls.value.forEach(url => URL.revokeObjectURL(url));

  window.removeEventListener('resize', handleWindowUpdate);
  window.removeEventListener('scroll', handleWindowUpdate, true);
});

defineExpose({ addSpanLink, focus, editor, emitAttachFiles });
</script>

<style>
.link {
  color: var(--link-color);
}

.link:visited,
.link:active {
  color: var(--primary-color);
}

.editor-component {
  position: relative;
  background-color: var(--white);
  border: 0.5px solid var(--border-color);
  border-radius: 10px;
  min-height: 105px;

  & .tiptap {
    padding: 20px 16px;
    outline: none;

    & * {
      margin: 0;
    }
  }
}

.toolbar,
.attach-modal__toolbar {
  display: flex;
  gap: 8px;
  height: 30px;
  margin: 0 16px 16px;
}

.attach-modal__toolbar-left {
  display: flex;
  gap: 8px;
}

.right-buttons {
  display: none;
}

.toolbar-button {
  min-height: 30px !important;
  position: relative;

  & .emoji-picker {
    position: absolute;
    top: 40px;
    left: 0;
  }

  & .emoji-picker-top {
    top: auto;
    bottom: 50px;
  }

  .emoji-picker-bottom {
    top: 50px;
  }

  .emoji-picker-left {
    left: 0;
  }

  .emoji-picker-right {
    left: auto;
    right: -7px;
  }

  &.right {
    margin-left: auto;
  }
}

.mobile-item {
  display: none !important;
}

button.ghost-yui-kit.mobile-buttons {
  display: none;
}

button.toolbar-button,
button.mobile-buttons {
  &.button-yui-kit.primary-yui-kit,
  &.button-yui-kit.ghost-yui-kit {
    padding: 7px 8px;
    width: 30px;
    color: var(--text-neutral-color);
    &:not(.right) path {
      stroke-width: 1.5px;
    }
    &:disabled,
    &.disable-yui-kit {
      background-color: var(--button-neutral-color);
      color: var(--text-light-color);
    }
  }
  &.ghost-yui-kit.button-yui-kit,
  &.ghost-yui-kit.button-yui-kit.disable-yui-kit {
    &:not(:disabled) {
      background-color: var(--background-light-color);

      &:hover {
        background-color: var(--primary-pressed-light-color);
      }
    }
  }
}

.is-editor-empty::before {
  content: attr(data-placeholder);
  color: var(--text-neutral-color);
  font-size: 16px;
  pointer-events: none;
  float: left;
  height: 0;
}

.editor-component-slot {
  grid-column: span 3;
  padding: 16px 16px 0;
}

.attach-modal-container {
  border-radius: 25px !important;
}

.attach-modal {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px;
}

.attach-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.attach-modal__attachments__all {
  max-height: min(800px, 60vh);
  overflow-y: scroll;
  width: calc(100% + 12px);
  padding-right: 8px;
}

.attach-modal__close.button-yui-kit.ghost-yui-kit {
  width: 22px;
  height: 22px;
  min-height: 22px;
  margin-left: auto;
  padding: 3px;
  color: var(--text-color);
}

.attach-modal__media-preview {
  overflow: hidden;
  border-radius: 24px;
  background: linear-gradient(135deg, #6fd3ff 0%, #3db6c6 100%);
}

.attach-modal__media-preview img,
.attach-modal__media-preview video {
  display: block;
  width: 100%;
  max-height: 360px;
  object-fit: cover;
}

.attach-modal__dropzones {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.attach-modal__dropzones--single {
  grid-template-columns: 1fr;
}

.attach-modal__dropzone {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 110px;
  border: 2px dashed #8aa8ff;
  border-radius: 20px;
  background: #f4f8ff;
  color: var(--text-neutral-color);
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.attach-modal__dropzone:hover {
  border-color: var(--primary-color);
  background: #edf3ff;
  transform: translateY(-1px);
}

.attach-modal__dropzone--media {
  background: #eefbff;
}

.attach-modal__media-grid {
  display: grid;
  border-radius: 15px;
  overflow: hidden;
}

.attach-modal__media-groups {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.attach-modal__media-grid.attach-modal__media-grid-2-item {
  grid-template-columns: repeat(2, 1fr);
}

.attach-modal__media-grid.attach-modal__media-grid-3-item {
  grid-template-columns: repeat(2, 1fr);
}

.attach-modal__media-grid.attach-modal__media-grid-3-item > :first-child {
  grid-column: span 2;
}

.attach-modal__media-grid.attach-modal__media-grid-4-item,
.attach-modal__media-grid.attach-modal__media-grid-4-item {
  grid-template-columns: repeat(2, 1fr);
}

.attach-modal__media-grid.attach-modal__media-grid-5-item {
  grid-template-columns: repeat(6, 1fr);
}

.attach-modal__media-grid.attach-modal__media-grid-5-item > :nth-child(-n + 2) {
  grid-column: span 3;
}

.attach-modal__media-grid.attach-modal__media-grid-5-item
  > :nth-last-child(-n + 3) {
  grid-column: span 2;
}

.attach-modal__media-grid.attach-modal__media-grid-6-item {
  grid-template-columns: repeat(3, 1fr);
}

.attach-modal__media-grid.attach-modal__media-grid-7-item {
  grid-template-columns: repeat(6, 1fr);
}

.attach-modal__media-grid.attach-modal__media-grid-7-item > :nth-child(-n + 4) {
  grid-column: span 3;
}

.attach-modal__media-grid.attach-modal__media-grid-7-item
  > :nth-last-child(-n + 3) {
  grid-column: span 2;
}

.attach-modal__media-grid.attach-modal__media-grid-8-item {
  grid-template-columns: repeat(6, 1fr);
}

.attach-modal__media-grid.attach-modal__media-grid-8-item > :nth-child(-n + 2) {
  grid-column: span 3;
}

.attach-modal__media-grid.attach-modal__media-grid-8-item > :nth-child(n + 3) {
  grid-column: span 2;
}

.attach-modal__media-grid.attach-modal__media-grid-9-item,
.attach-modal__media-grid.attach-modal__media-grid-10-item {
  grid-template-columns: repeat(3, 1fr);
}

.attach-modal__media-grid.attach-modal__media-grid-10-item > :first-child {
  grid-column: span 3;
}

.attach-modal__media-tile {
  position: relative;
  min-height: 150px;
  overflow: hidden;
  background: linear-gradient(135deg, #6fd3ff 0%, #3db6c6 100%);
}

.attach-modal__media-tile img,
.attach-modal__media-tile video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.attach-modal__media-tile-remove.button-yui-kit.ghost-yui-kit {
  position: absolute;
  right: 8px;
  bottom: 8px;
  z-index: 1;
  width: 40px;
  height: 40px;
  min-height: 40px;
  padding: 0;
  background: rgb(28 38 53 / 58%);
  color: var(--white);
  justify-content: center;
}

.attach-modal__media-tile-remove.button-yui-kit.ghost-yui-kit:hover {
  background: rgb(28 38 53 / 72%);
}

.attach-modal__attachments {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.attach-modal__attachment {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px 12px 14px;
  border-radius: 18px;
  background: #dfe9ff;
}

.attach-modal__attachment-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--white);
  color: var(--primary-color);
}

.attach-modal__attachment-body {
  min-width: 0;
  flex: 1;
}

.attach-modal__attachment-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 400;
  color: var(--text-color);
}

.attach-modal__attachment-size {
  margin-top: 2px;
  font-size: 12px;
  color: var(--text-color);
}

.attach-modal__attachment-remove.button-yui-kit.ghost-yui-kit {
  width: 24px;
  height: 24px;
  justify-content: end;
  padding: 0;
  color: var(--error-color);
  background: transparent;
}

.attach-modal__editor {
  position: relative;
  background: var(--white);
  border: 0.5px solid var(--border-color);
  border-radius: 24px;

  & .tiptap {
    min-height: 58px;
    padding: 18px 16px 12px;
  }

  .editor-component-slot {
    padding: 16px 16px 0;
  }
}

.attach-modal__editor--mentions-open {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.attach-hidden-input {
  display: none;
}

@media screen and (width <= 480px) {
  .editor-component .tiptap,
  .attach-modal__editor .tiptap {
    -webkit-touch-callout: none;
  }

  button.ghost-yui-kit.small.mobile-buttons {
    display: grid;
    padding: 3px;
    background-color: transparent !important;

    & svg.icon-yui-kit {
      font-size: 24px;
    }

    & svg.icon-yui-kit.content-editor__save {
      & path {
        fill: var(--primary-color);
      }
    }
  }

  button.ghost-yui-kit.small.mobile-buttons.smile-button {
    & svg.icon-yui-kit {
      & path {
        stroke-width: 1.33px !important;
      }
    }
  }

  .editor-component {
    display: grid;
    grid-template-columns: minmax(27px, min-content) 1fr auto;
    align-items: end;
    padding: 10px;
    gap: 8px;
    min-height: 17px;
    border-radius: 30px;

    & .tiptap {
      padding: 5px;
    }
  }
  .toolbar {
    display: none;
  }
  .right-buttons {
    display: flex;
    gap: 8px;
    align-items: center;
    & button.button-yui-kit.ghost-yui-kit.right {
      color: var(--primary-color);
    }

    .translateX {
      transform: translateX(41px);
    }
  }
  .mobile-item {
    display: inline-block !important;
  }

  .editor-component-slot {
    padding: 0;
  }
}

.camera-selection {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
}

.camera-selection-header {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: var(--text-color, #1a1a1a);
}

.camera-selection-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.camera-selection-item {
  width: 100%;
  justify-content: flex-start;
  font-size: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: var(--background-light-color);
  transition: all 0.2s ease;

  &:active {
    background-color: var(--primary-pressed-light-color);
    transform: scale(0.98);
  }

  & :deep(.icon-yui-kit) {
    margin-right: 12px;
    color: var(--primary-color);
  }
}

.attach-file-popover .popover-yui-kit__content {
  transform: translate(-10px, calc(-100% - 47px)) !important;
}
</style>
