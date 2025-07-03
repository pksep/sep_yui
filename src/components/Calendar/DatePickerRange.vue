<template>
  <div
    :class="[
      'date-picker-yui-kit__header',
      { 'date-disable-yui-kit': props.disabled },
      { 'date-active-yui-kit': state.isActive }
    ]"
    :data-testid="`${props.dataTestid}-Header`"
  >
    <DataPicker
      v-model="state.date.start"
      :locale="props.locale"
      is-range
      :disabled="props.disabled"
      :end-date="state.date?.end"
      @change="val => changeValue(val, RangeTypeEnum.start)"
      @clear="clearFunction(RangeTypeEnum.start)"
      :data-testid="`${props.dataTestid}-Component-Start`"
    />
    <div
      class="date-picker-yui-kit__header__dash"
      :data-testid="`${props.dataTestid}-Header-Dash`"
    ></div>
    <DataPicker
      v-model="state.date.end"
      :locale="props.locale"
      is-range
      :disabled="props.disabled"
      :start-date="state.date?.start"
      @change="val => changeValue(val, RangeTypeEnum.end)"
      @clear="clearFunction(RangeTypeEnum.end)"
      :data-testid="`${props.dataTestid}-Component-End`"
    />
  </div>
</template>
<script setup lang="ts">
import { reactive, watch, onMounted } from 'vue';
import DataPicker from './DatePicker.vue';
import {
  IRangeForDatePickerState,
  type IDatePickerProps,
  type IRangeForDatePicker
} from './interfaces/interfaces';
import { RangeTypeEnum } from './enums/enums';
import { getLastTime } from './date-utils';

const props = withDefaults(defineProps<IDatePickerProps>(), {
  locale: 'ru-RU',
  dataTestid: 'DatePickerRange'
});

const emits = defineEmits<{
  (e: 'change', value: IRangeForDatePicker): void;
}>();

const state = reactive<IRangeForDatePickerState>({
  date: {
    start: null,
    end: null
  },
  isActive: false
});

const startDate = defineModel<Date | null>('startDate');
const endDate = defineModel<Date | null>('endDate');

const changeValue = (val: Date | null, item: RangeTypeEnum): void => {
  if (item === RangeTypeEnum.start) {
    state.date[item] = val;
  }

  if (item === RangeTypeEnum.end) {
    state.date[item] =
      props.toLastTime && val !== null ? getLastTime(val) : val;
  }

  emits('change', state.date);
};

const clearFunction = (type: RangeTypeEnum): void => {
  state.date[type] = null;
};

const handleClearAll = (): void => {
  Object.keys(state.date).forEach(key => {
    state.date[key as RangeTypeEnum] = null;
  });
};

const checkDateValue = (): void => {
  if (startDate.value || endDate.value) {
    state.date = {
      start: startDate.value as Date,
      end: props.toLastTime
        ? getLastTime(endDate.value as Date)
        : (endDate.value as Date)
    };
  }
};

watch([() => startDate.value, () => endDate.value], () => {
  checkDateValue();
});

onMounted(() => {
  checkDateValue();
});

defineExpose({
  clear: handleClearAll
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
