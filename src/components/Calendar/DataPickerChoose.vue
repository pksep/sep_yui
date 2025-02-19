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
    <span v-if="state.value"> {{ formatLetter(state.value) }} </span>
    <span class="date-picker-yui-kit__header-btn__dash" v-else>
      {{ state.defaultValue }}
    </span>
    <Button
      :size="SizesEnum.small"
      :type="ButtonTypeEnum.ghost"
      :disabled="props.disabled"
      v-if="state.value"
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
  value: '',
  isActive: false
});

const emits = defineEmits<{
  (e: 'clear'): void;
  (e: 'click'): void;
}>();

watchEffect(() => (state.isActive = props.isActive));

watchEffect(() => {
  state.value = props.value;
});

const formatLetter = (str: string): string | null => {
  if (!str) return null;
  const commaIndex = str.indexOf(' ');
  const endIndex = commaIndex === -1 ? 3 : Math.min(commaIndex, 3);
  return `${str.charAt(0).toUpperCase()}${str.slice(1, endIndex)}${str.slice(commaIndex)}`;
};
</script>

<style scoped>
.date-picker-yui-kit__header-btn {
  display: flex;
  align-items: center;
  align-content: center;
  background: var(--background, var(--white));
  width: max-content;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 14px;
  color: var(--color, var(--grey6));
  border: 1px solid var(--border, var(--border-grey));
  &:hover {
    cursor: pointer;
    background: #f8f9fd;
  }
  &.date-active-yui-kit {
    --background: var(--blue9);
    --color: var(--blue1);
    --border: var(--active-border, var(--border-blue));
  }
}

.date-disable-yui-kit {
  user-select: none;
  pointer-events: none;
  --color: var(--grey4);
  --background: var(--grey1);
  --border: var(--disable-border, var(--border-grey));
}

.date-picker-yui-kit__header-btn__dash {
  color: var(--text-grey);
  font-weight: 400;
}
</style>
