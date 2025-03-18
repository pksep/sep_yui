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
      :locale="props.locale"
      is-range
      :disabled="props.disabled"
      :end-date="state.date?.end"
      @change="val => changeValue(val, RangeTypeEnum.start)"
      @clear="clearFunction(RangeTypeEnum.start)"
    />
    <div class="date-picker-yui-kit__header__dash"></div>
    <DataPicker
      v-model="state.date.end"
      :locale="props.locale"
      is-range
      :disabled="props.disabled"
      :start-date="state.date?.start"
      @change="val => changeValue(val, RangeTypeEnum.end)"
      @clear="clearFunction(RangeTypeEnum.end)"
    />
  </div>
</template>
<script setup lang="ts">
import { reactive, watch, onMounted } from 'vue';
import DataPicker from './DatePicker.vue';
import type {
  IDatePickerProps,
  IRangeForDatePicker
} from './interfaces/interfaces';
import { RangeTypeEnum } from './enums/enums';

const props = withDefaults(defineProps<IDatePickerProps>(), {
  locale: 'ru-RU'
});

const emits = defineEmits<{
  (e: 'change', value: IRangeForDatePicker): void;
}>();

const state = reactive({
  date: {
    start: null as Date | null,
    end: null as Date | null
  },
  isActive: false
});

const startDate = defineModel('startDate');
const endDate = defineModel('endDate');

const changeValue = (val: Date | null, item: RangeTypeEnum): void => {
  state.date[item] = val as Date;
  emits('change', state.date);
};

const clearFunction = (type: RangeTypeEnum): void => {
  state.date[type] = null;
  emits('change', state.date);
};

const handleClearAll = (): void => {
  Object.values(state.date).fill(null);
};

watch([startDate, endDate], () => {
  if (startDate.value || endDate.value) {
    state.date = {
      start: startDate.value as Date,
      end: endDate.value as Date
    };
  }
});

onMounted(() => {
  if (startDate.value || endDate.value) {
    state.date = {
      start: startDate.value as Date,
      end: endDate.value as Date
    };
  }
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
