<template>
  <div class="date-picker-yui-kit__wrapper">
    <DatePicker
      :locale="props.locale || 'ru'"
      title-position="left"
      v-model="date"
      :masks="state.masks"
      :min-date="getDateStart()"
      :popover="{ visibility: 'click' }"
      @popover-did-hide="state.isActive = false"
      borderless
      class="date-picker-yui-kit"
    >
      <template #default="{ inputValue, togglePopover }">
        <DataPickerChoose
          @click="toggle(togglePopover)"
          @clear="clearChoose"
          :is-active="state.isActive"
          :value="inputValue"
          :disabled="props.disabled"
        />
      </template>
    </DatePicker>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect, watch } from 'vue';
import { DatePicker } from 'v-calendar';
import DataPickerChoose from './DataPickerChoose.vue';
import { clearFunction } from './date-utils';

import type { IDatePickerProps } from './interfaces/interfaces';
import 'v-calendar/style.css';

const props = withDefaults(defineProps<IDatePickerProps>(), {
  locale: 'ru-RU'
});

const state = reactive({
  isActive: false,
  startDate: null,
  masks: {
    input: 'MMMM DD, YYYY'
  }
});

const emits = defineEmits<{
  (e: 'clear'): void;
  (e: 'change', value: Date): void;
}>();

const toggle = (toggleFunc: () => void): void => {
  toggleFunc();
  if (!state.isActive) {
    state.isActive = true;
    return;
  }
  state.isActive = false;
};

const date = defineModel<Date | null>();

const clearChoose = (): void => {
  if (date.value) clearFunction(date.value);
  emits('clear');
};

const changeVal = (): void => {
  if (date.value) emits('change', date.value);
};

watch(
  () => date.value,
  () => changeVal()
);

watchEffect(() => (state.startDate = (props.startDate ?? null) as null));

const getDateStart = (): Date | null => {
  if (props.startDate && date.value) {
    const safeDate = date.value ?? new Date();
    const startSafeDate = state.startDate ?? new Date();
    if (
      Date.parse(startSafeDate.toLocaleString(props.locale)) >
      Date.parse(safeDate.toLocaleString(props.locale))
    )
      return state.startDate;
  }
  return null;
};
</script>

<style scoped></style>

<style>
.date-picker-yui-kit {
  --vc-font-family: 'Inter Variable', sans-serif;
  --vc-text-sm: 14px;
  --vc-rounded: 5px;
  --vc-header-title-color: var(--text-black);
  --vc-header-arrow-color: var(--black);
}
.vc-popover-content .vc-light {
  --vc-popover-content-bg: var(--white);
}

.date-picker-yui-kit .vc-attr {
  --vc-accent-600: var(--blue9);
}

.vc-popover-content {
  border: none;
  box-shadow: 0px 4px 9.8px 0px #0000000d;
}

.vc-nav-container {
  --vc-header-arrow-color: var(--black);
  --vc-nav-hover-bg: var(--blue1);
  --vc-day-popover-container-bg: var(--white);
  --vc-nav-item-active-bg: var(--blue9);
  --vc-nav-item-active-color: var(--text-blue);
  .vc-nav-item {
    --vc-nav-item-current-color: var(--text-black);
    box-shadow: none;
    font-weight: var(--vc-font-normal);
    border-radius: 16px;
    padding: 8px;
    &:hover {
      color: var(--white);
      background: var(--vc-nav-item-active-color);
    }
  }
  & .vc-nav-item:not(.is-active, :hover) {
    background: transparent;
  }
  & .vc-nav-item.is-active:not(:focus) {
    box-shadow: none;
  }
  & .vc-nav-arrow {
    background: transparent;
    &.vc-focus:is(:focus, :focus-within) {
      box-shadow: none;
      background: var(--blue10);
      color: var(--blue1);
    }
    & svg.vc-base-icon {
      stroke-width: 1.5px;
    }
  }
  & .vc-nav-title {
    background: transparent;
    font-size: var(--vc-text-sm);
    font-weight: var(--vc-font-normal);
  }
}

.vc-pane-container .vc-weeks {
  padding: 12px;
}

.date-picker-yui-kit .vc-day-content {
  --vc-highlight-solid-content-color: var(--text-blue);
  --vc-day-content-hover-bg: var(--blue1);
  &:hover {
    color: var(--white);
  }
}

.date-picker-yui-kit .vc-weekday {
  font-weight: var(--vc-font-normal);
}

.date-picker-yui-kit .vc-day-content {
  font-weight: var(--vc-font-normal);
}

.date-picker-yui-kit .vc-weekdays {
  color: var(--text-grey);
}

.date-picker-yui-kit.vc-container {
  border-radius: 12px;
}

.vc-popover-caret.direction-bottom.align-left {
  display: none;
}

.date-picker-yui-kit .vc-title {
  font-weight: var(--vc-font-bold);
  line-height: 15px;
  padding: 5px 7px;
  font-size: 14px;
  background: var(--blue15);
  &::after {
    content: url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%2010%206%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1%201L5%205L9%201%22%20stroke%3D%22%23757D8A%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E');
    display: inline-flex;
    margin-left: 7px;
    color: var(--grey6);
    align-items: center;
    height: 14px;
    width: 14px;
  }
  & span::first-letter {
    text-transform: uppercase;
  }
}

.date-picker-yui-kit__wrapper:has(.vc-nav-container) .vc-title::after {
  transform: rotate(180deg);
}

.vc-day.is-not-in-month * {
  color: var(--grey4);
  opacity: 1;
}

button.vc-nav-title {
  border-radius: var(--vc-rounded);
  &:hover {
    background: var(--blue15);
  }
  &:focus {
    background: var(--blue10);
    box-shadow: none;
  }
}

.date-picker-yui-kit .vc-arrow {
  background: transparent;
  --vc-header-arrow-hover-bg: var(--blue15);
  &.vc-focus:is(:focus, :focus-within) {
    box-shadow: none;
    background: var(--blue10);
    color: var(--blue1);
  }
  & svg.vc-base-icon {
    stroke-width: 1.5px;
  }
}
</style>
