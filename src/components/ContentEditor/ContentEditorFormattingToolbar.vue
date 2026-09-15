<template>
  <div
    v-if="visible"
    ref="toolbarRef"
    class="formatting-toolbar"
    :class="{
      'formatting-toolbar--mobile': isMobileToolbar,
      'formatting-toolbar--mobile-menu': isMobileToolbar && isMobileMenuOpen,
      'formatting-toolbar--mobile-color-picker':
        isMobileToolbar && colorPickerOpen
    }"
    :style="toolbarStyle"
    @pointerdown="handleToolbarPointerDown"
    @mousedown.prevent
  >
    <template v-if="isMobileToolbar">
      <ContentEditorColorPicker
        v-if="colorPickerOpen"
        class="formatting-toolbar__color-picker formatting-toolbar__color-picker--mobile"
        :colors="colorOptions"
        :active-text-color="activeTextColor"
        :active-background-color="activeBackgroundColor"
        @select-text-color="applyTextColor"
        @select-background-color="applyBackgroundColor"
      />

      <div
        v-else-if="!isMobileMenuOpen"
        class="formatting-toolbar__mobile-selection-actions"
      >
        <template
          v-for="(action, index) in mobileClipboardActions"
          :key="action.key"
        >
          <div
            v-if="index > 0"
            class="formatting-toolbar__mobile-selection-divider"
          ></div>

          <button
            type="button"
            class="formatting-toolbar__mobile-edit-action"
            @click="runMobileClipboardAction(action.key)"
          >
            {{ action.label }}
          </button>
        </template>

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

          <button
            ref="colorButtonRef"
            type="button"
            class="formatting-toolbar__mobile-action"
            :class="{
              'formatting-toolbar__mobile-action--active': hasActiveColor
            }"
            aria-label="Цвет текста"
            :aria-pressed="hasActiveColor"
            role="menuitemcheckbox"
            @click="openColorPicker"
          >
            <span
              class="formatting-toolbar__mobile-action-icon formatting-toolbar__color-icon"
            >
              <Icon
                class="formatting-toolbar__color-glyph"
                :name="IconNameEnum.text"
                :width="20"
                :height="20"
              />
            </span>
            <span>Цвет текста</span>
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
            @click="runToolbarAction(action)"
          >
            <Icon :name="action.icon" />
          </button>
        </Tooltip>

        <div class="formatting-toolbar__color-control">
          <Tooltip
            hint="Цвет текста"
            position="top-center"
            :is-can-show="!colorPickerOpen"
          >
            <button
              ref="colorButtonRef"
              type="button"
              class="formatting-toolbar__button formatting-toolbar__color-button"
              :class="{
                'formatting-toolbar__button--active': hasActiveColor
              }"
              aria-label="Цвет текста"
              :aria-pressed="hasActiveColor"
              :aria-expanded="colorPickerOpen"
              @click="toggleColorPicker"
            >
              <Icon
                class="formatting-toolbar__color-glyph"
                :name="IconNameEnum.text"
                :width="16"
                :height="16"
              />
            </button>
          </Tooltip>

          <ContentEditorColorPicker
            v-if="colorPickerOpen"
            class="formatting-toolbar__color-picker"
            :class="[
              `formatting-toolbar__color-picker--${colorPickerPlacement.vertical}`,
              `formatting-toolbar__color-picker--${colorPickerPlacement.horizontal}`
            ]"
            :colors="colorOptions"
            :active-text-color="activeTextColor"
            :active-background-color="activeBackgroundColor"
            @select-text-color="applyTextColor"
            @select-background-color="applyBackgroundColor"
          />
        </div>
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
            @click="runToolbarAction(action)"
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
    width="100%"
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

      <div class="formatting-toolbar__link-modal-body">
        <label class="formatting-toolbar__field">
          <span class="formatting-toolbar__field-label">Текст:</span>
          <input
            ref="linkTextInputRef"
            v-model="linkText"
            class="formatting-toolbar__field-input"
            type="text"
            placeholder="Введите текст"
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
            placeholder="Вставьте ссылку"
            @keydown.enter.prevent="applyLink"
            @keydown.esc.prevent="handleLinkModalClose"
          />
        </label>

        <div class="formatting-toolbar__link-modal-actions">
          <button
            type="button"
            class="formatting-toolbar__link-modal-save"
            :disabled="!canSaveLink"
            @click="applyLink"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from 'vue';
import type { Editor } from '@tiptap/core';
import { posToDOMRect } from '@tiptap/core';
import { TextSelection } from '@tiptap/pm/state';
import Modal from '../Modal/Modal.vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import Icon from '../Icon/Icon.vue';
import ContentEditorColorPicker from './ContentEditorColorPicker.vue';

interface Props {
  editor?: object | null;
  readClipboardText?: () => Promise<string> | string;
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
type ColorPickerVerticalPlacement = 'top' | 'bottom';
type ColorPickerHorizontalPlacement = 'left' | 'right';
type MobileClipboardAction = 'cut' | 'copy' | 'paste';

interface MobileClipboardActionItem {
  key: MobileClipboardAction;
  label: string;
}

interface ContentEditorColorOption {
  label: string;
  value: string;
}

const TOOLBAR_MARGIN = 16;
const MOBILE_VIEWPORT_MAX_WIDTH = 480;
const COLOR_PICKER_HEIGHT = 180;
const COLOR_PICKER_GAP = 5;

const colorOptions: ContentEditorColorOption[] = [
  { label: 'Черный', value: '#181818' },
  { label: 'Розовый', value: '#fedae9' },
  { label: 'Фиолетовый', value: '#d8c8ff' },
  { label: 'Синий', value: '#9cbeff' },
  { label: 'Голубой', value: '#c8f8ff' },
  { label: 'Зелёный', value: '#57d278' },
  { label: 'Жёлтый', value: '#ffcc00' },
  { label: 'Красный', value: '#ff6868' }
];
const allowedColors = new Set(colorOptions.map(color => color.value));

const props = defineProps<Props>();
const getToolbarEditor = (): Editor | null | undefined =>
  props.editor as Editor | null | undefined;

const toolbarRef = ref<HTMLDivElement | null>(null);
const visible = ref(false);
const isMobileToolbar = ref(false);
const isMobileMenuOpen = ref(false);
const linkEditorOpen = ref(false);
const colorPickerOpen = ref(false);
const colorButtonRef = ref<HTMLButtonElement | null>(null);
const activeTextColor = ref<string | null>(null);
const activeBackgroundColor = ref<string | null>(null);
const colorPickerPlacement = ref<{
  vertical: ColorPickerVerticalPlacement;
  horizontal: ColorPickerHorizontalPlacement;
}>({
  vertical: 'top',
  horizontal: 'left'
});
const linkText = ref('');
const linkValue = ref('');
const canSaveLink = computed(
  () => !!linkText.value.trim() && !!linkValue.value.trim()
);
const linkTextInputRef = ref<HTMLInputElement | null>(null);
const toolbarStyle = ref<Record<string, string>>({});
const lastToolbarLeft = ref<number | null>(null);
const lastToolbarAlignment = ref<ToolbarAlignment>('center');
const savedSelectionRange = ref<SelectionRange | null>(null);
const savedSelectionText = ref('');
const mobileClipboardText = ref('');
const isPointerSelecting = ref(false);
const isMobileContextMenuRequested = ref(false);
const isCollapsedContextMenuOpen = ref(false);
const collapsedContextMenuRect = ref<DOMRect | null>(null);
let positionAnimationFrameId: number | null = null;
let mobileSelectionTimeoutIds: number[] = [];
let mobileClipboardRefreshToken = 0;

const hasActiveColor = computed(
  () => !!activeTextColor.value || !!activeBackgroundColor.value
);

const hasMobileSelectedText = computed(
  () =>
    !!savedSelectionRange.value &&
    savedSelectionRange.value.from !== savedSelectionRange.value.to &&
    savedSelectionText.value.trim().length > 0
);
const hasMobileClipboardText = computed(
  () => mobileClipboardText.value.trim().length > 0
);
const mobileClipboardActions = computed<MobileClipboardActionItem[]>(() => {
  const actions: MobileClipboardActionItem[] = [];

  if (hasMobileClipboardText.value) {
    actions.push({ key: 'paste', label: 'Вставить' });
  }

  if (hasMobileSelectedText.value) {
    actions.push({ key: 'copy', label: 'Скопировать' });
    actions.push({ key: 'cut', label: 'Вырезать' });
  }

  return actions;
});

const resetLinkEditorState = () => {
  linkEditorOpen.value = false;
  linkText.value = '';
  linkValue.value = '';
  savedSelectionRange.value = null;
  savedSelectionText.value = '';
};

const normalizeActiveColor = (value: unknown): string | null => {
  if (typeof value !== 'string') {
    return null;
  }

  const normalizedValue = value.trim().toLowerCase();

  if (allowedColors.has(normalizedValue)) {
    return normalizedValue;
  }

  const rgbMatch = normalizedValue.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*1(?:\.0+)?)?\s*\)$/
  );

  if (!rgbMatch) {
    return null;
  }

  const channels = rgbMatch.slice(1, 4).map(Number);

  if (channels.some(channel => channel > 255)) {
    return null;
  }

  const hexValue = `#${channels
    .map(channel => channel.toString(16).padStart(2, '0'))
    .join('')}`;

  return allowedColors.has(hexValue) ? hexValue : null;
};

const syncActiveColors = () => {
  const editor = getToolbarEditor();

  if (!editor || editor.isDestroyed) {
    activeTextColor.value = null;
    activeBackgroundColor.value = null;
    return;
  }

  // Android WebView can temporarily report the collapsed caret marks after a
  // toolbar action, even though we restore and format the saved selection.
  // Keep the picker's explicit state stable while it is open so a second tap
  // on the same swatch reliably toggles that color off.
  if (isMobileToolbar.value && colorPickerOpen.value) {
    return;
  }

  const attributes = editor.getAttributes('textStyle');

  activeTextColor.value = normalizeActiveColor(attributes.color);
  activeBackgroundColor.value = normalizeActiveColor(
    attributes.backgroundColor
  );
};

const updateColorPickerPlacement = () => {
  if (isMobileToolbar.value || !colorButtonRef.value) {
    return;
  }

  const buttonRect = colorButtonRef.value.getBoundingClientRect();
  const canOpenAbove =
    buttonRect.top - COLOR_PICKER_HEIGHT - COLOR_PICKER_GAP >= TOOLBAR_MARGIN;

  colorPickerPlacement.value = {
    vertical: canOpenAbove ? 'top' : 'bottom',
    horizontal:
      buttonRect.left + 130 <= window.innerWidth - TOOLBAR_MARGIN
        ? 'left'
        : 'right'
  };
};

const closeColorPicker = () => {
  if (!colorPickerOpen.value) {
    return;
  }

  colorPickerOpen.value = false;

  if (isMobileToolbar.value) {
    void nextTick(() => {
      scheduleToolbarPositionUpdate({ preserveHorizontal: true });
    });
  }
};

const openColorPicker = () => {
  const editor = getToolbarEditor();

  if (!editor) {
    return;
  }

  const { from, to, empty } = editor.state.selection;

  if (!empty) {
    savedSelectionRange.value = { from, to };
    savedSelectionText.value = getSelectionText(editor, { from, to });
  }

  syncActiveColors();
  updateColorPickerPlacement();
  colorPickerOpen.value = true;

  void nextTick(() => {
    if (isMobileToolbar.value) {
      scheduleToolbarPositionUpdate({ preserveHorizontal: true });
    } else {
      updateColorPickerPlacement();
    }
  });
};

const toggleColorPicker = () => {
  if (colorPickerOpen.value) {
    closeColorPicker();
    return;
  }

  openColorPicker();
};

const applyTextColor = (color: string) => {
  const editor = getToolbarEditor();
  const normalizedColor = normalizeActiveColor(color);

  if (!editor || !normalizedColor) {
    return;
  }

  const chain = editor.chain().focus();

  if (savedSelectionRange.value) {
    chain.setTextSelection(savedSelectionRange.value);
  }

  const shouldResetColor = activeTextColor.value === normalizedColor;

  if (shouldResetColor) {
    chain.unsetColor().run();
  } else {
    chain.setColor(normalizedColor).run();
  }

  activeTextColor.value = shouldResetColor ? null : normalizedColor;
  scheduleToolbarPositionUpdate({ preserveHorizontal: true });
};

const applyBackgroundColor = (color: string) => {
  const editor = getToolbarEditor();
  const normalizedColor = normalizeActiveColor(color);

  if (!editor || !normalizedColor) {
    return;
  }

  const chain = editor.chain().focus();

  if (savedSelectionRange.value) {
    chain.setTextSelection(savedSelectionRange.value);
  }

  const shouldResetColor = activeBackgroundColor.value === normalizedColor;

  if (shouldResetColor) {
    chain.unsetBackgroundColor().run();
  } else {
    chain.setBackgroundColor(normalizedColor).run();
  }

  activeBackgroundColor.value = shouldResetColor ? null : normalizedColor;
  scheduleToolbarPositionUpdate({ preserveHorizontal: true });
};

const runToolbarAction = (action: ToolbarAction) => {
  closeColorPicker();
  action.run();
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

  if (colorPickerOpen.value) {
    void nextTick(updateColorPickerPlacement);
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

const closeMobileSelectionToolbar = () => {
  savedSelectionRange.value = null;
  savedSelectionText.value = '';
  visible.value = false;
  isMobileMenuOpen.value = false;
  isMobileContextMenuRequested.value = false;
  isCollapsedContextMenuOpen.value = false;
  collapsedContextMenuRect.value = null;
  colorPickerOpen.value = false;
  toolbarStyle.value = getHiddenToolbarStyle();
  lastToolbarLeft.value = null;
  lastToolbarAlignment.value = 'center';
};

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

const focusEditor = () => getToolbarEditor()?.chain().focus();

const restoreSelection = (selection = savedSelectionRange.value) => {
  const editor = getToolbarEditor();

  if (!editor || !selection) {
    return;
  }

  editor.chain().focus().setTextSelection(selection).run();
};

const updateToolbarPosition = (
  options: {
    preserveHorizontal?: boolean;
  } = {}
) => {
  const editor = getToolbarEditor();
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
  const canShowCollapsedContextMenu =
    isMobileToolbar.value &&
    isCollapsedContextMenuOpen.value &&
    selection.empty;

  if (
    isMobileToolbar.value &&
    selection.empty &&
    savedSelectionRange.value &&
    !canShowCollapsedContextMenu
  ) {
    closeMobileSelectionToolbar();
    return;
  }

  if (
    !isEditable ||
    (isMobileToolbar.value && !isMobileContextMenuRequested.value) ||
    (selection.empty && !canShowCollapsedContextMenu) ||
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

  if (!selection.empty) {
    saveSelectionRange(editor, { from: selection.from, to: selection.to });
  }

  const rect = canShowCollapsedContextMenu
    ? collapsedContextMenuRect.value || getSelectionToolbarRect(editor)
    : getSelectionToolbarRect(editor);

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
  updateColorPickerPlacement();
  scheduleToolbarPositionUpdate({ preserveHorizontal: true });
};

const handleSelectionUpdate = () => {
  syncActiveColors();
  scheduleToolbarPositionUpdate();
};

const handleEditorFocus = () => {
  scheduleToolbarPositionUpdate();
};

const handleEditorTransaction = () => {
  syncActiveColors();
  scheduleToolbarPositionUpdate();
};

const keyboardKeysToKeepMobileSelectionToolbar = new Set([
  'Alt',
  'AltGraph',
  'CapsLock',
  'Control',
  'Meta',
  'Shift'
]);

const shouldCloseMobileSelectionToolbarForInput = () =>
  isMobileToolbar.value && !!savedSelectionRange.value;

const handleEditorKeyDown = (event: KeyboardEvent) => {
  if (
    !shouldCloseMobileSelectionToolbarForInput() ||
    keyboardKeysToKeepMobileSelectionToolbar.has(event.key)
  ) {
    return;
  }

  closeMobileSelectionToolbar();
};

const handleEditorBeforeInput = (event: InputEvent) => {
  if (!shouldCloseMobileSelectionToolbarForInput()) {
    return;
  }

  const inputType = event.inputType || '';

  if (inputType.startsWith('format')) {
    return;
  }

  closeMobileSelectionToolbar();
};

const handleEditorInput = () => {
  if (shouldCloseMobileSelectionToolbarForInput()) {
    closeMobileSelectionToolbar();
  }
};

const handleEditorBlur = () => {
  visible.value = false;
  isMobileMenuOpen.value = false;
  colorPickerOpen.value = false;
  isMobileContextMenuRequested.value = false;
  isCollapsedContextMenuOpen.value = false;
};

const handleToolbarPointerDown = (event: PointerEvent) => {
  if (isMobileToolbar.value) {
    event.preventDefault();
  }
};

const handlePointerSelectionStart = (event: PointerEvent) => {
  if (
    (event.pointerType === 'mouse' && event.button !== 0) ||
    linkEditorOpen.value
  ) {
    return;
  }

  colorPickerOpen.value = false;
  isPointerSelecting.value = true;
  isMobileContextMenuRequested.value = false;
  isCollapsedContextMenuOpen.value = false;
  collapsedContextMenuRect.value = null;
  visible.value = false;
  isMobileMenuOpen.value = false;
};

const handleDocumentPointerDown = (event: PointerEvent) => {
  if (!isMobileToolbar.value || !colorPickerOpen.value) {
    return;
  }

  const target = event.target;

  if (target instanceof Node && toolbarRef.value?.contains(target)) {
    return;
  }

  closeMobileSelectionToolbar();
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

const handleMobileContextMenu = (event: MouseEvent) => {
  const editor = getToolbarEditor();

  if (!isMobileToolbar.value || !editor) {
    return;
  }

  event.preventDefault();
  isPointerSelecting.value = false;
  isMobileContextMenuRequested.value = true;
  void refreshMobileClipboardText().then(() => {
    scheduleToolbarPositionUpdate({ preserveHorizontal: true });
  });

  const { from, to, empty } = editor.state.selection;

  saveSelectionRange(editor, { from, to });

  if (empty) {
    const coords = editor.view.coordsAtPos(from);
    const left = event.clientX || coords.left;
    const top = event.clientY || coords.top;

    isCollapsedContextMenuOpen.value = true;
    collapsedContextMenuRect.value = new DOMRect(
      left,
      top,
      1,
      Math.max(coords.bottom - coords.top, 1)
    );
    editor.chain().focus().run();
  } else {
    isCollapsedContextMenuOpen.value = false;
    collapsedContextMenuRect.value = null;
  }

  scheduleToolbarPositionUpdate();
};

const openMobileMenu = () => {
  colorPickerOpen.value = false;
  isMobileMenuOpen.value = true;

  void nextTick(() => {
    scheduleToolbarPositionUpdate({ preserveHorizontal: true });
  });
};

const closeMobileMenu = () => {
  colorPickerOpen.value = false;
  isMobileMenuOpen.value = false;

  void nextTick(() => {
    scheduleToolbarPositionUpdate({ preserveHorizontal: true });
  });
};

const runMobileAction = (action: ToolbarAction) => {
  colorPickerOpen.value = false;
  action.run();

  if (action.key === 'link' && !getToolbarEditor()?.isActive('link')) {
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
  if (props.readClipboardText) {
    try {
      return (await props.readClipboardText()) || '';
    } catch {
      // Используем браузерный буфер обмена, если внешний обработчик недоступен.
    }
  }

  try {
    const readText = navigator.clipboard?.readText;

    return readText ? await readText.call(navigator.clipboard) : '';
  } catch {
    return '';
  }
};

const refreshMobileClipboardText = async (): Promise<void> => {
  if (!isMobileToolbar.value) {
    return;
  }

  const refreshToken = ++mobileClipboardRefreshToken;
  const text = await readClipboardText();

  if (refreshToken === mobileClipboardRefreshToken) {
    mobileClipboardText.value = text || '';
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
  closeMobileSelectionToolbar();
};

const runMobileClipboardAction = async (action: MobileClipboardAction) => {
  const editor = getToolbarEditor();

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

      closeMobileSelectionToolbar();
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

  const copiedText = getClipboardSelectionText(editor, selection);
  const copied = await writeClipboardText(copiedText);

  if (copied && action === 'cut') {
    mobileClipboardText.value = copiedText;
    editor.chain().focus().deleteRange(selection).run();
    closeMobileSelectionToolbar();
    return;
  } else if (copied) {
    mobileClipboardText.value = copiedText;
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
    isActive: () => getToolbarEditor()?.isActive('bold') ?? false,
    run: () => focusEditor()?.toggleBold().run()
  },
  {
    key: 'italic',
    icon: IconNameEnum.italic,
    hint: 'Курсив',
    isActive: () => getToolbarEditor()?.isActive('italic') ?? false,
    run: () => focusEditor()?.toggleItalic().run()
  },
  {
    key: 'underline',
    icon: IconNameEnum.underline,
    hint: 'Подчёркнутый',
    isActive: () => getToolbarEditor()?.isActive('underline') ?? false,
    run: () => focusEditor()?.toggleUnderline().run()
  },
  {
    key: 'strike',
    icon: IconNameEnum.strikethrough,
    hint: 'Зачёркнутый',
    isActive: () => getToolbarEditor()?.isActive('strike') ?? false,
    run: () => focusEditor()?.toggleStrike().run()
  }
];

const openLinkEditor = async () => {
  const editor = getToolbarEditor();

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
  const editor = getToolbarEditor();

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
    isActive: () => getToolbarEditor()?.isActive('code') ?? false,
    run: () => focusEditor()?.toggleCode().run()
  },
  {
    key: 'link',
    icon: IconNameEnum.link,
    hint: 'Ссылка',
    isActive: () => getToolbarEditor()?.isActive('link') ?? false,
    run: () => {
      const editor = getToolbarEditor();

      if (editor?.isActive('link')) {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
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
    isActive: () => getToolbarEditor()?.isActive('orderedList') ?? false,
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
  const editor = getToolbarEditor();
  const selection = savedSelectionRange.value;

  if (!editor || !selection || !canSaveLink.value) {
    return;
  }

  const nextText = linkText.value.trim();
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
  editorDom.addEventListener('contextmenu', handleMobileContextMenu);
  editorDom.addEventListener('keydown', handleEditorKeyDown);
  editorDom.addEventListener('beforeinput', handleEditorBeforeInput);
  editorDom.addEventListener('input', handleEditorInput);
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
  editorDom?.removeEventListener('contextmenu', handleMobileContextMenu);
  editorDom?.removeEventListener('keydown', handleEditorKeyDown);
  editorDom?.removeEventListener('beforeinput', handleEditorBeforeInput);
  editorDom?.removeEventListener('input', handleEditorInput);
  editorDom?.ownerDocument.removeEventListener(
    'selectionchange',
    handleMobileSelectionChange
  );
};

onMounted(() => {
  updateToolbarMode();
  syncActiveColors();
  bindEditorEvents(getToolbarEditor());
  window.addEventListener('resize', handleViewportUpdate);
  window.addEventListener('scroll', handleViewportUpdate, true);
  window.addEventListener('pointerup', handlePointerSelectionEnd, true);
  document.addEventListener('pointerdown', handleDocumentPointerDown, true);
});

onBeforeUnmount(() => {
  unbindEditorEvents(getToolbarEditor());
  window.removeEventListener('resize', handleViewportUpdate);
  window.removeEventListener('scroll', handleViewportUpdate, true);
  window.removeEventListener('pointerup', handlePointerSelectionEnd, true);
  document.removeEventListener('pointerdown', handleDocumentPointerDown, true);

  if (positionAnimationFrameId !== null) {
    cancelAnimationFrame(positionAnimationFrameId);
  }

  clearMobileSelectionTimeouts();
});

watch(
  () => getToolbarEditor(),
  (nextEditor, previousEditor) => {
    if (previousEditor === nextEditor) {
      return;
    }

    unbindEditorEvents(previousEditor);
    bindEditorEvents(nextEditor);
    syncActiveColors();
    scheduleToolbarPositionUpdate();
  }
);
</script>

<style scoped>
.formatting-toolbar {
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: none;
  border-radius: 25px;
  background: var(--surface-overlay, #ffffff);
  box-shadow: inset 0 0 0 0.5px var(--border-table);
}

.formatting-toolbar:not(.formatting-toolbar--mobile) {
  height: 40px;
}

.formatting-toolbar__group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.formatting-toolbar__divider {
  position: relative;
  width: 0;
  height: 18px;

  &::after {
    position: absolute;
    inset: 0 auto 0 0;
    width: 0.5px;
    background: var(--border-table);
    content: '';
  }
}

.formatting-toolbar__button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 20px;
  width: 20px;
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

.formatting-toolbar__button:hover {
  background: var(--action-secondary-hover-bg, #f2f7ff);
  color: var(--text-brand, #77a6ff);
}

.formatting-toolbar__button--active {
  background: var(--action-secondary-pressed-bg, #ecf3ff);
  color: var(--text-brand, #77a6ff);
}

.formatting-toolbar__color-control {
  position: relative;
  display: flex;
}

.formatting-toolbar__color-button {
  overflow: hidden;
}

.formatting-toolbar__color-glyph {
  transform: translateY(1.5px);
}

.formatting-toolbar--mobile .formatting-toolbar__color-glyph {
  transform: none;
}

.formatting-toolbar__color-picker {
  position: absolute;
  z-index: 1;
}

.formatting-toolbar__color-picker--top {
  bottom: calc(100% + 5px);
}

.formatting-toolbar__color-picker--bottom {
  top: calc(100% + 5px);
}

.formatting-toolbar__color-picker--left {
  left: 0;
}

.formatting-toolbar__color-picker--right {
  right: 0;
}

.formatting-toolbar--mobile {
  gap: 0;
  padding: 4px 5px 4px 14px;
  border: none;
  border-radius: 999px;
  background: var(--surface-overlay, #ffffff);
  box-shadow: 0 4px 14px rgb(28 38 53 / 12%);
}

.formatting-toolbar--mobile-menu {
  display: block;
  width: 162px;
  padding: 0;
  border: 0.5px solid var(--border-table);
  border-radius: 8px;
  background: var(--surface-overlay, #ffffff);
  box-shadow: 0 8px 24px rgb(28 38 53 / 16%);
  overflow: hidden;
}

.formatting-toolbar--mobile-color-picker {
  width: 130px;
  padding: 0;
  border: none;
  background: transparent;
  box-shadow: none;
  overflow: visible;
}

.formatting-toolbar__color-picker--mobile {
  position: static;
  flex: 0 0 auto;
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
  background: var(--border-table);
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
  background: var(--text-brand);
  color: var(--text-on-brand, #ffffff);
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
  color: var(--text-primary);
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
  background: var(--border-table);
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
  color: var(--text-primary);
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

.formatting-toolbar__color-icon {
  display: inline-grid;
  width: 24px;
  height: 24px;
  place-items: center;
  border-radius: 3px;
  overflow: hidden;
}

.formatting-toolbar__mobile-action--active
  .formatting-toolbar__mobile-action-icon {
  color: var(--text-brand);
}

.formatting-toolbar__link-modal-container {
  --link-modal-width: 370px;
  box-sizing: border-box;
  width: var(--link-modal-width);
  max-width: calc(100vw - 32px);
  max-height: calc(100dvh - 32px);
  border-radius: 10px !important;
  background: var(--surface-overlay);
  overflow: auto;
}

dialog.formatting-toolbar__link-modal-container.modal-yui-kit {
  border: 0;
  box-shadow: inset 0.5px 0 0 var(--border-table);
}

.formatting-toolbar__link-modal-container :deep(.modal-yui-kit__modal-content) {
  display: block;
  padding: 0;
  gap: 0;
  max-height: none;
}

.formatting-toolbar__link-modal {
  display: flex;
  flex-direction: column;
  gap: 21px;
  padding: 20px 10px;
}

.formatting-toolbar__link-modal-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 34px;
  padding: 5px 10px;
}

.formatting-toolbar__link-modal-header::after {
  content: '';
  position: absolute;
  right: -10px;
  bottom: -10.5px;
  left: -10px;
  height: 0.5px;
  background: var(--border-table);
  pointer-events: none;
}

.formatting-toolbar__link-modal-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
}

.formatting-toolbar__link-modal-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 24px;
}

.formatting-toolbar__link-modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
}

.formatting-toolbar__link-modal-close:hover {
  background: var(--action-secondary-hover-bg);
}

.formatting-toolbar__link-modal-close .icon-yui-kit {
  width: 20px;
  height: 20px;
}

.formatting-toolbar__field {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.formatting-toolbar__field-label {
  font-size: 14px;
  font-weight: 400;
  color: var(--text-secondary);
  line-height: 17px;
}

.formatting-toolbar__field-input {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  height: 44px;
  padding: 9px 14px;
  border: 1px solid transparent;
  border-radius: 5px;
  background: var(--surface-input-secondary);
  color: var(--text-primary);
  font-size: 14px;
  font-family: inherit;
  line-height: 24px;
  text-overflow: ellipsis;
  outline: none;
  transition: border-color 0.2s ease;
}

.formatting-toolbar__field-input:focus {
  border-color: var(--border-hover);
}

.formatting-toolbar__field-input::placeholder {
  color: var(--text-disabled);
  opacity: 1;
}

.formatting-toolbar__link-modal-actions {
  display: flex;
  justify-content: flex-end;
}

.formatting-toolbar__link-modal-save {
  height: 30px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background: var(--action-primary-bg);
  color: var(--text-on-brand, #ffffff);
  font-size: 14px;
  font-family: inherit;
  line-height: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.formatting-toolbar__link-modal-save:hover:not(:disabled) {
  background: var(--action-primary-active-bg);
}

.formatting-toolbar__link-modal-save:disabled {
  background: var(--action-disabled-bg);
  color: var(--text-disabled);
  cursor: not-allowed;
}

.formatting-toolbar__link-modal-close:focus-visible,
.formatting-toolbar__link-modal-save:focus-visible {
  outline: 2px solid var(--border-hover);
  outline-offset: 2px;
}

@media (width <= 768px) {
  .formatting-toolbar__link-modal-container {
    --link-modal-width: 290px;
    border-radius: 25px !important;
  }

  .formatting-toolbar__link-modal {
    padding-block: 15px;
  }

  .formatting-toolbar__link-modal-header {
    padding-inline: 5px;
  }

  .formatting-toolbar__link-modal-body {
    gap: 15px;
    padding-inline: 5px;
  }

  .formatting-toolbar__link-modal-save {
    height: 35px;
  }
}
</style>
