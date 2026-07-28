<template>
  <div
    class="content-editor-slash-menu"
    :style="positionStyle"
    role="listbox"
    aria-label="Команды редактора"
    @mousedown.prevent
  >
    <button
      v-for="(item, index) in items"
      :id="`${id}-option-${item.id}`"
      :key="item.id"
      type="button"
      class="content-editor-slash-menu__item"
      :class="{
        'content-editor-slash-menu__item--active': activeIndex === index
      }"
      role="option"
      :aria-selected="activeIndex === index"
      @mousedown.prevent="emit('select', index)"
      @mouseenter="emit('update:activeIndex', index)"
    >
      <span
        v-if="item.icon"
        class="content-editor-slash-menu__icon"
        aria-hidden="true"
        v-html="item.icon"
      />
      <span class="content-editor-slash-menu__label">{{ item.label }}</span>
    </button>

    <div
      v-if="items.length === 0"
      class="content-editor-slash-menu__empty"
      role="status"
    >
      {{ emptyText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';

import type { IContentEditorSlashMenuItem } from './interfaces/content-editor-slash-menu';

withDefaults(
  defineProps<{
    id?: string;
    items: IContentEditorSlashMenuItem[];
    activeIndex?: number;
    positionStyle?: CSSProperties;
    emptyText?: string;
  }>(),
  {
    id: 'content-editor-slash-menu',
    activeIndex: 0,
    positionStyle: () => ({}),
    emptyText: 'Нет результатов'
  }
);

const emit = defineEmits<{
  (e: 'select', index: number): void;
  (e: 'update:activeIndex', index: number): void;
}>();
</script>

<style scoped>
.content-editor-slash-menu {
  position: absolute;
  z-index: 60;
  min-width: 220px;
  max-width: 280px;
  padding: 8px;
  border: 1px solid var(--border-table);
  border-radius: 12px;
  background: var(--white);
  box-shadow: 0 4px 14px rgb(28 38 53 / 12%);
}

.content-editor-slash-menu__item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 36px;
  padding: 7px 9px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--text-neutral-color);
  font-size: 13px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.content-editor-slash-menu__item:hover,
.content-editor-slash-menu__item--active {
  background: var(--blue10);
  color: var(--primary-pressed-color);
}

.content-editor-slash-menu__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.content-editor-slash-menu__icon :deep(svg) {
  width: 20px;
  height: 20px;
}

.content-editor-slash-menu__label {
  min-width: 0;
}

.content-editor-slash-menu__empty {
  padding: 10px;
  color: var(--text-neutral-color);
  font-size: 12px;
  text-align: center;
}
</style>
