<template>
  <div
    class="content-editor-color-picker"
    role="dialog"
    aria-label="Выбор цвета"
    @mousedown.prevent
  >
    <section class="content-editor-color-picker__section">
      <div class="content-editor-color-picker__title">Цвет текста</div>
      <div class="content-editor-color-picker__swatches">
        <button
          v-for="color in colors"
          :key="`text-${color.value}`"
          type="button"
          class="content-editor-color-picker__text-swatch"
          :class="{
            'content-editor-color-picker__text-swatch--active':
              activeTextColor === color.value
          }"
          :style="{ color: color.value }"
          :aria-label="`Цвет текста: ${color.label}`"
          :aria-pressed="activeTextColor === color.value"
          @click="$emit('select-text-color', color.value)"
        >
          <Icon :name="IconNameEnum.text" :width="20" :height="20" />
        </button>
      </div>
    </section>

    <section class="content-editor-color-picker__section">
      <div class="content-editor-color-picker__title">Цвет фона</div>
      <div class="content-editor-color-picker__swatches">
        <button
          v-for="color in colors"
          :key="`background-${color.value}`"
          type="button"
          class="content-editor-color-picker__background-swatch"
          :class="{
            'content-editor-color-picker__background-swatch--active':
              activeBackgroundColor === color.value
          }"
          :style="{ backgroundColor: color.value }"
          :aria-label="`Цвет фона: ${color.label}`"
          :aria-pressed="activeBackgroundColor === color.value"
          @click="$emit('select-background-color', color.value)"
        ></button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Icon from '../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';

interface ContentEditorColorOption {
  label: string;
  value: string;
}

interface Props {
  colors: ContentEditorColorOption[];
  activeTextColor?: string | null;
  activeBackgroundColor?: string | null;
}

defineProps<Props>();

defineEmits<{
  (event: 'select-text-color', color: string): void;
  (event: 'select-background-color', color: string): void;
}>();
</script>

<style scoped>
.content-editor-color-picker {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 130px;
  height: 180px;
  padding: 10px;
  gap: 10px;
  border: 0.5px solid var(--border-table, #e7e7e7);
  border-radius: 15px;
  background: var(--surface-overlay, #ffffff);
  box-shadow: 0 4px 9.8px rgb(0 0 0 / 5%);
}

.content-editor-color-picker__section {
  display: grid;
  flex: 1 1 0;
  grid-template-rows: 17px minmax(0, 1fr);
  gap: 8px;
  min-height: 0;
}

.content-editor-color-picker__title {
  color: var(--text-primary, #181818);
  font-size: 12px;
  font-weight: 400;
  line-height: 17px;
  white-space: nowrap;
}

.content-editor-color-picker__swatches {
  display: grid;
  grid-template-columns: repeat(4, 20px);
  grid-template-rows: repeat(2, 20px);
  gap: 10px;
}

.content-editor-color-picker__text-swatch,
.content-editor-color-picker__background-swatch {
  display: grid;
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  place-items: center;
  cursor: pointer;
}

.content-editor-color-picker__text-swatch {
  border-radius: 10px;
  background: transparent;
}

.content-editor-color-picker__background-swatch {
  border: 0.5px solid rgb(24 24 24 / 8%);
  border-radius: 50%;
  color: #ffffff;
}

.content-editor-color-picker__text-swatch:focus-visible {
  outline: 1px solid var(--text-brand, #3f8ae0);
  outline-offset: 1px;
}

.content-editor-color-picker__text-swatch--active {
  outline: 1px solid var(--text-brand, #3f8ae0);
  outline-offset: 1px;
}

.content-editor-color-picker__background-swatch:focus-visible {
  outline: 2px solid var(--surface-overlay, #ffffff);
  box-shadow: 0 0 0 3px var(--border-hover, #9cbeff);
}

@media (hover: hover) and (pointer: fine) {
  .content-editor-color-picker__text-swatch:hover {
    outline: 1px solid var(--text-brand, #3f8ae0);
    outline-offset: 1px;
  }

  .content-editor-color-picker__background-swatch:hover {
    outline: 2px solid var(--surface-overlay, #ffffff);
    box-shadow: 0 0 0 3px var(--border-hover, #9cbeff);
  }
}

.content-editor-color-picker__background-swatch--active {
  outline: 1px solid var(--surface-overlay, #ffffff);
  box-shadow: 0 0 0 2px var(--text-brand, #3f8ae0);
}
</style>
