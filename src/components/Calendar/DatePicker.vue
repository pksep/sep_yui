<template>
  <DatePicker
    :locale="props.locale || 'ru'"
    title-position="left"
    v-model="date"
    :masks="state.masks"
    :popover="{ visibility: 'click' }"
    :min-date="getDateStart()"
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
import { reactive, watchEffect } from 'vue';
import { DatePicker } from 'v-calendar';
import DataPickerChoose from './DataPickerChoose.vue';

import type { IDatePickerProps } from './interfaces/interfaces';
import 'v-calendar/style.css';

const props = withDefaults(defineProps<IDatePickerProps>(), {
  locale: 'ru-RU'
});

const state = reactive({
  isActive: false,
  startDate: new Date() as string | Date,
  masks: {
    input: 'MMMM DD, YYYY'
  }
});

const emits = defineEmits<{
  (e: 'clear'): void;
}>();

const toggle = (toggleFunc: () => void): void => {
  toggleFunc();
  if (!state.isActive) {
    state.isActive = true;
    return;
  }
  state.isActive = false;
};

const date = defineModel<Date | string>();

const clearChoose = (): void => {
  date.value = '';
  emits('clear');
};

watchEffect(() => props.startDate && (state.startDate = props.startDate));

const getDateStart = (): Date | string | false => {
  if (state.startDate && date.value) {
    const safeDate = date.value ?? new Date();
    return (
      Date.parse(state.startDate.toLocaleString(props.locale)) >
        Date.parse(safeDate.toLocaleString(props.locale)) && state.startDate
    );
  }
  return false;
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
