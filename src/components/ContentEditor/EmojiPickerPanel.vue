<template>
  <div
    ref="pickerRoot"
    class="emoji-picker-panel emoji-picker-panel--open"
    :style="emojiPickerStyle"
    @click.capture="handlePickerClick"
  >
    <EmojiPicker
      :native="true"
      :display-recent="true"
      :additional-groups="emojiAdditionalGroups"
      :group-icons="emojiGroupIcons"
      :group-names="emojiGroupNames"
      :group-order="emojiGroupOrder"
      :static-texts="emojiStaticTexts"
      @select="handleSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';

import {
  emojiAdditionalGroups,
  emojiGroupIcons,
  emojiGroupNames,
  emojiGroupOrder,
  emojiPickerStyle,
  emojiStaticTexts,
  rememberEmojiSelection,
  syncEmojiGroupControls,
  syncEmojiGroupScroll,
  type EmojiPickerSelection
} from './emoji-picker-config';

const emit = defineEmits<{
  select: [emoji: EmojiPickerSelection];
}>();

const pickerRoot = ref<HTMLElement | null>(null);
let frozenRecentEmojiOrder: string[] = [];
let isRecentOrderFrozen = false;

const getRecentEmojiButtons = (): HTMLButtonElement[] => [
  ...(pickerRoot.value?.querySelectorAll<HTMLButtonElement>(
    '#recent .v3-emojis button'
  ) || [])
];

const getRecentEmojiKey = (button: HTMLButtonElement): string =>
  button.textContent?.trim() ?? '';

const localizeEmojiGroupLabels = (): void => {
  if (pickerRoot.value) {
    syncEmojiGroupControls(pickerRoot.value);
  }
};

const freezeRecentOrder = (): void => {
  if (isRecentOrderFrozen) return;

  frozenRecentEmojiOrder = getRecentEmojiButtons().map(getRecentEmojiKey);
  isRecentOrderFrozen = true;
};

const applyFrozenRecentOrder = (): void => {
  if (!isRecentOrderFrozen) return;

  getRecentEmojiButtons().forEach(button => {
    const frozenIndex = frozenRecentEmojiOrder.indexOf(
      getRecentEmojiKey(button)
    );

    if (frozenIndex === -1) {
      button.style.display = 'none';
      button.style.removeProperty('order');
      return;
    }

    button.style.removeProperty('display');
    button.style.order = String(frozenIndex);
  });
};

const handlePickerClick = (event: Event): void => {
  syncEmojiGroupScroll(event);

  const target = event.target;

  if (!(target instanceof Element) || !target.closest('.v3-emojis button')) {
    return;
  }

  freezeRecentOrder();
};

const handleSelect = async (emoji: EmojiPickerSelection): Promise<void> => {
  rememberEmojiSelection(emoji);
  emit('select', emoji);
  await nextTick();

  requestAnimationFrame(applyFrozenRecentOrder);
};

onMounted(() => {
  nextTick(localizeEmojiGroupLabels);
});
</script>

<style lang="scss">
.emoji-picker-panel {
  contain: layout style;
  opacity: 0;
  pointer-events: none;
  user-select: none;
  will-change: opacity;

  &.emoji-picker-panel--open {
    opacity: 1;
    pointer-events: auto;
  }

  &.emoji-picker-panel--dragging,
  &.emoji-picker-panel--dragging .v3-header,
  &.emoji-picker-panel--dragging .v3-groups {
    cursor: grabbing;
  }

  & .v3-emoji-picker {
    --v3-picker-bg: var(--surface-overlay, #ffffff);
    --v3-picker-fg: var(--text-primary, #181818);
    --v3-picker-border: var(--border-table, #e7e7e7);
    --v3-picker-input-bg: var(--surface-input-secondary, #f8f9fd);
    --v3-picker-input-border: transparent;
    --v3-picker-input-focus-border: var(--border-hover, #9cbeff);
    --v3-picker-emoji-hover: var(--action-secondary-hover-bg, #f2f7ff);

    display: flex;
    width: min(359px, calc(100vw - 16px));
    height: min(var(--emoji-picker-height, 382px), calc(100dvh - 16px));
    margin: 0;
    padding: 15px;
    gap: 15px;
    overflow: hidden;
    border: 0.5px solid var(--border-table, #e7e7e7);
    border-radius: 25px;
    background: var(--surface-overlay, #ffffff);
    color: var(--text-primary, #181818);
    box-shadow: 0 4px 9.8px 0 #0000000d;
    font-family: inherit;
  }

  & .v3-header {
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 15px;
    padding: 0;
    border: 0;
    cursor: grab;
  }

  & .v3-header .v3-groups {
    display: flex;
    width: 100%;
    height: 30px;
    align-items: center;
    justify-content: space-between;
    filter: none;
    touch-action: none;
  }

  & .v3-header .v3-groups .v3-group,
  & .v3-header .v3-groups .v3-group:first-child,
  & .v3-header .v3-groups .v3-group:last-child {
    display: grid;
    width: 30px;
    height: 30px;
    flex: 0 0 30px;
    place-items: center;
    padding: 0;
    border-radius: 5px;
    opacity: 0.55;
  }

  & .v3-header .v3-groups .v3-group:hover {
    opacity: 0.8;
  }

  & .v3-header .v3-groups .v3-group span,
  & .v3-header .v3-groups .v3-group span img {
    width: 30px;
    height: 30px;
  }

  & .v3-header .v3-groups .v3-group:first-child img {
    content: var(--emoji-recent-icon);
  }

  & .v3-spacing {
    display: none;
  }

  & .v3-search {
    position: relative;
    width: 100%;
    height: 40px;
  }

  & .v3-search::before {
    position: absolute;
    top: 10px;
    left: 12px;
    z-index: 1;
    width: 20px;
    height: 20px;
    background: var(--text-disabled, #b8b8b8);
    content: '';
    pointer-events: none;
    mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M9.58329 17.5C13.9555 17.5 17.5 13.9556 17.5 9.58332C17.5 5.21107 13.9555 1.66666 9.58329 1.66666C5.21104 1.66666 1.66663 5.21107 1.66663 9.58332C1.66663 13.9556 5.21104 17.5 9.58329 17.5Z' fill='none' stroke='black' stroke-width='1.25' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M18.3333 18.3333L16.6666 16.6667' fill='none' stroke='black' stroke-width='1.25' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
      center / contain no-repeat;
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M9.58329 17.5C13.9555 17.5 17.5 13.9556 17.5 9.58332C17.5 5.21107 13.9555 1.66666 9.58329 1.66666C5.21104 1.66666 1.66663 5.21107 1.66663 9.58332C1.66663 13.9556 5.21104 17.5 9.58329 17.5Z' fill='none' stroke='black' stroke-width='1.25' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M18.3333 18.3333L16.6666 16.6667' fill='none' stroke='black' stroke-width='1.25' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")
      center / contain no-repeat;
  }

  & .v3-search input {
    width: 100%;
    height: 40px;
    padding: 8px 12px 8px 42px;
    border: 0;
    border-radius: 5px;
    outline: 0;
    background: var(--surface-input-secondary, #f8f9fd);
    color: var(--text-primary, #181818);
    font-family: Inter, sans-serif;
    font-size: 14px;
    line-height: 24px;
    user-select: text;
  }

  & .v3-search input:focus {
    border: 0;
    box-shadow: inset 0 0 0 0.5px var(--border-hover, #9cbeff);
  }

  & .v3-search input::placeholder {
    color: var(--text-disabled, #b8b8b8);
    opacity: 1;
  }

  & .v3-body {
    min-height: 0;
    height: 207px;
    flex: 1 1 207px;
    padding: 0;
  }

  & .v3-body .v3-body-inner {
    height: 100%;
    padding-right: 0;
    scroll-behavior: auto !important;
    scrollbar-color: auto;
    scrollbar-width: auto;

    @supports not selector(::-webkit-scrollbar) {
      scrollbar-color: var(--action-primary-bg, #77a6ff) transparent;
      scrollbar-width: thin;
    }
  }

  & .v3-body .v3-body-inner::-webkit-scrollbar {
    width: 5px;
  }

  & .v3-body .v3-body-inner::-webkit-scrollbar-track {
    background: transparent;
  }

  & .v3-body .v3-body-inner::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }

  & .v3-body .v3-body-inner::-webkit-scrollbar-thumb,
  & .v3-body .v3-body-inner:hover::-webkit-scrollbar-thumb {
    display: block;
    border-radius: 10px;
    background: var(--action-primary-bg, #77a6ff);
  }

  & .v3-body .v3-body-inner .v3-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    content-visibility: auto;
    contain-intrinsic-block-size: auto 260px;
  }

  & .v3-body .v3-body-inner .v3-group h5 {
    margin: 0;
    padding: 0;
    background: var(--surface-overlay, #ffffff);
    color: var(--text-primary, #181818);
    font-family: Inter, sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 17px;
  }

  & .v3-body .v3-body-inner .v3-group .v3-emojis {
    width: 100%;
    font-size: 24px;
  }

  & .v3-body .v3-body-inner .v3-group .v3-emojis button {
    height: 36px;
    flex-basis: 12.5%;
    max-width: 12.5%;
    padding: 0;
    border-radius: 5px;
    font-size: 24px;
  }

  & .v3-body .v3-body-inner .v3-group .v3-emojis button::after {
    display: none;
  }

  & .v3-footer {
    width: 100%;
    height: 30px;
    min-height: 30px;
    flex: 0 0 30px;
    padding: 10px 0 0;
    border-top: 0.5px solid var(--border-table, #e7e7e7);
    color: var(--text-primary, #181818);
    font-size: 12px;
    line-height: 20px;
  }

  & .v3-footer .v3-foot-left > span.v3-text {
    max-width: 170px;
  }

  & .v3-footer .v3-tone .v3-text {
    font-size: 12px;
  }

  & .v3-footer .v3-tone .v3-icon {
    width: 15px;
    height: 15px;
  }

  & .v3-skin-tones {
    right: auto;
    left: 0;
    width: auto;
    height: 30px;
    justify-content: flex-start;
    padding: 10px 0 0;
    border-radius: 0;
    background: var(--surface-overlay, #ffffff);
  }

  & .v3-skin-tones .v3-skin-tone {
    width: 25px;
    height: 15px;
  }
}

:is([data-theme='dark'], .theme-dark)
  .emoji-picker-panel
  .v3-header
  .v3-groups
  .v3-group {
  opacity: 0.45;
  filter: none;
}

:is([data-theme='dark'], .theme-dark)
  .emoji-picker-panel
  .v3-header
  .v3-groups
  .v3-group
  img {
  filter: brightness(0) invert(1);
}

:is([data-theme='dark'], .theme-dark)
  .emoji-picker-panel
  .v3-header
  .v3-groups
  .v3-group:hover {
  opacity: 0.7;
}
</style>
