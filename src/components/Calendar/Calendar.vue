<template>
  <DatePickerRange
    v-if="props.range || (props.range.start && props.range.end)"
    v-model:start-date="state.date.start"
    v-model:end-date="state.date.end"
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
  date: getDate()
});

const emits = defineEmits<{
  (e: 'change'): void;
  (e: 'click'): void;
}>();

onMounted(() => {
  if (props.range.start || props.range.end) {
    state.date = {
      start: props.fromTodayTime ? getDate() : props.range.start,
      end: props.range.end
    };
  } else if (props.setDate) {
    state.date = props.setDate;
  } else if (props.range) {
    state.date = {
      start: getDate(),
      end: getDate()
    };
  }
});
</script>
