<template>
  <button
    @click="handleClick"
    :class="[
      'date-picker-yui-kit__header-btn',
      { 'date-picker-yui-kit__header-btn_table-view': props.isSmall },
      { 'date-picker-yui-kit__header-btn_range-view': props.isRange },
      { 'date-disable-yui-kit': props.disabled },
      { 'date-active-yui-kit': state.isActive }
    ]"
    :data-testid="`${props.dataTestid}-HeaderBtn-Trigger`"
  >
    <Icon
      :name="IconNameEnum.calendar"
      :data-testid="`${props.dataTestid}-Icon`"
    />
    <span v-if="state.value" :data-testid="`${props.dataTestid}-Value-Display`">
      {{ formatLetter(state.value) }}
    </span>
    <span
      class="date-picker-yui-kit__header-btn__dash"
      v-else
      :data-testid="`${props.dataTestid}-HeaderBtnDash-Placeholder`"
    >
      {{ state.defaultValue }}
    </span>
    <Button
      :size="SizesEnum.small"
      :type="ButtonTypeEnum.ghost"
      :disabled="props.disabled"
      v-if="state.value"
      @click.stop="handleClear"
      :data-testid="`${props.dataTestid}-Button-Clear`"
    >
      <Icon
        :name="IconNameEnum.crossSmall"
        :data-testid="`${props.dataTestid}-ButtonClose-Icon`"
      />
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

const props = withDefaults(defineProps<IDatePickerChooserProps>(), {
  dataTestid: 'DatePickerChoose'
});

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

watchEffect(() => (state.value = props.value));

const handleClear = (): void => {
  emits('clear');
};

const handleClick = (): void => {
  emits('click');
};

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
  padding: var(--header-padding, 10px);
  border-radius: 10px;
  font-size: 14px;
  color: var(--color, var(--grey6));
  border: 1px solid var(--border, var(--border-grey));
  padding-left: 1px;
  &:hover {
    cursor: pointer;
    background: #f8f9fd;
  }
  &.date-active-yui-kit {
    --background: var(--blue9);
    --color: var(--blue1);
    --border: var(--active-border, var(--border-blue));
  }
  &:nth-child(2) {
    padding-left: 10px;
  }
}

.date-picker-yui-kit__header-btn_table-view {
  --header-padding: 4px 10px;
}

.date-picker-yui-kit__header-btn_range-view {
  --header-padding: 5px;
}

.date-disable-yui-kit {
  user-select: none;
  pointer-events: none;
  --color: var(--grey4);
  --background: var(--grey1);
  --border: var(--disable-border, var(--border-grey));
  & button.disabled-yui-kit {
    color: var(--grey4);
    background: transparent;
  }
}

.date-picker-yui-kit__header-btn__dash {
  color: var(--text-grey);
  font-weight: 400;
}
</style>
