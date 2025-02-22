<template>
  <DatePickerRange
    v-if="props.isRange"
    v-model:start-date="state.dateObject.start"
    v-model:end-date="state.dateObject.end"
    :disabled="props.disabled"
    :locale="props.locale"
    @click="emits('click')"
    @change="changeValues"
  />
  <DatePicker
    v-model="state.date"
    :disabled="props.disabled"
    :locale="props.locale"
    :is-table="props.isTable"
    v-else
    @click="emits('click')"
    @change="changeValues"
  />
</template>

<script setup lang="ts">
import { reactive, watchEffect, watch, onMounted } from 'vue';

import DatePickerRange from './DatePickerRange.vue';
import DatePicker from './DatePicker.vue';
import { getDate } from './date-utils.ts';

import type {
  IDatePickerProps,
  IRangeForDatePicker
} from './interfaces/interfaces';

const props = defineProps<IDatePickerProps>();

const state = reactive({
  date: null as Date | null,
  dateObject: {
    start: null,
    end: null
  } as IRangeForDatePicker
});

const emits = defineEmits<{
  (e: 'change', value: Date | IRangeForDatePicker): void;
  (e: 'click'): void;
}>();

const changeValues = (val: Date | IRangeForDatePicker): void => {
  emits('change', val);
};

watchEffect(() => (state.date = (props.setDate ?? null) as unknown as null));

const fillDateObject = (): IRangeForDatePicker => ({
  start: props.fromTodayTime
    ? (getDate() as Date)
    : (props.range?.start ?? null),
  end: props.range?.end ?? null
});

watch(
  () => props.range,
  () => {
    if (props.isRange) {
      state.dateObject = fillDateObject();
    }
  }
);

onMounted(() => {
  if (props.isRange) {
    state.dateObject = fillDateObject();
    return;
  }
  if (props.setDate) {
    state.date = (props.setDate ?? null) as unknown as null;
  }
});
</script>
