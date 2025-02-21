<template>
  <div
    :class="[
      'date-picker-yui-kit__header',
      { 'date-disable-yui-kit': props.disabled },
      { 'date-active-yui-kit': state.isActive }
    ]"
  >
    <DataPicker
      v-model="state.date.start"
      @clear="clearFunction(state.date.start)"
    />
    <div class="date-picker-yui-kit__header__dash"></div>
    <DataPicker
      v-model="state.date.end"
      @clear="clearFunction(state.date.end)"
      :start-date="state.date?.start"
    />
  </div>
</template>
<script setup lang="ts">
import { reactive, watch, onMounted } from 'vue';
import DataPicker from './DatePicker.vue';
import { clearFunction } from './date-utils';
import type { IDatePickerProps } from './interfaces/interfaces';

const props = withDefaults(defineProps<IDatePickerProps>(), {
  locale: 'ru-RU'
});

const state = reactive({
  date: {
    start: new Date(),
    end: new Date()
  },
  isActive: false
});

const startDate = defineModel('startDate');
const endDate = defineModel('endDate');

watch([startDate, endDate], () => {
  if (startDate.value && endDate.value) {
    console.log(typeof startDate.value);
    state.date = {
      start: startDate.value as Date,
      end: endDate.value as Date
    };
  }
});

onMounted(() => {
  if (startDate.value && endDate.value) {
    state.date = {
      start: startDate.value as Date,
      end: endDate.value as Date
    };
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
  &:hover {
    border-color: var(--border-blue);
  }
  &.date-active-yui-kit {
    border-color: var(--border-blue);
  }
}

:deep(.date-picker-yui-kit__header-btn) {
  border: 0;
}

.date-disable-yui-kit {
  user-select: none;
  pointer-events: none;
  color: var(--grey4);
  background: var(--grey1);
}

.date-picker-yui-kit__header__dash {
  border-bottom: 1px solid var(--grey6);
  border-radius: 68px;
  width: 10px;
}
</style>
