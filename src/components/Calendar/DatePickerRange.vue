<template>
  <div
    :class="[
      'date-picker-yui-kit__header',
      { 'date-disable-yui-kit': props.disabled },
      { 'date-active-yui-kit': state.isActive }
    ]"
  >
    <DataPicker v-model="state.date.start" @clear="state.date.start = ''" />
    --
    <DataPicker v-model="state.date.end" @clear="state.date.end = ''" />
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import DataPicker from './DatePicker.vue';
import type { IDatePickerProps } from './interfaces/interfaces';
import { getDate } from './date-utils.ts';

const props = defineProps<IDatePickerProps>();

const state = reactive({
  isActive: false,
  date: {
    start: getDate(),
    end: getDate()
  }
});
</script>
<style scoped>
.date-picker-yui-kit__header {
  border: 1px solid var(--border-grey);
  background: var(--white);
  display: flex;
  width: max-content;
  align-items: center;
  align-content: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 14px;
  color: var(--grey6);
  & .date-picker-yui-kit__header-btn {
    border: 0;
  }
  &:hover {
    border-color: var(--border-blue);
  }
  &.date-active-yui-kit {
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
