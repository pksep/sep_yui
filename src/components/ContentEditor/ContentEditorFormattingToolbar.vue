<template>
  <div
    v-if="visible"
    ref="toolbarRef"
    class="formatting-toolbar"
    :class="{
      'formatting-toolbar--mobile': isMobileToolbar,
      'formatting-toolbar--mobile-menu': isMobileToolbar && isMobileMenuOpen
    }"
    :style="toolbarStyle"
    @pointerdown="handleToolbarPointerDown"
    @mousedown.prevent
  >
    <template v-if="isMobileToolbar">
      <div
        v-if="!isMobileMenuOpen"
        class="formatting-toolbar__mobile-selection-actions"
      >
        <button
          type="button"
          class="formatting-toolbar__mobile-edit-action"
          @click="runMobileClipboardAction('cut')"
        >
          Вырезать
        </button>

        <div class="formatting-toolbar__mobile-selection-divider"></div>

        <button
          type="button"
          class="formatting-toolbar__mobile-edit-action"
          @click="runMobileClipboardAction('copy')"
        >
          Скопировать
        </button>

        <div class="formatting-toolbar__mobile-selection-divider"></div>

        <button
          type="button"
          class="formatting-toolbar__mobile-edit-action"
          @click="runMobileClipboardAction('paste')"
        >
          Вставить
        </button>

        <button
          type="button"
          class="formatting-toolbar__mobile-trigger"
          aria-label="Форматирование"
          @click="openMobileMenu"
        >
          <Icon :name="IconNameEnum.plus" :width="18" :height="18" />
        </button>
      </div>

      <div v-else class="formatting-toolbar__mobile-dropdown" role="menu">
        <button
          type="button"
          class="formatting-toolbar__mobile-header"
          @click="closeMobileMenu"
        >
          <Icon :name="IconNameEnum.arrowLeft" :width="20" :height="20" />
          <span>Форматирование</span>
        </button>

        <div class="formatting-toolbar__mobile-group">
          <button
            v-for="action in markActions"
            :key="action.key"
            type="button"
            class="formatting-toolbar__mobile-action"
            :class="{
              'formatting-toolbar__mobile-action--active': action.isActive()
            }"
            :aria-label="action.hint"
            :aria-pressed="action.isActive()"
            role="menuitemcheckbox"
            @click="runMobileAction(action)"
          >
            <Icon
              class="formatting-toolbar__mobile-action-icon"
              :name="action.icon"
              :width="24"
              :height="24"
            />
            <span>{{ action.hint }}</span>
          </button>
        </div>

        <div class="formatting-toolbar__mobile-divider"></div>

        <div class="formatting-toolbar__mobile-group">
          <button
            v-for="action in blockActions"
            :key="action.key"
            type="button"
            class="formatting-toolbar__mobile-action"
            :class="{
              'formatting-toolbar__mobile-action--active': action.isActive()
            }"
            :aria-label="action.hint"
            :aria-pressed="action.isActive()"
            role="menuitemcheckbox"
            @click="runMobileAction(action)"
          >
            <Icon
              class="formatting-toolbar__mobile-action-icon"
              :name="action.icon"
              :width="24"
              :height="24"
            />
            <span>{{ action.hint }}</span>
          </button>
        </div>
      </div>
    </template>

    <template v-else>
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
    </template>
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
import { TextSelection } from '@tiptap/pm/state';
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
type MobileClipboardAction = 'cut' | 'copy' | 'paste';

const TOOLBAR_MARGIN = 16;
const MOBILE_VIEWPORT_MAX_WIDTH = 480;

const props = defineProps<Props>();

const toolbarRef = ref<HTMLDivElement | null>(null);
const visible = ref(false);
const isMobileToolbar = ref(false);
const isMobileMenuOpen = ref(false);
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
let mobileSelectionTimeoutIds: number[] = [];

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
const getToolbarHeight = (): number => toolbarRef.value?.offsetHeight ?? 0;

const updateToolbarMode = () => {
  isMobileToolbar.value = window.innerWidth <= MOBILE_VIEWPORT_MAX_WIDTH;

  if (!isMobileToolbar.value) {
    isMobileMenuOpen.value = false;
  }
};

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

const getSelectionClientRects = (editor: Editor): DOMRect[] => {
  const domSelection = getEditorDomSelection(editor);

  if (!domSelection) {
    return [];
  }

  return Array.from(domSelection.getRangeAt(0).getClientRects()).filter(
    rect => rect.width > 0 || rect.height > 0
  );
};

const getEditorDomSelection = (editor: Editor): Selection | null => {
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

  return domSelection;
};

const getDomSelectionRect = (editor: Editor): DOMRect | null => {
  const rects = getSelectionClientRects(editor);

  if (rects.length > 0) {
    const left = Math.min(...rects.map(rect => rect.left));
    const right = Math.max(...rects.map(rect => rect.right));
    const top = Math.min(...rects.map(rect => rect.top));
    const bottom = Math.max(...rects.map(rect => rect.bottom));

    return new DOMRect(left, top, right - left, bottom - top);
  }

  const editorDom = getEditorDom(editor);
  const domSelection = editorDom?.ownerDocument.getSelection();

  if (!domSelection || domSelection.rangeCount === 0) {
    return null;
  }

  const range = domSelection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  if (rect.width > 0 || rect.height > 0) {
    return rect;
  }

  return null;
};

const isFullEditorSelection = (editor: Editor): boolean => {
  const { doc, selection } = editor.state;

  return selection.from <= 1 && selection.to >= doc.content.size - 1;
};

const getStartSelectionRect = (editor: Editor): DOMRect | null => {
  const [firstRect] = getSelectionClientRects(editor).sort(
    (rectA, rectB) => rectA.top - rectB.top || rectA.left - rectB.left
  );

  if (firstRect) {
    return new DOMRect(
      firstRect.left,
      firstRect.top,
      firstRect.width,
      firstRect.height
    );
  }

  const { selection } = editor.state;

  try {
    const startCoords = editor.view.coordsAtPos(selection.from);

    return new DOMRect(
      startCoords.left,
      startCoords.top,
      Math.max(startCoords.right - startCoords.left, 1),
      startCoords.bottom - startCoords.top
    );
  } catch {
    return null;
  }
};

const getSelectionToolbarRect = (editor: Editor): DOMRect =>
  (isFullEditorSelection(editor) ? getStartSelectionRect(editor) : null) ??
  getDomSelectionRect(editor) ??
  posToDOMRect(
    editor.view,
    editor.state.selection.from,
    editor.state.selection.to
  );

const syncEditorSelectionFromDom = (editor: Editor): boolean => {
  const domSelection = getEditorDomSelection(editor);

  if (!domSelection) {
    return false;
  }

  try {
    if (!domSelection.anchorNode || !domSelection.focusNode) {
      return false;
    }

    const anchorPos = editor.view.posAtDOM(
      domSelection.anchorNode,
      domSelection.anchorOffset
    );
    const focusPos = editor.view.posAtDOM(
      domSelection.focusNode,
      domSelection.focusOffset
    );
    const from = Math.min(anchorPos, focusPos);
    const to = Math.max(anchorPos, focusPos);

    if (from === to) {
      return false;
    }

    if (
      editor.state.selection.from === from &&
      editor.state.selection.to === to
    ) {
      return true;
    }

    editor.view.dispatch(
      editor.state.tr.setSelection(
        TextSelection.create(editor.state.doc, from, to)
      )
    );

    return true;
  } catch {
    return false;
  }
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

const getToolbarTop = (rect: DOMRect): number => {
  if (!isMobileToolbar.value || !isMobileMenuOpen.value) {
    return Math.max(rect.top - 52, 12);
  }

  const toolbarHeight = getToolbarHeight();
  const preferredTop = rect.bottom + 8;
  const maxTop = window.innerHeight - toolbarHeight - TOOLBAR_MARGIN;

  if (!toolbarHeight || preferredTop <= maxTop) {
    return Math.max(preferredTop, TOOLBAR_MARGIN);
  }

  return Math.max(rect.top - toolbarHeight - 8, TOOLBAR_MARGIN);
};

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
    isMobileMenuOpen.value = false;
    return;
  }

  const { view, isEditable } = editor;
  const hasMobileDomSelection =
    isMobileToolbar.value && Boolean(getEditorDomSelection(editor));

  if (hasMobileDomSelection) {
    syncEditorSelectionFromDom(editor);
  }

  const { selection } = editor.state;

  if (
    !isEditable ||
    selection.empty ||
    (!view.hasFocus() && !hasMobileDomSelection) ||
    isPointerSelecting.value
  ) {
    visible.value = false;
    isMobileMenuOpen.value = false;
    toolbarStyle.value = getHiddenToolbarStyle();
    lastToolbarLeft.value = null;
    lastToolbarAlignment.value = 'center';
    return;
  }

  saveSelectionRange(editor, { from: selection.from, to: selection.to });

  const rect = getSelectionToolbarRect(editor);

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
    top: `${getToolbarTop(rect)}px`,
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

const handleViewportUpdate = () => {
  updateToolbarMode();
  scheduleToolbarPositionUpdate({ preserveHorizontal: true });
};

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
  isMobileMenuOpen.value = false;
};

const handleToolbarPointerDown = (event: PointerEvent) => {
  if (isMobileToolbar.value) {
    event.preventDefault();
  }
};

const handlePointerSelectionStart = (event: PointerEvent) => {
  if (event.button !== 0 || linkEditorOpen.value) {
    return;
  }

  isPointerSelecting.value = true;
  visible.value = false;
  isMobileMenuOpen.value = false;
};

const handlePointerSelectionEnd = () => {
  if (!isPointerSelecting.value) {
    scheduleMobileSelectionUpdate();
    return;
  }

  isPointerSelecting.value = false;
  scheduleToolbarPositionUpdate();
  scheduleMobileSelectionUpdate();
};

const clearMobileSelectionTimeouts = () => {
  mobileSelectionTimeoutIds.forEach(timeoutId =>
    window.clearTimeout(timeoutId)
  );
  mobileSelectionTimeoutIds = [];
};

const scheduleMobileSelectionUpdate = () => {
  if (!isMobileToolbar.value) {
    return;
  }

  clearMobileSelectionTimeouts();

  [50, 180, 360].forEach(delay => {
    const timeoutId = window.setTimeout(() => {
      isPointerSelecting.value = false;
      scheduleToolbarPositionUpdate();
    }, delay);

    mobileSelectionTimeoutIds.push(timeoutId);
  });
};

const handleMobileSelectionChange = () => {
  scheduleMobileSelectionUpdate();
};

const handleMobileSelectionEnd = () => {
  scheduleMobileSelectionUpdate();
};

const openMobileMenu = () => {
  isMobileMenuOpen.value = true;

  void nextTick(() => {
    scheduleToolbarPositionUpdate({ preserveHorizontal: true });
  });
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;

  void nextTick(() => {
    scheduleToolbarPositionUpdate({ preserveHorizontal: true });
  });
};

const runMobileAction = (action: ToolbarAction) => {
  action.run();

  if (action.key === 'link' && !props.editor?.isActive('link')) {
    isMobileMenuOpen.value = false;
  }

  scheduleToolbarPositionUpdate({ preserveHorizontal: true });
};

const getCurrentSelectionRange = (editor: Editor): SelectionRange | null => {
  const { from, to, empty } = editor.state.selection;

  if (empty) {
    return null;
  }

  return { from, to };
};

const getClipboardSelectionText = (
  editor: Editor,
  selection: SelectionRange
): string => editor.state.doc.textBetween(selection.from, selection.to, '\n');

const saveSelectionRange = (
  editor: Editor,
  selection: SelectionRange
): void => {
  savedSelectionRange.value = selection;
  savedSelectionText.value = getSelectionText(editor, selection);
};

const writeClipboardText = async (text: string): Promise<boolean> => {
  if (!text) {
    return false;
  }

  try {
    const writeText = navigator.clipboard?.writeText;

    if (writeText) {
      await writeText.call(navigator.clipboard, text);
      return true;
    }
  } catch {
    // Fall through to the textarea fallback for browsers without Clipboard API access.
  }

  const textarea = document.createElement('textarea');

  textarea.value = text;
  textarea.readOnly = true;
  textarea.style.position = 'fixed';
  textarea.style.top = '-9999px';
  textarea.style.opacity = '0';

  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  const copied = document.execCommand('copy');

  document.body.removeChild(textarea);

  return copied;
};

const readClipboardText = async (): Promise<string> => {
  try {
    const readText = navigator.clipboard?.readText;

    return readText ? await readText.call(navigator.clipboard) : '';
  } catch {
    return '';
  }
};

const readClipboardTextFromPasteFallback = (
  editor: Editor,
  selection = savedSelectionRange.value
): string => {
  const textarea = document.createElement('textarea');

  textarea.readOnly = false;
  textarea.style.position = 'fixed';
  textarea.style.top = '-9999px';
  textarea.style.opacity = '0';

  document.body.appendChild(textarea);
  textarea.focus();
  document.execCommand('paste');

  const text = textarea.value;

  document.body.removeChild(textarea);

  if (selection) {
    restoreSelection(selection);
  } else {
    editor.chain().focus().run();
  }

  return text;
};

const collapseSelectionToEnd = (
  editor: Editor,
  selection: SelectionRange
): void => {
  editor.chain().focus().setTextSelection(selection.to).run();
  visible.value = false;
  isMobileMenuOpen.value = false;
};

const runMobileClipboardAction = async (action: MobileClipboardAction) => {
  const editor = props.editor;

  if (!editor) {
    return;
  }

  if (action === 'paste') {
    const selection =
      getCurrentSelectionRange(editor) || savedSelectionRange.value;
    const text =
      (await readClipboardText()) ||
      readClipboardTextFromPasteFallback(editor, selection);

    if (text) {
      const chain = editor.chain().focus();

      if (selection) {
        chain.insertContentAt(selection, text).run();
      } else {
        chain.insertContent(text).run();
      }

      scheduleToolbarPositionUpdate({ preserveHorizontal: true });
      return;
    }

    scheduleToolbarPositionUpdate({ preserveHorizontal: true });
    return;
  }

  const selection = getCurrentSelectionRange(editor);

  if (!selection) {
    return;
  }

  saveSelectionRange(editor, selection);

  const copied = await writeClipboardText(
    getClipboardSelectionText(editor, selection)
  );

  if (copied && action === 'cut') {
    editor.chain().focus().deleteRange(selection).run();
  } else if (copied) {
    collapseSelectionToEnd(editor, selection);
  } else {
    restoreSelection(selection);
  }

  scheduleToolbarPositionUpdate({ preserveHorizontal: true });
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
  isMobileMenuOpen.value = false;

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
  editorDom.addEventListener('touchend', handleMobileSelectionEnd, true);
  editorDom.addEventListener('contextmenu', handleMobileSelectionEnd);
  editorDom.ownerDocument.addEventListener(
    'selectionchange',
    handleMobileSelectionChange
  );
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

  const editorDom = getEditorDom(editor);

  editorDom?.removeEventListener('touchend', handleMobileSelectionEnd, true);
  editorDom?.removeEventListener('contextmenu', handleMobileSelectionEnd);
  editorDom?.ownerDocument.removeEventListener(
    'selectionchange',
    handleMobileSelectionChange
  );
};

onMounted(() => {
  updateToolbarMode();
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

  clearMobileSelectionTimeouts();
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
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: var(--white);
}

.formatting-toolbar__group {
  display: flex;
  align-items: center;
  gap: 10px;
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
  min-width: 20px;
  height: 20px;
  padding: 0;
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

  & svg {
    font-size: 20px;
  }
}

.formatting-toolbar__button:hover,
.formatting-toolbar__button--active {
  background: var(--blue10);
  color: var(--primary-pressed-color);
}

.formatting-toolbar--mobile {
  gap: 0;
  padding: 4px 5px 4px 14px;
  border: none;
  border-radius: 999px;
  background: var(--white);
  box-shadow: 0 4px 14px rgb(28 38 53 / 12%);
}

.formatting-toolbar--mobile-menu {
  display: block;
  width: 162px;
  padding: 0;
  border: 0.5px solid var(--border-color);
  border-radius: 8px;
  background: var(--white);
  box-shadow: 0 8px 24px rgb(28 38 53 / 16%);
  overflow: hidden;
}

.formatting-toolbar__mobile-selection-actions {
  display: flex;
  align-items: center;
  gap: 0;
}

.formatting-toolbar__mobile-edit-action {
  min-height: 34px;
  padding: 0 12px;
  border: none;
  background: transparent;
  color: var(--text-neutral-color);
  font-size: 16px;
  line-height: 19px;
  cursor: pointer;
}

.formatting-toolbar__mobile-selection-divider {
  width: 1px;
  height: 24px;
  background: var(--border-color);
}

.formatting-toolbar__mobile-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  margin-left: 8px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: var(--primary-color);
  color: var(--white);
  box-shadow: 0 4px 12px rgb(28 38 53 / 18%);
  cursor: pointer;
}

.formatting-toolbar__mobile-dropdown {
  width: 100%;
  padding: 6px 0;
}

.formatting-toolbar__mobile-header {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  min-height: 26px;
  padding: 4px 9px;
  border: none;
  background: transparent;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  text-align: left;
  cursor: pointer;
}

.formatting-toolbar__mobile-group {
  display: flex;
  flex-direction: column;
}

.formatting-toolbar__mobile-divider {
  height: 0.5px;
  margin: 5px 0;
  background: var(--border-color);
}

.formatting-toolbar__mobile-action {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-height: 26px;
  padding: 4px 12px;
  border: none;
  background: transparent;
  color: var(--text-color);
  font-size: 16px;
  line-height: 17px;
  text-align: left;
  cursor: pointer;
}

.formatting-toolbar__mobile-action:hover {
  background: var(--background-light-color);
}

.formatting-toolbar__mobile-action-icon {
  flex: 0 0 auto;
  color: var(--text-neutral-color);
}

.formatting-toolbar__mobile-action--active
  .formatting-toolbar__mobile-action-icon {
  color: var(--primary-color);
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
