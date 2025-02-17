<template>
  <DatePicker
    locale="ru"
    v-model="state.date"
    title-position="left"
    :masks="state.masks"
    :disabled="props.disabled"
    borderless
    class="date-picker-yui-kit"
  >
    <template #default="{ inputValue, showPopover, hidePopover }">
      <div
        @click="toggle(showPopover, hidePopover)"
        :class="[
          'date-picker-yui-kit__header',
          { 'date-disable-yui-kit': props.disabled },
          { 'date-active-yui-kit': state.isActive }
        ]"
      >
        <Icon :name="IconNameEnum.calendar" />
        {{ formatLetter(inputValue) || state.defaultValue }}
        <Button
          size="small"
          type="ghost"
          v-if="inputValue"
          @click="state.date = null"
        >
          <Icon :name="IconNameEnum.crossSmall" />
        </Button>
      </div>
    </template>
  </DatePicker>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { DatePicker } from 'v-calendar';
import Button from '../Button/Button.vue';
import Icon from '../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum.ts';
import type { IDatePickerProps } from './interfaces/interfaces';
import 'v-calendar/style.css';

const props = defineProps<IDatePickerProps>();

const state = reactive({
  date: new Date().toLocaleDateString('ru-RU') as Date | string,
  isActive: false,
  masks: {
    input: 'MMMM DD, YYYY'
  },
  defaultValue: '-- -- ----'
});

const toggle = (popoverOpen, popoverClose): void => {
  if (!state.isActive) {
    popoverOpen({ visibility: 'click' });
    state.isActive = true;
  } else {
    popoverClose({ visibility: 'click' });
    state.isActive = false;
  }
};

const formatLetter = (str: string): string => {
  const commaIndex = str.indexOf(' ');
  const endIndex = commaIndex === -1 ? 3 : Math.min(commaIndex, 3);
  return `${str.charAt(0).toUpperCase()}${str.slice(1, endIndex)}${str.slice(commaIndex)}`;
};
</script>

<style scoped>
.date-picker-yui-kit__header {
  border: 1px solid var(--border-grey);
  display: flex;
  align-items: center;
  align-content: center;
  background: var(--white);
  width: max-content;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 14px;
  color: var(--grey6);
  &:hover {
    cursor: pointer;
    background: #f8f9fd;
  }
  &.date-active-yui-kit {
    background: var(--blue9);
    color: var(--blue1);
    border-color: var(--border-blue);
  }
}

.date-disable-yui-kit {
  user-select: none;
  pointer-events: none;
  color: var(--grey4);
  background: var(--grey1);
}
</style>

<style>
.date-picker-yui.vc-container {
  border-radius: 12px;
}

.vc-popover-caret.direction-bottom.align-left {
  display: none;
}

.date-picker-yui-kit .vc-popover-content {
}
</style>
