<template>
  <DatePickerRange
    ref="datePickerRangeRef"
    v-if="props.isRange"
    v-model:start-date="state.dateObject.start"
    v-model:end-date="state.dateObject.end"
    :disabled="props.disabled"
    :locale="props.locale"
    @click="emits('click')"
    @change="changeValues"
    :data-testid="`${props.dataTestid}-DataPickerRange`"
  />
  <DatePicker
    v-model="state.date"
    :disabled="props.disabled"
    :locale="props.locale"
    :is-small="props.isSmall"
    :data-testid="`${props.dataTestid}-DataPicker`"
    v-else
    @click="emits('click')"
    @change="changeValues"
  />
</template>

<script setup lang="ts">
import { reactive, watchEffect, watch, onMounted, ref } from 'vue';
import { getUTCLastDateTimeMoscow } from './date-utils';

import DatePickerRange from './DatePickerRange.vue';
import DatePicker from './DatePicker.vue';

import type {
  IDatePickerProps,
  IRangeForDatePicker
} from './interfaces/interfaces';

const props = withDefaults(defineProps<IDatePickerProps>(), {
  dataTestid: 'Calendar'
});

const state = reactive({
  date: null as Date | null,
  dateObject: {
    start: null,
    end: null
  } as IRangeForDatePicker
});

const emits = defineEmits<{
  (e: 'change', value: Date | IRangeForDatePicker | null): void;
  (e: 'click'): void;
}>();

const datePickerRangeRef = ref<typeof DatePickerRange>();

const changeValues = (val: Date | IRangeForDatePicker | null): void => {
  emits('change', val);
};

watchEffect(() => (state.date = props.setDate || null));

const fillDateObject = (): IRangeForDatePicker => ({
  start: props.fromTodayTime
    ? new Date(Date.now())
    : (props.range?.start ?? null),
  end: props.lastDate ? getUTCLastDateTimeMoscow() : (props.range?.end ?? null)
});

watch(
  () => props.range,
  () => {
    if (props.isRange) {
      state.dateObject = fillDateObject();
    }

    if (!props.range) {
      datePickerRangeRef.value?.clear();
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
