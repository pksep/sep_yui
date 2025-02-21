<template>
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

.date-picker-yui-kit .vc-attr {
  --vc-accent-600: var(--blue9);

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
  & span::first-letter {
    text-transform: uppercase;
  }
}
.date-picker-yui-kit .vc-arrow {
  background: transparent;
  --vc-header-arrow-hover-bg: var(--blue15);
  &.vc-focus:focus-within {
    box-shadow: none;
    background: var(--blue10);
    color: var(--blue1);
   }
  & svg {
    stroke-width: 1.5px;
  }
}
</style>
