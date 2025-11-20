<template>
  <div class="editor-component">
    <Button
      :type="ButtonTypeEnum.ghost"
      :size="SizesEnum.small"
      class="toolbar-button attach-file-button mobile-buttons"
      @click="addLink"
      disabled
    >
      <Icon :name="IconNameEnum.paperClip" />
    </Button>

    <EditorContent class="editor-content" :editor="editor" />

    <div class="right-buttons">
      <Button
        :type="ButtonTypeEnum.ghost"
        :size="SizesEnum.small"
        class="toolbar-button mobile-buttons"
        @click="showEmojiPicker = !showEmojiPicker"
        disabled
      >
        <Icon :name="IconNameEnum.smile" />
        <div @click.stop class="emoji-picker" v-if="showEmojiPicker">
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
      <Button
        :type="ButtonTypeEnum.ghost"
        :size="SizesEnum.small"
        class="toolbar-button attach-file-button"
        @click="addLink"
        disabled
      >
        <Icon :name="IconNameEnum.paperClip" :width="16" :height="16" />
      </Button>

      <Button
        :type="ButtonTypeEnum.ghost"
        class="toolbar-button"
        :size="SizesEnum.small"
        @click="attachFile"
        disabled
      >
        <Icon :name="IconNameEnum.atSign" />
      </Button>

      <Button
        :type="ButtonTypeEnum.ghost"
        :size="SizesEnum.small"
        class="toolbar-button"
        @click="showEmojiPicker = !showEmojiPicker"
        disabled
      >
        <Icon :name="IconNameEnum.smile" :width="16" :height="16" />
        <div @click.stop class="emoji-picker" v-if="showEmojiPicker">
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
import { onBeforeUnmount, ref, watch, onMounted } from 'vue';
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

// v-model binding
const modelValue = defineModel<string>();
const showEmojiPicker = ref(false);
const emits = defineEmits<IContentEditorEmit>();

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

function attachFile() {
  if (!editor?.value) return;
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = () => {
    if (!input?.files) return;
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const result = e.target?.result;
        if (result && typeof result === 'string') {
          editor.value?.chain().focus().setImage({ src: result }).run();
        }
      };
      reader.readAsDataURL(file);
    }
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

/* ------------------ Safe editor event listeners ------------------ */
onMounted(() => {
  if (!editor?.value?.view?.dom) return;
  const el = editor.value.view.dom;
  el.addEventListener('keydown', handleKeydown);

  onBeforeUnmount(() => {
    el.removeEventListener('keydown', handleKeydown);
    editor?.value?.destroy();
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
    bottom: 50px;
    left: 0;
  }

  &.right {
    margin-left: auto;
  }
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
}
</style>
