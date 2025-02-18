<template>
  <DatePicker
    locale="ru"
    v-model="state.date"
    title-position="left"
    :masks="state.masks"
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
        class="date-picker-yui-kit__header"
      />
    </template>
  </DatePicker>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { DatePicker } from 'v-calendar';
import DataPickerChoose from './DataPickerChoose.vue';
import type { IDatePickerProps } from './interfaces/interfaces';
import { getDate } from './date-utils.ts';
import 'v-calendar/style.css';

const props = defineProps<IDatePickerProps>();

const state = reactive({
  date: getDate(),
  isActive: false,
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

const clearChoose = (): void => {
  state.date = '';
  emits('clear');
};
</script>

<style>
.date-picker-yui-kit.vc-container {
  border-radius: 12px;
}

.vc-popover-caret.direction-bottom.align-left {
  display: none;
}
</style>
