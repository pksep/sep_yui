<template>
  <div
    class="date-picker-range-yui-kit__wrapper"
    :class="{ 'date-picker-range-yui-kit__wrapper_titled': props.title }"
  >
    <Badges
      v-if="props.title"
      class="date-picker-range-yui-kit__title"
      :text="props.title"
      :data-testid="`${props.dataTestid}-Title`"
      disabled
      @click.stop
    />

    <PopoverWrapper
      :open="!props.disabled && state.isActive"
      fit-viewport
      @unmount-close="closePopover"
    >
      <template #trigger>
        <div
          ref="trigger"
          v-bind="$attrs"
          :class="[
            'date-picker-yui-kit__header',
            { 'date-disable-yui-kit': props.disabled },
            { 'date-active-yui-kit': state.isActive }
          ]"
          :data-testid="`${props.dataTestid}-Header`"
          @click.self="showPopover(RangeTypeEnum.start)"
        >
          <DataPickerChoose
            :value="formatDates(state.date.start, props.locale)"
            :is-active="state.isActive"
            is-range
            :disabled="props.disabled"
            @click="showPopover(RangeTypeEnum.start)"
            @clear="clearDate(RangeTypeEnum.start)"
            :data-testid="`${props.dataTestid}-Component-Start-Choose`"
          />
          <div
            class="date-picker-yui-kit__header__dash"
            :data-testid="`${props.dataTestid}-Header-Dash`"
            @click="showPopover(RangeTypeEnum.start)"
          ></div>
          <DataPickerChoose
            :value="formatDates(state.date.end, props.locale)"
            :is-active="state.isActive"
            is-range
            :disabled="props.disabled"
            @click="showPopover(RangeTypeEnum.end)"
            @clear="clearDate(RangeTypeEnum.end)"
            :data-testid="`${props.dataTestid}-Component-End-Choose`"
          />
        </div>
      </template>

      <div
        ref="panel"
        class="date-picker-range-yui-kit__panel"
        role="dialog"
        :aria-label="props.title || labels.period"
        tabindex="-1"
        :data-testid="`${props.dataTestid}-Panel`"
        @keydown.esc.stop.prevent="closePopover(true)"
      >
        <div
          v-if="props.title"
          class="date-picker-range-yui-kit__panel-title"
          :data-testid="`${props.dataTestid}-Panel-Title`"
        >
          {{ props.title }}
        </div>
        <div class="date-picker-range-yui-kit__calendars">
          <div
            v-for="type in [RangeTypeEnum.start, RangeTypeEnum.end]"
            :key="type"
            class="date-picker-range-yui-kit__calendar"
            role="group"
            :aria-label="labels[type]"
          >
            <div class="date-picker-range-yui-kit__calendar-label">
              {{ labels[type] }}
            </div>
            <RangeCalendarPanel
              :date="draft[type]"
              :start-date="type === RangeTypeEnum.end ? draft.start : null"
              :end-date="type === RangeTypeEnum.start ? draft.end : null"
              :locale="props.locale"
              :data-testid="`${props.dataTestid}-Component-${type === RangeTypeEnum.start ? 'Start' : 'End'}-Component`"
              @change="value => (draft[type] = value)"
            />
          </div>
        </div>
        <div class="date-picker-range-yui-kit__actions">
          <Button
            :type="ButtonTypeEnum.ghost"
            :size="SizesEnum.little"
            :data-testid="`${props.dataTestid}-Cancel`"
            @click="closePopover(true)"
          >
            {{ labels.cancel }}
          </Button>
          <Button
            :type="ButtonTypeEnum.secondary"
            :size="SizesEnum.little"
            :data-testid="`${props.dataTestid}-Reset`"
            @click="resetDraft"
          >
            {{ labels.reset }}
          </Button>
          <Button
            :size="SizesEnum.little"
            :disabled="isInvalidRange"
            :data-testid="`${props.dataTestid}-Save`"
            @click="saveRange"
          >
            {{ labels.save }}
          </Button>
        </div>
      </div>
    </PopoverWrapper>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from 'vue';
import DataPickerChoose from './DataPickerChoose.vue';
import PopoverWrapper from './PopoverWrapper.vue';
import RangeCalendarPanel from './RangeCalendarPanel.vue';
import Badges from '../Badges/Badges.vue';
import Button from '../Button/Button.vue';
import { ButtonTypeEnum } from '../Button/enum/enum';
import { SizesEnum } from '@/common/sizes';
import type {
  IRangeForDatePickerState,
  IDatePickerProps,
  IRangeForDatePicker
} from './interfaces/interfaces';
import { RangeTypeEnum } from './enums/enums';
import { formatDates, getLastTime } from './date-utils';

// Внешние классы, стили и события по-прежнему относятся к полю диапазона.
defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<IDatePickerProps>(), {
  locale: 'ru-RU',
  dataTestid: 'DatePickerRange'
});

const emits = defineEmits<{
  (e: 'change', value: IRangeForDatePicker): void;
}>();

const state = reactive<IRangeForDatePickerState>({
  date: { start: null, end: null },
  isActive: false
});
const draft = reactive<IRangeForDatePicker>({ start: null, end: null });
const trigger = ref<HTMLElement | null>(null);
const panel = ref<HTMLElement | null>(null);
const activeType = ref(RangeTypeEnum.start);
const startDate = defineModel<Date | null>('startDate');
const endDate = defineModel<Date | null>('endDate');

const labels = computed(() =>
  props.locale.startsWith('ru')
    ? {
        period: 'Выбор периода',
        start: 'Начало периода',
        end: 'Конец периода',
        cancel: 'Отменить',
        reset: 'Сбросить',
        save: 'Сохранить'
      }
    : {
        period: 'Select period',
        start: 'Start date',
        end: 'End date',
        cancel: 'Cancel',
        reset: 'Reset',
        save: 'Save'
      }
);

const cloneDate = (date: Date | null | undefined): Date | null =>
  date ? new Date(date) : null;

const normalizeEndDate = (date: Date | null | undefined): Date | null => {
  const end = cloneDate(date);
  if (!end || !props.toLastTime) return end;

  const isLastTime =
    end.getUTCHours() === 23 &&
    end.getUTCMinutes() === 59 &&
    end.getUTCSeconds() === 59 &&
    end.getUTCMilliseconds() === 999;

  return isLastTime ? end : getLastTime(end);
};

const dayValue = (date: Date): number =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

const isInvalidRange = computed(
  () =>
    !!draft.start && !!draft.end && dayValue(draft.start) > dayValue(draft.end)
);

const syncDraft = (): void => {
  draft.start = cloneDate(state.date.start);
  draft.end = cloneDate(state.date.end);
};

const showPopover = async (type: RangeTypeEnum): Promise<void> => {
  if (props.disabled) return;
  activeType.value = type;
  if (state.isActive) return;
  syncDraft();
  state.isActive = true;
  await nextTick();
  panel.value?.focus({ preventScroll: true });
};

const closePopover = (restoreFocus = false): void => {
  state.isActive = false;
  syncDraft();
  if (restoreFocus) {
    const buttons = trigger.value?.querySelectorAll<HTMLButtonElement>(
      '.date-picker-yui-kit__header-btn'
    );
    buttons?.[activeType.value === RangeTypeEnum.start ? 0 : 1]?.focus();
  }
};

const commitRange = (range: IRangeForDatePicker): void => {
  state.date = {
    start: cloneDate(range.start),
    end: cloneDate(range.end)
  };
  startDate.value = cloneDate(state.date.start);
  endDate.value = cloneDate(state.date.end);
  emits('change', {
    start: cloneDate(state.date.start),
    end: cloneDate(state.date.end)
  });
};

const saveRange = (): void => {
  if (props.disabled || isInvalidRange.value) return;
  commitRange({
    start: draft.start,
    end: normalizeEndDate(draft.end)
  });
  closePopover(true);
};

const resetDraft = (): void => {
  draft.start = null;
  draft.end = null;
};

const clearDate = (type: RangeTypeEnum): void => {
  if (props.disabled) return;
  commitRange({ ...state.date, [type]: null });
  closePopover();
};

const handleClearAll = (): void => {
  state.date = { start: null, end: null };
  closePopover();
};

watch(
  [startDate, endDate],
  () => {
    state.date = {
      start: cloneDate(startDate.value),
      end: normalizeEndDate(endDate.value)
    };
    closePopover();
  },
  { immediate: true }
);

watch(
  () => props.disabled,
  disabled => {
    if (disabled) closePopover();
  }
);

defineExpose({ clear: handleClearAll });
</script>

<style scoped>
.date-picker-range-yui-kit__wrapper {
  display: contents;
}

.date-picker-range-yui-kit__wrapper_titled {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: max-content;
  gap: 2px;
}

.date-picker-range-yui-kit__wrapper_titled .date-picker-yui-kit__header {
  box-sizing: border-box;
  width: 100%;
  justify-content: space-between;
}

.date-picker-range-yui-kit__title {
  cursor: default;
}

.date-picker-yui-kit__header {
  border: 1px solid var(--border-table);
  background: var(--surface-overlay);
  display: flex;
  width: max-content;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 14px;
  color: var(--text-secondary);
  transition: all 0.2s ease;

  &:hover,
  &.date-active-yui-kit {
    border-color: var(--border-hover);
  }
}

:deep(.date-picker-yui-kit__header-btn) {
  border: 0;
}

.date-disable-yui-kit {
  user-select: none;
  pointer-events: none;
  color: var(--text-disabled);
  background: var(--action-disabled-bg);
  border: 1px solid var(--border-table);
  border-bottom-color: var(--text-disabled);
}

.date-picker-yui-kit__header__dash {
  border-bottom: 1px solid var(--text-secondary);
  border-radius: 68px;
  width: 10px;
}

.date-picker-range-yui-kit__panel {
  box-sizing: border-box;
  width: max-content;
  max-width: calc(100vw - 32px);
  max-height: calc(100dvh - 32px);
  overflow: auto;
  padding: 24px;
  border-radius: 10px;
  background: var(--surface-overlay);
  color: var(--text-primary);
}

.date-picker-range-yui-kit__panel:focus-visible {
  outline: 2px solid var(--border-hover);
  outline-offset: -2px;
}

.date-picker-range-yui-kit__panel-title {
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 1.4;
}

.date-picker-range-yui-kit__calendars {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: 24px;
}

.date-picker-range-yui-kit__calendar-label {
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 1.4;
}

.date-picker-range-yui-kit__calendar :deep(.calendar) {
  display: block;
  border: 1px solid var(--border-table);
}

.date-picker-range-yui-kit__calendar :deep(col-cal-dates)::part(day selected) {
  color: var(--text-brand);
  background-color: var(--action-secondary-bg);
}

.date-picker-range-yui-kit__actions {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
}

@media (max-width: 600px) {
  .date-picker-range-yui-kit__panel {
    padding: 16px;
  }

  .date-picker-range-yui-kit__calendars {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
