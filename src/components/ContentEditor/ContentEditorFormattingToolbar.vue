<template>
  <div
    v-if="visible"
    ref="toolbarRef"
    class="formatting-toolbar"
    :style="toolbarStyle"
    @mousedown.prevent
  >
    <div class="formatting-toolbar__group">
      <Tooltip
        v-for="action in markActions"
        :key="action.key"
        :hint="action.hint"
        position="top-center"
      >
        <button
          type="button"
          class="formatting-toolbar__button"
          :class="{ 'formatting-toolbar__button--active': action.isActive() }"
          :aria-label="action.hint"
          @click="action.run"
        >
          <Icon :name="action.icon" />
        </button>
      </Tooltip>
    </div>

    <div class="formatting-toolbar__divider"></div>

    <div class="formatting-toolbar__group">
      <Tooltip
        v-for="action in blockActions"
        :key="action.key"
        :hint="action.hint"
        position="top-center"
      >
        <button
          type="button"
          class="formatting-toolbar__button"
          :class="{ 'formatting-toolbar__button--active': action.isActive() }"
          :aria-label="action.hint"
          @click="action.run"
        >
          <Icon :name="action.icon" />
        </button>
      </Tooltip>
    </div>
  </div>

  <Modal
    v-if="linkEditorOpen"
    :open="linkEditorOpen"
    position="center"
    width="min(370px, -45px + 100vw)"
    height="auto"
    class="formatting-toolbar__link-modal-container"
    @close="handleLinkModalClose"
  >
    <div class="formatting-toolbar__link-modal">
      <div class="formatting-toolbar__link-modal-header">
        <div class="formatting-toolbar__link-modal-title">Ссылка</div>
        <button
          type="button"
          class="formatting-toolbar__link-modal-close"
          aria-label="Закрыть"
          @click="handleLinkModalClose"
        >
          <Icon :name="IconNameEnum.crossLarge" />
        </button>
      </div>

      <label class="formatting-toolbar__field">
        <span class="formatting-toolbar__field-label">Текст:</span>
        <input
          ref="linkTextInputRef"
          v-model="linkText"
          class="formatting-toolbar__field-input"
          type="text"
          placeholder="Важная ссылка"
          @keydown.enter.prevent="applyLink"
          @keydown.esc.prevent="handleLinkModalClose"
        />
      </label>

      <label class="formatting-toolbar__field">
        <span class="formatting-toolbar__field-label">Ссылка:</span>
        <input
          v-model="linkValue"
          class="formatting-toolbar__field-input"
          type="text"
          placeholder="https://example.com"
          @keydown.enter.prevent="applyLink"
          @keydown.esc.prevent="handleLinkModalClose"
        />
      </label>

      <div class="formatting-toolbar__link-modal-actions">
        <button
          type="button"
          class="formatting-toolbar__link-modal-save"
          @click="applyLink"
        >
          Сохранить
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { Editor } from '@tiptap/core';
import { posToDOMRect } from '@tiptap/core';
import Modal from '../Modal/Modal.vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import Icon from '../Icon/Icon.vue';

interface Props {
  editor?: Editor | null;
}

interface ToolbarAction {
  key: string;
  icon: IconNameEnum;
  hint: string;
  isActive: () => boolean;
  run: () => void | boolean;
}

interface SelectionRange {
  from: number;
  to: number;
}

type ToolbarAlignment = 'left' | 'center' | 'right';

const TOOLBAR_MARGIN = 16;

const props = defineProps<Props>();

const toolbarRef = ref<HTMLDivElement | null>(null);
const visible = ref(false);
const linkEditorOpen = ref(false);
const linkText = ref('');
const linkValue = ref('');
const linkTextInputRef = ref<HTMLInputElement | null>(null);
const toolbarStyle = ref<Record<string, string>>({});
const lastToolbarLeft = ref<number | null>(null);
const lastToolbarAlignment = ref<ToolbarAlignment>('center');
const savedSelectionRange = ref<SelectionRange | null>(null);
const savedSelectionText = ref('');
const isPointerSelecting = ref(false);
let positionAnimationFrameId: number | null = null;

const resetLinkEditorState = () => {
  linkEditorOpen.value = false;
  linkText.value = '';
  linkValue.value = '';
  savedSelectionRange.value = null;
  savedSelectionText.value = '';
};

const getSelectionText = (editor: Editor, selection: SelectionRange): string =>
  editor.state.doc.textBetween(selection.from, selection.to, ' ');

const getSelectionLines = (
  editor: Editor,
  selection: SelectionRange
): string[] =>
  editor.state.doc
    .textBetween(selection.from, selection.to, '\n', '\n')
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);

const getToolbarWidth = (): number => toolbarRef.value?.offsetWidth ?? 0;

const getHiddenToolbarStyle = (): Record<string, string> => ({
  position: 'fixed',
  left: '0px',
  top: '0px',
  transform: 'none',
  visibility: 'hidden',
  pointerEvents: 'none',
  zIndex: '1000'
});

const getEditorDom = (
  editor: Editor | null | undefined
): HTMLElement | null => {
  if (!editor || editor.isDestroyed) {
    return null;
  }

  try {
    return editor.view?.dom ?? null;
  } catch {
    return null;
  }
};

const isNodeInsideEditor = (
  editor: Editor,
  node: Node | null | undefined
): boolean => {
  if (!node) {
    return false;
  }

  const editorDom = getEditorDom(editor);
  if (!editorDom) {
    return false;
  }

  const element = node instanceof Element ? node : node.parentElement;

  return !!element && editorDom.contains(element);
};

const getDomSelectionRect = (editor: Editor): DOMRect | null => {
  const editorDom = getEditorDom(editor);
  const domSelection = editorDom?.ownerDocument.getSelection();

  if (
    !domSelection ||
    domSelection.rangeCount === 0 ||
    domSelection.isCollapsed
  ) {
    return null;
  }

  if (
    !isNodeInsideEditor(editor, domSelection.anchorNode) ||
    !isNodeInsideEditor(editor, domSelection.focusNode)
  ) {
    return null;
  }

  const range = domSelection.getRangeAt(0);
  const rects = Array.from(range.getClientRects()).filter(
    rect => rect.width > 0 || rect.height > 0
  );

  if (rects.length > 0) {
    const left = Math.min(...rects.map(rect => rect.left));
    const right = Math.max(...rects.map(rect => rect.right));
    const top = Math.min(...rects.map(rect => rect.top));
    const bottom = Math.max(...rects.map(rect => rect.bottom));

    return new DOMRect(left, top, right - left, bottom - top);
  }

  const rect = range.getBoundingClientRect();

  if (rect.width > 0 || rect.height > 0) {
    return rect;
  }

  return null;
};

const clampToolbarLeft = (left: number): number => {
  const toolbarWidth = getToolbarWidth();

  if (!toolbarWidth) {
    return left;
  }

  const maxLeft = window.innerWidth - toolbarWidth - TOOLBAR_MARGIN;

  if (maxLeft <= TOOLBAR_MARGIN) {
    return Math.max((window.innerWidth - toolbarWidth) / 2, 0);
  }

  return Math.min(Math.max(left, TOOLBAR_MARGIN), maxLeft);
};

const clampHorizontalCenter = (centerX: number): number => {
  const toolbarWidth = toolbarRef.value?.offsetWidth ?? 0;

  if (!toolbarWidth) {
    return centerX;
  }

  const halfWidth = toolbarWidth / 2;
  const minCenter = TOOLBAR_MARGIN + halfWidth;
  const maxCenter = window.innerWidth - TOOLBAR_MARGIN - halfWidth;

  if (minCenter > maxCenter) {
    return window.innerWidth / 2;
  }

  return Math.min(Math.max(centerX, minCenter), maxCenter);
};

const getToolbarAlignment = (rect: DOMRect): ToolbarAlignment => {
  const toolbarWidth = getToolbarWidth();

  if (!toolbarWidth) {
    return 'center';
  }

  const availableLeft = rect.left - TOOLBAR_MARGIN;
  const availableRight = window.innerWidth - rect.right - TOOLBAR_MARGIN;
  const edgeThreshold = toolbarWidth / 2;

  if (availableRight < edgeThreshold && availableLeft > availableRight) {
    return 'right';
  }

  if (availableLeft < edgeThreshold && availableRight > availableLeft) {
    return 'left';
  }

  return 'center';
};

const getToolbarHorizontalPlacement = (
  rect: DOMRect,
  alignment: ToolbarAlignment
) => {
  if (alignment === 'left') {
    return {
      left: clampToolbarLeft(rect.left),
      transform: 'none'
    };
  }

  if (alignment === 'right') {
    return {
      left: clampToolbarLeft(rect.right - getToolbarWidth()),
      transform: 'none'
    };
  }

  return {
    left: clampHorizontalCenter(rect.left + rect.width / 2),
    transform: 'translateX(-50%)'
  };
};

const clampStoredHorizontalPlacement = (
  left: number,
  alignment: ToolbarAlignment
): number =>
  alignment === 'center' ? clampHorizontalCenter(left) : clampToolbarLeft(left);

const focusEditor = () => props.editor?.chain().focus();

const restoreSelection = (selection = savedSelectionRange.value) => {
  if (!props.editor || !selection) {
    return;
  }

  props.editor.chain().focus().setTextSelection(selection).run();
};

const updateToolbarPosition = (
  options: {
    preserveHorizontal?: boolean;
  } = {}
) => {
  const editor = props.editor;
  const editorDom = getEditorDom(editor);

  if (!editor || !editor.view || !editorDom) {
    visible.value = false;
    return;
  }

  const { state, view, isEditable } = editor;
  const { selection } = state;

  if (
    !isEditable ||
    selection.empty ||
    !view.hasFocus() ||
    isPointerSelecting.value
  ) {
    visible.value = false;
    toolbarStyle.value = getHiddenToolbarStyle();
    lastToolbarLeft.value = null;
    lastToolbarAlignment.value = 'center';
    return;
  }

  const rect =
    getDomSelectionRect(editor) ??
    posToDOMRect(view, selection.from, selection.to);

  if (!visible.value) {
    toolbarStyle.value = getHiddenToolbarStyle();
    visible.value = true;
    void nextTick(() => scheduleToolbarPositionUpdate(options));
    return;
  }

  const nextAlignment = options.preserveHorizontal
    ? lastToolbarAlignment.value
    : getToolbarAlignment(rect);
  const horizontalPlacement = options.preserveHorizontal
    ? {
        left: clampStoredHorizontalPlacement(
          lastToolbarLeft.value ??
            getToolbarHorizontalPlacement(rect, nextAlignment).left,
          nextAlignment
        ),
        transform: nextAlignment === 'center' ? 'translateX(-50%)' : 'none'
      }
    : getToolbarHorizontalPlacement(rect, nextAlignment);

  lastToolbarAlignment.value = nextAlignment;
  lastToolbarLeft.value = horizontalPlacement.left;
  toolbarStyle.value = {
    position: 'fixed',
    left: `${horizontalPlacement.left}px`,
    top: `${Math.max(rect.top - 52, 12)}px`,
    transform: horizontalPlacement.transform,
    visibility: 'visible',
    pointerEvents: 'auto',
    zIndex: '1000'
  };
};

const scheduleToolbarPositionUpdate = (
  options: {
    preserveHorizontal?: boolean;
  } = {}
) => {
  if (positionAnimationFrameId !== null) {
    cancelAnimationFrame(positionAnimationFrameId);
  }

  positionAnimationFrameId = requestAnimationFrame(() => {
    positionAnimationFrameId = null;
    updateToolbarPosition(options);
  });
};

const handleViewportUpdate = () =>
  scheduleToolbarPositionUpdate({ preserveHorizontal: true });

const handleSelectionUpdate = () => {
  scheduleToolbarPositionUpdate();
};

const handleEditorFocus = () => {
  scheduleToolbarPositionUpdate();
};

const handleEditorTransaction = () => {
  scheduleToolbarPositionUpdate();
};

const handleEditorBlur = () => {
  visible.value = false;
};

const handlePointerSelectionStart = (event: PointerEvent) => {
  if (event.button !== 0 || linkEditorOpen.value) {
    return;
  }

  isPointerSelecting.value = true;
  visible.value = false;
};

const handlePointerSelectionEnd = () => {
  if (!isPointerSelecting.value) {
    return;
  }

  isPointerSelecting.value = false;
  scheduleToolbarPositionUpdate();
};

const markActions: ToolbarAction[] = [
  {
    key: 'bold',
    icon: IconNameEnum.bold,
    hint: 'Жирный',
    isActive: () => props.editor?.isActive('bold') ?? false,
    run: () => focusEditor()?.toggleBold().run()
  },
  {
    key: 'italic',
    icon: IconNameEnum.italic,
    hint: 'Курсив',
    isActive: () => props.editor?.isActive('italic') ?? false,
    run: () => focusEditor()?.toggleItalic().run()
  },
  {
    key: 'underline',
    icon: IconNameEnum.underline,
    hint: 'Подчёркнутый',
    isActive: () => props.editor?.isActive('underline') ?? false,
    run: () => focusEditor()?.toggleUnderline().run()
  },
  {
    key: 'strike',
    icon: IconNameEnum.strikethrough,
    hint: 'Зачёркнутый',
    isActive: () => props.editor?.isActive('strike') ?? false,
    run: () => focusEditor()?.toggleStrike().run()
  }
];

const openLinkEditor = async () => {
  const editor = props.editor;

  if (!editor) {
    return;
  }

  const { from, to, empty } = editor.state.selection;

  if (empty) {
    return;
  }

  savedSelectionRange.value = { from, to };
  savedSelectionText.value = getSelectionText(editor, { from, to });
  linkText.value = savedSelectionText.value;

  const href = editor.getAttributes('link')?.href;

  linkValue.value =
    typeof href === 'string' && href.trim().length > 0
      ? href
      : savedSelectionText.value;
  linkEditorOpen.value = true;

  await nextTick();
  linkTextInputRef.value?.focus();
  linkTextInputRef.value?.select();
};

const applyOrderedList = () => {
  const editor = props.editor;

  if (!editor) {
    return;
  }

  if (editor.isActive('orderedList')) {
    editor.chain().focus().toggleOrderedList().run();
    return;
  }

  const { from, to, empty } = editor.state.selection;

  if (empty) {
    editor.chain().focus().toggleOrderedList().run();
    return;
  }

  const lines = getSelectionLines(editor, { from, to });

  if (!lines.length) {
    return;
  }

  editor
    .chain()
    .focus()
    .insertContentAt(
      { from, to },
      {
        type: 'orderedList',
        attrs: {
          start: 1
        },
        content: lines.map(line => ({
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: line
                }
              ]
            }
          ]
        }))
      }
    )
    .run();
};

const blockActions: ToolbarAction[] = [
  {
    key: 'code',
    icon: IconNameEnum.code,
    hint: 'Код',
    isActive: () => props.editor?.isActive('code') ?? false,
    run: () => focusEditor()?.toggleCode().run()
  },
  {
    key: 'link',
    icon: IconNameEnum.link,
    hint: 'Ссылка',
    isActive: () => props.editor?.isActive('link') ?? false,
    run: () => {
      if (props.editor?.isActive('link')) {
        props.editor.chain().focus().extendMarkRange('link').unsetLink().run();
        updateToolbarPosition({ preserveHorizontal: true });
        return;
      }

      void openLinkEditor();
    }
  },
  {
    key: 'blockquote',
    icon: IconNameEnum.blockquote,
    hint: 'Цитата',
    isActive: () => props.editor?.isActive('orderedList') ?? false,
    run: applyOrderedList
  }
];

const normalizeLink = (value: string): string => {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return '';
  }

  return /^(https?:\/\/|mailto:|tel:)/i.test(normalizedValue)
    ? normalizedValue
    : `https://${normalizedValue}`;
};

const applyLink = () => {
  const editor = props.editor;
  const selection = savedSelectionRange.value;

  if (!editor || !selection) {
    return;
  }

  const nextText = linkText.value.trim() || savedSelectionText.value.trim();
  const href = normalizeLink(linkValue.value);

  if (!nextText) {
    handleLinkModalClose();
    return;
  }

  editor
    .chain()
    .focus()
    .insertContentAt(
      selection,
      href
        ? {
            type: 'text',
            text: nextText,
            marks: [{ type: 'link', attrs: { href, class: 'link' } }]
          }
        : nextText
    )
    .run();

  const updatedSelection = {
    from: selection.from,
    to: selection.from + nextText.length
  };

  resetLinkEditorState();
  restoreSelection(updatedSelection);
  updateToolbarPosition({ preserveHorizontal: true });
};

const handleLinkModalClose = () => {
  const selection = savedSelectionRange.value;

  resetLinkEditorState();
  restoreSelection(selection);
  updateToolbarPosition({ preserveHorizontal: true });
};

const bindEditorEvents = (editor: Editor | null | undefined) => {
  const editorDom = getEditorDom(editor);

  if (!editor || !editorDom) {
    return;
  }

  editor.on('selectionUpdate', handleSelectionUpdate);
  editor.on('focus', handleEditorFocus);
  editor.on('blur', handleEditorBlur);
  editor.on('transaction', handleEditorTransaction);
  editorDom.addEventListener('pointerdown', handlePointerSelectionStart);
};

const unbindEditorEvents = (editor: Editor | null | undefined) => {
  if (!editor) {
    return;
  }

  editor.off('selectionUpdate', handleSelectionUpdate);
  editor.off('focus', handleEditorFocus);
  editor.off('blur', handleEditorBlur);
  editor.off('transaction', handleEditorTransaction);

  getEditorDom(editor)?.removeEventListener(
    'pointerdown',
    handlePointerSelectionStart
  );
};

onMounted(() => {
  bindEditorEvents(props.editor);
  window.addEventListener('resize', handleViewportUpdate);
  window.addEventListener('scroll', handleViewportUpdate, true);
  window.addEventListener('pointerup', handlePointerSelectionEnd, true);
});

onBeforeUnmount(() => {
  unbindEditorEvents(props.editor);
  window.removeEventListener('resize', handleViewportUpdate);
  window.removeEventListener('scroll', handleViewportUpdate, true);
  window.removeEventListener('pointerup', handlePointerSelectionEnd, true);

  if (positionAnimationFrameId !== null) {
    cancelAnimationFrame(positionAnimationFrameId);
  }
});

watch(
  () => props.editor,
  (nextEditor, previousEditor) => {
    if (previousEditor === nextEditor) {
      return;
    }

    unbindEditorEvents(previousEditor);
    bindEditorEvents(nextEditor);
    scheduleToolbarPositionUpdate();
  }
);
</script>

<style scoped>
.formatting-toolbar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: var(--white);
  box-shadow: 0 8px 24px rgb(28 38 53 / 16%);
}

.formatting-toolbar__group {
  display: flex;
  align-items: center;
  gap: 4px;
}

.formatting-toolbar__divider {
  width: 1px;
  height: 18px;
  background: var(--border-color);
}

.formatting-toolbar__button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  padding: 0 8px;
  border: none;
  border-radius: 2px;
  background: transparent;
  color: var(--text-neutral-color);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.formatting-toolbar__button:hover,
.formatting-toolbar__button--active {
  background: var(--blue10);
  color: var(--primary-pressed-color);
}

.formatting-toolbar__link-modal-container {
  border: 0.5px solid var(--border-color);
  border-radius: 10px !important;
}

.formatting-toolbar__link-modal {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 10px;
  background: var(--white);
}

.formatting-toolbar__link-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 10px 20px;
  border-bottom: 0.5px solid var(--border-color);
}

.formatting-toolbar__link-modal-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.2;
}

.formatting-toolbar__link-modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--text-color);
  cursor: pointer;
}

.formatting-toolbar__link-modal-close:hover {
  background: var(--background-light-color);
}

.formatting-toolbar__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 10px;
}

.formatting-toolbar__field-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-neutral-color);
  line-height: 1.2;
}

.formatting-toolbar__field-input {
  width: 100%;
  min-height: 44px;
  padding: 11px 14px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: var(--background-light-color);
  color: var(--text-color);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;
}

.formatting-toolbar__field-input:focus {
  border-color: var(--primary-color);
}

.formatting-toolbar__field-input::placeholder {
  color: var(--text-light-color);
}

.formatting-toolbar__link-modal-actions {
  display: flex;
  justify-content: flex-end;
  padding: 0 10px;
  margin-top: 2px;
}

.formatting-toolbar__link-modal-save {
  min-height: 40px;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  background: var(--primary-color);
  color: var(--white);
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.formatting-toolbar__link-modal-save:hover {
  background: var(--primary-pressed-color);
}
</style>
