<template>
  <button
    @click="emits('click')"
    :class="[
      'date-picker-yui-kit__header-btn',
      { 'date-disable-yui-kit': props.disabled },
      { 'date-active-yui-kit': state.isActive }
    ]"
  >
    <Icon :name="IconNameEnum.calendar" />
    {{ formatLetter(props.value) || state.defaultValue }}
    <Button
      :size="SizesEnum.small"
      :type="ButtonTypeEnum.ghost"
      :disabled="props.disabled"
      v-if="props.value"
      @click="emits('clear')"
    >
      <Icon :name="IconNameEnum.crossSmall" />
    </Button>
  </button>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue';
import Button from '../Button/Button.vue';
import Icon from '../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import { ButtonTypeEnum } from '../Button/enum/enum';
import { SizesEnum } from '@/common/sizes';
import type { IDatePickerChooserProps } from './interfaces/interfaces';

const props = defineProps<IDatePickerChooserProps>();

const state = reactive({
  defaultValue: '-- -- ----',
  isActive: false
});

const emits = defineEmits<{
  (e: 'clear'): void;
  (e: 'click'): void;
}>();

watchEffect(() => {
  state.isActive = props.isActive;
});

const formatLetter = (str: string): string | null => {
  if (!str) return null;
  const commaIndex = str.indexOf(' ');
  const endIndex = commaIndex === -1 ? 3 : Math.min(commaIndex, 3);
  return `${str.charAt(0).toUpperCase()}${str.slice(1, endIndex)}${str.slice(commaIndex)}`;
};
</script>

<style scoped>
.date-disable-yui-kit {
  user-select: none;
  pointer-events: none;
  color: var(--grey4);
  background: var(--grey1);
}

.date-picker-yui-kit__header-btn {
  display: flex;
  align-items: center;
  align-content: center;
  background: var(--background, --white);
  width: max-content;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 14px;
  color: var(--grey6);
  border: 1px solid var(--border, --border-grey);
  &:hover {
    cursor: pointer;
    background: #f8f9fd;
  }
  &.date-active-yui-kit {
    background: var(--blue9);
    color: var(--blue1);
    border-color: var(--active-border, --border-blue);
  }
}
</style>
