<template>
  <div
    ref="pickerRoot"
    class="sticker-picker"
    :class="{
      'sticker-picker--available': props.stickers.length > 0,
      'sticker-picker--active': showStickers
    }"
    @click.capture="handlePickerClick"
    @input.capture="handleSearch"
  >
    <EmojiPicker v-bind="$attrs" @select="emit('select', $event)" />
    <Teleport v-if="groupsTarget && props.stickers.length" :to="groupsTarget">
      <button
        type="button"
        class="sticker-picker__tab"
        aria-label="Стикеры"
        title="Стикеры"
        :aria-pressed="showStickers"
        @click.stop="openStickers"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M19.5 13.5V7a3.5 3.5 0 0 0-3.5-3.5H8A3.5 3.5 0 0 0 4.5 7v10A3.5 3.5 0 0 0 8 20.5h4.5m7-7-7 7m7-7H16a3.5 3.5 0 0 0-3.5 3.5v3.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </Teleport>
    <Teleport v-if="bodyTarget && showStickers" :to="bodyTarget">
      <section class="sticker-picker__content" aria-label="Стикеры">
        <h5>Стикеры</h5>
        <div v-if="filteredStickers.length" class="sticker-picker__grid">
          <button
            v-for="sticker in filteredStickers"
            :key="sticker.id"
            type="button"
            class="sticker-picker__item"
            :aria-label="`Отправить стикер: ${sticker.label}`"
            :title="sticker.label"
            :data-sticker-id="sticker.id"
            @click.stop="emit('select-sticker', sticker)"
          >
            <img
              :src="sticker.previewSrc || sticker.src"
              :alt="sticker.label"
              width="60"
              height="60"
              decoding="async"
              draggable="false"
            />
          </button>
        </div>
        <p v-else class="sticker-picker__empty">Стикеры не найдены</p>
      </section>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, shallowRef } from 'vue';
import EmojiPicker from 'vue3-emoji-picker';
import {
  syncEmojiGroupScroll,
  type EmojiPickerSelection
} from './emoji-picker-config';
import {
  matchesStickerSearch,
  type IStickerPickerItem
} from './sticker-picker';

defineOptions({ inheritAttrs: false });
const props = withDefaults(
  defineProps<{ stickers?: readonly IStickerPickerItem[] }>(),
  {
    stickers: () => []
  }
);
const emit = defineEmits<{
  select: [emoji: EmojiPickerSelection];
  'select-sticker': [sticker: IStickerPickerItem];
}>();
const pickerRoot = ref<HTMLElement | null>(null);
const groupsTarget = shallowRef<HTMLElement | null>(null);
const bodyTarget = shallowRef<HTMLElement | null>(null);
const showStickers = ref(false);
const search = ref('');
const filteredStickers = computed(() =>
  props.stickers.filter(sticker => matchesStickerSearch(sticker, search.value))
);

const openStickers = (): void => {
  search.value =
    pickerRoot.value?.querySelector<HTMLInputElement>('.v3-search input')
      ?.value || '';
  showStickers.value = true;
};

const handleSearch = (event: Event): void => {
  if (
    event.target instanceof HTMLInputElement &&
    event.target.matches('.v3-search input')
  ) {
    search.value = event.target.value;
  }
};

const handlePickerClick = (event: Event): void => {
  if (
    event.target instanceof Element &&
    event.target.closest('.v3-groups .v3-group')
  ) {
    showStickers.value = false;
    syncEmojiGroupScroll(event);
  }
};

onMounted(async () => {
  await nextTick();
  groupsTarget.value =
    pickerRoot.value?.querySelector<HTMLElement>('.v3-groups') || null;
  bodyTarget.value =
    pickerRoot.value?.querySelector<HTMLElement>('.v3-body') || null;
});
</script>

<style lang="scss">
.sticker-picker {
  display: contents;

  &--available .v3-groups .v3-group:first-child {
    order: -2;
  }

  &--active .v3-body-inner,
  &--active .v3-footer {
    display: none !important;
  }

  &__tab {
    display: grid;
    place-items: center;
    flex: 0 0 30px;
    order: -1;
    width: 30px;
    height: 30px;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 5px;
    background: transparent;
    color: #757d8a;
    opacity: 0.55;
    transition: opacity 0.2s ease;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
      background: var(--action-secondary-hover-bg, #f2f7ff);
    }

    &:focus-visible {
      outline: 2px solid var(--border-hover, #9cbeff);
    }
  }

  &__content {
    height: 100%;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--border-hover, #9cbeff) transparent;

    h5 {
      margin: 0 0 10px;
      font-size: 14px;
      line-height: 20px;
      font-weight: 600;
      text-align: left;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 60px));
    justify-content: space-between;
    row-gap: 10px;
  }

  &__item {
    display: grid;
    place-items: center;
    min-width: 0;
    height: 60px;
    padding: 0;
    border: 0;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;

    img {
      display: block;
      width: 100%;
      height: 60px;
      object-fit: contain;
    }

    &:hover {
      background: var(--action-secondary-hover-bg, #f2f7ff);
    }

    &:focus-visible {
      outline: 2px solid var(--border-hover, #9cbeff);
      outline-offset: -2px;
    }
  }

  &__empty {
    color: var(--text-disabled, #757d8a);
    font-size: 14px;
    text-align: center;
  }
}

:is([data-theme='dark'], .theme-dark) .emoji-picker .sticker-picker__tab {
  color: #ffffff;
  opacity: 0.45;

  &:hover {
    opacity: 0.7;
  }
}
</style>
