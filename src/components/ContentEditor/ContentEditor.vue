<template>
  <div class="editor-component">
    <div class="editor-component-slot" v-if="$slots.action">
      <slot name="action" />
    </div>
    <Popover
      isWCUse
      :disabled="!props.activeAttachFile"
      :options="[
        { value: 'Фото или видео', function: () => attachFile(true) },
        { value: 'Файл', function: () => attachFile(false) }
      ]"
      translateY="-115px"
      class="mobile-item"
    >
      <template #trigger>
        <Button
          :type="ButtonTypeEnum.ghost"
          :size="SizesEnum.small"
          class="toolbar-button attach-file-button mobile-buttons"
          :disabled="!props.activeAttachFile"
        >
          <Icon :name="IconNameEnum.paperClip" />
        </Button>
      </template>
    </Popover>

    <EditorContent class="editor-content" :editor="editor" />
    <DropZone v-if="props.activeAttachFile" @files-dropped="fileDropped" />

    <div class="right-buttons">
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

    <div class="toolbar">
      <Popover
        isWCUse
        :disabled="!props.activeAttachFile"
        :options="[
          { value: 'Фото или видео', function: () => attachFile(true) },
          { value: 'Файл', function: () => attachFile(false) }
        ]"
        translateY="-115px"
      >
        <template #trigger>
          <Button
            :type="ButtonTypeEnum.ghost"
            :size="SizesEnum.small"
            class="toolbar-button attach-file-button"
            :disabled="!props.activeAttachFile"
          >
            <Icon :name="IconNameEnum.paperClip" :width="16" :height="16" />
          </Button>
        </template>
      </Popover>

      <Button
        v-if="false"
        :type="ButtonTypeEnum.ghost"
        class="toolbar-button"
        :size="SizesEnum.small"
        @click="addLink"
      >
        <Icon :name="IconNameEnum.atSign" />
      </Button>

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
  </div>
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

// v-model binding
const props = defineProps<IContentEditorProps>();
const modelValue = defineModel<string>();
const showEmojiPicker = ref(false);
const emojiPickerPosition = ref({
  vertical: 'bottom' as 'top' | 'bottom',
  horizontal: 'left' as 'left' | 'right'
});
const emits = defineEmits<IContentEditorEmit>();

const disableSend = computed(() => !props.activeSend && editor.value?.isEmpty);

const pickerClasses = computed(() => [
  'emoji-picker',
  `emoji-picker-${emojiPickerPosition.value.vertical}`,
  `emoji-picker-${emojiPickerPosition.value.horizontal}`,
  !disableSend.value ? 'translateX' : ''
]);

const editorDom = ref<HTMLElement | null>(null);

/* ------------------ Custom Span Node ------------------ */
const SpanNode = Node.create({
  name: 'spanNode',
  inline: true,
  group: 'inline',
  atom: true,
  selectable: false,
  addAttributes() {
    return {
      class: { default: 'link' },
      content: { default: '' }
    };
  },
  parseHTML() {
    return [{ tag: 'span[data-span]' }];
  },
  renderHTML({
    node,
    HTMLAttributes
  }: {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    node: any;
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      bold: false,
      italic: false,
      strike: false,
      heading: false,
      bulletList: false,
      orderedList: false,
      codeBlock: false,
      blockquote: false,
      underline: false
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
        const onlyMedia = Array.from(clipboardData.files).every(
          file =>
            file.type.startsWith('image/') || file.type.startsWith('video/')
        );

        emits('unmount-attach-file', clipboardData.files, onlyMedia);

        event.preventDefault();
        return true;
      }
    }
  },
  onUpdate: ({ editor }) => {
    modelValue.value = editor.getHTML();
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

const attachFile = (onlyMedia: boolean = false): void => {
  if (!editor?.value) return;
  const input = document.createElement('input');
  input.type = 'file';
  input.multiple = true;
  if (onlyMedia) {
    input.accept = 'image/*,video/*';
  }
  input.onchange = () => {
    if (!input?.files) return;
    emits('unmount-attach-file', input.files, onlyMedia);
  };
  input.click();
};

const fileDropped = (data: File[]) => {
  const onlyMedia = data.every(
    file => file.type.startsWith('image/') || file.type.startsWith('video/')
  );

  const dataTransfer = new DataTransfer();
  data.forEach(file => dataTransfer.items.add(file));

  const fileList = dataTransfer.files;

  emits('unmount-attach-file', fileList, onlyMedia);
};

const handleSave = (): void => {
  if (editor?.value) {
    emits('unmount-send', { content: editor.value.getHTML() });
    editor.value.chain().focus();
  }
};

/* ------------------ Insert undeletable span ------------------ */
const addSpanLink = (content: string): void => {
  if (!editor?.value) return;
  editor.value
    .chain()
    .focus()
    .insertContent({
      type: 'spanNode',
      attrs: { content: content + ',', class: 'link' }
    })
    .run();
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
  /* ------------------ Emoji Picker positioning ------------------ */
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
};

/* ------------------ Enter key to save ------------------ */
const handleKeydown = (event: KeyboardEvent): void => {
  if (window.innerWidth <= 480) {
    return;
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

/* ------------------ Safe editor event listeners ------------------ */
onMounted(() => {
  if (!editor?.value?.view?.dom) return;
  editorDom.value = editor.value.view.dom;

  window.addEventListener('resize', handleWindowUpdate);
  window.addEventListener('scroll', handleWindowUpdate, true);
  editorDom.value.addEventListener('keydown', handleKeydown, { capture: true });
});

onBeforeUnmount(() => {
  editor?.value?.destroy();
  if (editorDom.value) {
    editorDom.value.removeEventListener('keydown', handleKeydown, {
      capture: true
    });
  }

  window.removeEventListener('resize', handleWindowUpdate);
  window.removeEventListener('scroll', handleWindowUpdate, true);
});

defineExpose({ addSpanLink, focus });
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

.toolbar {
  display: flex;
  gap: 8px;
  height: 30px;
  margin: 0 16px 16px;
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

@media screen and (width <= 480px) {
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
    align-items: center;
    padding: 15px;
    gap: 16px;
    min-height: 17px;
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
</style>
