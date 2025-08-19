<!--
In Vue 3, `slot` is used by WebComponents, conflicting with Vue 2's deprecated `slot` attribute.
-->
<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <div
    class="date-picker-yui-kit__wrapper"
    :data-testid="`${props.dataTestid}-Wrapper`"
  >
    <PopoverWrapper :open="state.isActive" @unmount-close="closePopover">
      <template #trigger>
        <DataPickerChoose
          @click="showPopover"
          @clear="clearChoose"
          :is-active="state.isActive"
          :is-small="props.isSmall"
          :is-range="props.isRange"
          :disabled="props.disabled"
          :data-testid="`${props.dataTestid}-Choose`"
          :value="formatDates((date as Date) || null, props.locale)"
        />
      </template>
      <col-cal
        v-if="!props.disabled"
        :date.prop="date"
        :minDate.prop="getDateStart()"
        :maxDate.prop="getDateEnd()"
        :locale="props.locale ?? 'ru-RU'"
        :data-testid="`${props.dataTestid}-Component`"
        @show-months="changeShowMonths"
        @show-years="changeShowYears"
        @hide-months="changeHideMonths"
        @hide-years="changeHideYears"
        @change-date="changeVal"
        class="date-picker-yui-kit"
      >
        <template v-for="name of Object.keys(state.isOpen)" :key="name">
          <Icon
            v-if="state.isOpen[name as 'months' | 'years']"
            :name="IconNameEnum.chevronUp"
            :width="16"
            :height="16"
            class="open-popup"
            :slot="`${name}-popup-icon`"
          />
          <Icon
            v-else
            :name="IconNameEnum.chevronDown"
            :width="16"
            :height="16"
            :slot="`${name}-popup-icon`"
          />
        </template>
        <Icon
          slot="icon-left-button"
          :name="IconNameEnum.chevronLeft"
          :width="16"
          :height="16"
        />
        <Icon
          slot="icon-right-button"
          :name="IconNameEnum.chevronRight"
          :width="16"
          :height="16"
        />
        <Icon
          slot="years-icon-left"
          :name="IconNameEnum.chevronLeft"
          :width="16"
          :height="16"
        />
        <Icon
          slot="years-icon-right"
          :name="IconNameEnum.chevronRight"
          :width="16"
          :height="16"
        />
      </col-cal>
    </PopoverWrapper>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, watchEffect } from 'vue';
import 'col-cal';
import DataPickerChoose from './DataPickerChoose.vue';
import PopoverWrapper from './PopoverWrapper.vue';

import type { IDatePickerProps } from './interfaces/interfaces';
import { formatDates } from './date-utils';
import Icon from '../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';

const props = withDefaults(defineProps<IDatePickerProps>(), {
  locale: 'ru-RU',
  dataTestid: 'DatePicker'
});

const state = reactive<{
  isActive: boolean;
  isOpen: {
    months: boolean;
    years: boolean;
  };
  isNotClear: boolean;
  startDate: null;
  endDate: null;
}>({
  isActive: false,
  isOpen: {
    months: false,
    years: false
  },
  isNotClear: true,
  startDate: null,
  endDate: null
});

const emits = defineEmits<{
  (e: 'clear'): void;
  (e: 'change', value: Date | null): void;
}>();

const date = defineModel<Date | null>();

const clearChoose = (): void => {
  state.isNotClear = false;
  date.value = null;
  emits('clear');
  setTimeout(() => (state.isNotClear = true), 1);
  changeVal({
    detail: {
      date: null
    }
  });
};

const changeVal = ({ detail }: { detail: { date: Date | null } }): void => {
  if (!detail) return;
  date.value = detail.date;
  state.isActive = false;
  emits('change', detail.date);
};

const changeShowMonths = (): void => {
  state.isOpen['months'] = true;
};

const changeShowYears = (): void => {
  state.isOpen['years'] = true;
};

const changeHideMonths = (): void => {
  state.isOpen['months'] = false;
};

const changeHideYears = (): void => {
  state.isOpen['years'] = false;
};

const closePopover = (): void => {
  state.isActive = false;
  changeHideMonths();
  changeHideYears();
};

watchEffect(() => (state.startDate = (props.startDate ?? null) as null));
watchEffect(() => (state.endDate = (props.endDate ?? null) as null));

const getDateStart = (): Date | null => {
  const startSafeDate = state.startDate ?? new Date();
  if (props.startDate) {
    const safeDate = date.value ?? new Date();
    if (startSafeDate.valueOf() <= safeDate.valueOf()) {
      return startSafeDate;
    } else if (startSafeDate != null) {
      return startSafeDate;
    }
  }
  return null;
};

const getDateEnd = (): Date | null => {
  const endSafeDate = state.endDate ?? new Date();
  if (props.endDate) {
    const safeDate = date.value ?? new Date();
    if (endSafeDate.valueOf() >= safeDate.valueOf()) {
      return endSafeDate;
    } else if (endSafeDate != null) {
      return endSafeDate;
    }
  }
  return null;
};

const showPopover = (): void => {
  state.isActive = true;
};

watch(
  () => date.value,
  () => {
    if (!date.value) {
      date.value = null;
      state.isNotClear = false;
      date.value = null;
      setTimeout(() => (state.isNotClear = true), 1);
    }
  }
);

defineExpose({
  clearChoose: clearChoose
});
</script>

<style>
col-cal-header button.popup {
  display: flex;
  gap: 8px;
  align-content: center;
  align-items: center;
  padding: 5px 7px;
  border-radius: 5px;
  &:hover {
    background-color: var(--blue15);
  }
  div[name='months-popup-icon'],
  div[name='years-popup-icon'] {
    display: grid;
    align-items: center;
  }
}

col-cal-header button.popup:has(.open-popup) {
  background-color: var(--blue9);
  color: var(--blue1);
}

col-cal-months::part(disabled),
col-cal-years::part(disabled) {
  color: var(--grey4);
}

col-cal-months::part(disabled):hover,
col-cal-years::part(disabled):hover {
  background-color: transparent;
}
</style>
