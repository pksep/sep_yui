<template>
  <DatePickerRange
    v-if="props.isRange"
    v-model:start-date="state.dateObject.start"
    v-model:end-date="state.dateObject.end"
    :disabled="props.disabled"
    :locale="props.locale"
    @click="emits('click')"
    @change="emits('change')"
  />
  <DatePicker
    v-model="state.date"
    :disabled="props.disabled"
    :locale="props.locale"
    v-else
    @click="emits('click')"
    @change="emits('change')"
  />
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';

import DatePickerRange from './DatePickerRange.vue';
import DatePicker from './DatePicker.vue';
import { getDate } from './date-utils.ts';

import type { IDatePickerProps } from './interfaces/interfaces';

const props = defineProps<IDatePickerProps>();

const state = reactive({
  date: null as Date | null,
  dateObject: {
    start: null as Date | null,
    end: null as Date | null
  }
});

const emits = defineEmits<{
  (e: 'change'): void;
  (e: 'click'): void;
}>();

onMounted(() => {
  if (props.isRange) {
    state.dateObject = {
      start: getDate() as Date,
      end: null
    };
  }
  if (props.range?.start || props.range?.end) {
    state.dateObject = {
      start: props.range?.start as Date,
      end: props.range?.end as Date
    };
  } else if (props.setDate) {
    state.date = (props.setDate ?? null) as unknown as null;
  }
});
</script>
