<template>
  <div class="editor-component">
    <Popover
      isWCUse
      :disabled="!props.activeAttachFile"
      :options="[
        { value: 'Фото или видео', function: () => attachFile(true) },
        { value: 'Файл', function: () => attachFile(false) }
      ]"
      position="top"
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

    <div class="right-buttons">
      <Button
        :type="ButtonTypeEnum.ghost"
        :size="SizesEnum.small"
        class="toolbar-button mobile-buttons smile-button"
        @click="toggleEmojiPicker"
      >
        <Icon :name="IconNameEnum.smile" />
        <div @click.stop :class="pickerClasses" v-show="showEmojiPicker">
          <EmojiPicker :native="true" @select="addEmoji" />
        </div>
      </Button>

      <Button
        v-show="!editor?.isEmpty"
        :type="ButtonTypeEnum.ghost"
        :size="SizesEnum.small"
        class="toolbar-button right mobile-buttons"
        @click="handleSave"
      >
        <Icon :name="IconNameEnum.planeRight" :width="21" :height="21" />
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
        position="top"
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
        @click="toggleEmojiPicker"
      >
        <Icon :name="IconNameEnum.smile" :width="16" :height="16" />
        <div @click.stop :class="pickerClasses" v-show="showEmojiPicker">
          <EmojiPicker :native="true" @select="addEmoji" />
        </div>
      </Button>

      <Button
        :disabled="editor?.isEmpty"
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
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import EmojiPicker from 'vue3-emoji-picker';
import { Node, mergeAttributes } from '@tiptap/core';
import Button from '../Button/Button.vue';
import Icon from '../Icon/Icon.vue';
import { SizesEnum } from '@/common/sizes';
import { IconNameEnum } from '../Icon/enum/enum';
import { ButtonTypeEnum } from '../Button/enum/enum';
import 'vue3-emoji-picker/css';
import type { IContentEditorEmit } from './interfaces/content-editor';
import { ColorsEnum } from '@/common/colors.ts';
import Popover from '../Popover/Popover.vue';

// v-model binding
const props = defineProps<{ activeAttachFile: boolean }>();
const modelValue = defineModel<string>();
const showEmojiPicker = ref(false);
const emojiPickerPosition = ref({
  vertical: 'bottom' as 'top' | 'bottom',
  horizontal: 'left' as 'left' | 'right'
});
const emits = defineEmits<IContentEditorEmit>();

const pickerClasses = computed(() => [
  'emoji-picker',
  `emoji-picker-${emojiPickerPosition.value.vertical}`,
  `emoji-picker-${emojiPickerPosition.value.horizontal}`
]);

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
      link: false
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: { class: 'link' }
    }),
    Image,
    Placeholder.configure({
      placeholder: 'Начните печатать...',
      emptyEditorClass: 'is-editor-empty'
    }),
    SpanNode
  ],
  content: modelValue.value,
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

function addLink() {
  if (!editor?.value) return;
  const url = prompt('Enter URL:');
  if (url) {
    editor.value
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
  }
}

function addEmoji(emoji: { i: string }) {
  if (!editor?.value) return;
  editor.value.chain().focus().insertContent(emoji.i).run();
  showEmojiPicker.value = false;
}

function attachFile(onlyMedia: boolean = false) {
  if (!editor?.value) return;
  const input = document.createElement('input');
  input.type = 'file';
  if (onlyMedia) {
    input.accept = 'image/*,video/*';
  }
  input.onchange = () => {
    if (!input?.files) return;
    emits('unmount-attach-file', input.files, onlyMedia);
  };
  input.click();
}

function handleSave() {
  if (!editor?.value) return;
  emits('unmount-send', { content: editor.value.getHTML() });
}

/* ------------------ Insert undeletable span ------------------ */
function addSpanLink(content: string) {
  if (!editor?.value) return;
  editor.value
    .chain()
    .focus()
    .insertContent({
      type: 'spanNode',
      attrs: { content: content + ',', class: 'link' }
    })
    .run();
}

/* ------------------ Keyboard shortcut: Ctrl+Enter ------------------ */
function handleKeydown(event: KeyboardEvent) {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    event.preventDefault();
    handleSave();
  }
}

function updateEmojiPosition(
  buttonEl: HTMLElement,
  pickerWidth = 300,
  pickerHeight = 260
) {
  if (!buttonEl) return;

  const rect = buttonEl.getBoundingClientRect();
  /* ------------------ Emoji Picker positioning ------------------ */
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  emojiPickerPosition.value.vertical =
    rect.bottom + pickerHeight > viewportHeight ? 'top' : 'bottom';

  emojiPickerPosition.value.horizontal =
    rect.left + pickerWidth > viewportWidth ? 'right' : 'left';
}

function toggleEmojiPicker(event: Event) {
  showEmojiPicker.value = !showEmojiPicker.value;
  if (showEmojiPicker.value) {
    const btn = event.currentTarget as HTMLElement;
    nextTick(() => {
      updateEmojiPosition(btn);
    });
  }
}

function handleWindowUpdate() {
  const btn = document.querySelector(
    '.toolbar-button.smile-button'
  ) as HTMLElement;
  if (showEmojiPicker.value && btn) {
    updateEmojiPosition(btn);
  }
}

/* ------------------ Safe editor event listeners ------------------ */
onMounted(() => {
  if (!editor?.value?.view?.dom) return;
  const el = editor.value.view.dom;
  el.addEventListener('keydown', handleKeydown);

  window.addEventListener('resize', handleWindowUpdate);
  window.addEventListener('scroll', handleWindowUpdate, true);

  onBeforeUnmount(() => {
    el.removeEventListener('keydown', handleKeydown);
    editor?.value?.destroy();

    window.removeEventListener('resize', handleWindowUpdate);
    window.removeEventListener('scroll', handleWindowUpdate, true);
  });
});

defineExpose({ addSpanLink });
</script>

<style>
.editor-component {
  background-color: var(--white);
  border: 0.5px solid #e7e7e7;
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
    padding: 7px 8px !important;
    width: 32px;
    color: var(--grey5);
    &:not(.right) path {
      stroke-width: 1.5px;
    }
    &:disabled,
    &.disable-yui-kit {
      background-color: var(--grey1);
      color: var(--grey7);
    }
  }
  &.ghost-yui-kit.button-yui-kit,
  &.ghost-yui-kit.button-yui-kit.disable-yui-kit {
    &:not(:disabled) {
      background-color: var(--blue15);
      &:hover {
        background-color: var(--blue10);
      }
    }
  }
}

.is-editor-empty::before {
  content: attr(data-placeholder);
  color: var(--grey6);
  font-size: 16px;
  pointer-events: none;
  float: left;
  height: 0;
}

@media screen and (width <= 28rem) {
  button.ghost-yui-kit.mobile-buttons {
    display: grid;
    background-color: transparent !important;
    & svg.icon-yui-kit {
      font-size: 27px;
    }
  }
  .editor-component {
    display: grid;
    grid-template-columns: minmax(27px, min-content) 1fr auto;
    align-items: center;
    padding: 8px;
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
    & button.button-yui-kit.ghost-yui-kit.right {
      color: var(--blue1);
    }
  }
  .mobile-item {
    display: inline-block !important;
  }
}
</style>
