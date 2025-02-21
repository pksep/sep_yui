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

const getDateStart = (): Date | string | undefined => {
  if (props.startDate && date.value) {
    const safeDate = date.value ?? new Date();
    const startSafeDate = state.startDate ?? new Date();
    if (
      Date.parse(startSafeDate.toLocaleString(props.locale)) >
      Date.parse(safeDate.toLocaleString(props.locale))
    )
      return;
    state.startDate;
  }
  return undefined;
};
</script>

<style scoped></style>

<style>
.date-picker-yui-kit.vc-container {
  border-radius: 12px;
}

.vc-popover-caret.direction-bottom.align-left {
  display: none;
}
</style>
