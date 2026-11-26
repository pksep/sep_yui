<template>
  <div
    class="date-time-picker-yui-kit__wrapper"
    :class="{ 'date-time-picker-yui-kit__wrapper_titled': props.title }"
    :data-testid="`${props.dataTestid}-Wrapper`"
  >
    <Badges
      v-if="props.title"
      class="date-time-picker-yui-kit__title"
      :text="props.title"
      :data-testid="`${props.dataTestid}-Title`"
      disabled
      @click.stop
    />
    <PopoverWrapper
      :open="isActive && !props.disabled"
      fit-viewport
      @unmount-close="closePopover"
    >
      <template #trigger>
        <div
          class="date-time-picker-yui-kit__header"
          :class="{
            'date-time-picker-yui-kit__header_active': isActive,
            'date-time-picker-yui-kit__header_disabled': props.disabled,
            'date-time-picker-yui-kit__header_small': props.isSmall
          }"
          :data-testid="`${props.dataTestid}-Header`"
        >
          <button
            ref="dateTrigger"
            type="button"
            :disabled="props.disabled"
            :aria-label="labels.date"
            aria-haspopup="dialog"
            :aria-expanded="isActive"
            :data-testid="`${props.dataTestid}-Choose-HeaderBtn-Trigger`"
            @click="showPopover('date')"
          >
            <Icon :name="IconNameEnum.calendar" />
            <span>{{ formattedDate || '-- -- ----' }}</span>
          </button>
          <button
            ref="timeTrigger"
            type="button"
            :disabled="props.disabled"
            :aria-label="labels.time"
            aria-haspopup="dialog"
            :aria-expanded="isActive"
            :data-testid="`${props.dataTestid}-Choose-Time-Trigger`"
            @click="showPopover('time')"
          >
            <Icon :name="IconNameEnum.time" />
            <span>{{ formattedTime || '-- --' }}</span>
          </button>
          <button
            v-if="parsedDate"
            type="button"
            :disabled="props.disabled"
            :aria-label="labels.clear"
            :data-testid="`${props.dataTestid}-Choose-Button-Clear`"
            @click.stop="clearDate"
          >
            <Icon :name="IconNameEnum.crossSmall" :width="16" :height="16" />
          </button>
        </div>
      </template>

      <div
        ref="panel"
        class="date-time-picker-yui-kit__panel"
        role="dialog"
        :aria-label="props.title || labels.period"
        tabindex="-1"
        :data-testid="`${props.dataTestid}-Panel`"
        @keydown.esc.stop.prevent="closePopover(true)"
      >
        <div v-if="props.title" class="date-time-picker-yui-kit__panel-title">
          {{ props.title }}
        </div>
        <div class="date-time-picker-yui-kit__editors">
          <div role="group" :aria-label="labels.date">
            <div class="date-time-picker-yui-kit__label">{{ labels.date }}</div>
            <CalendarPanel
              :date="draft"
              :start-date="props.startDate"
              :end-date="props.endDate"
              :locale="props.locale"
              :data-testid="`${props.dataTestid}-Component`"
              @change="handleCalendarChange"
            />
          </div>
          <div role="group" :aria-label="labels.time">
            <div class="date-time-picker-yui-kit__label">
              {{ labels.time }}
            </div>
            <div
              class="date-time-picker-yui-kit__time-editor"
              @keydown.enter="handleTimeEnter"
            >
              <TimePicker
                ref="timePicker"
                class="date-time-picker-yui-kit__time-picker"
                inline
                :model-value="draft"
                :locale="props.locale"
                @update:model-value="
                  value => (draft = value ? new Date(value) : null)
                "
              />
              <label class="date-time-picker-yui-kit__addition-field">
                <span class="date-time-picker-yui-kit__addition-input-label">
                  {{ labels.addTime }}
                </span>
                <InputNumber
                  :id="`${editorId}-additional-time`"
                  class="date-time-picker-yui-kit__addition-input"
                  input-message=""
                  :disabled="props.disabled"
                  :max="8760"
                  :min="-8760"
                  :model-value="addition.value"
                  :data-testid="`${props.dataTestid}-Additional-time`"
                  @update:model-value="updateAdditionalTime"
                />
              </label>
            </div>
          </div>
        </div>
        <div class="date-time-picker-yui-kit__actions">
          <Button
            class="date-time-picker-yui-kit__clock-switch"
            :type="ButtonTypeEnum.ghost"
            :size="SizesEnum.little"
            :aria-label="
              timePicker?.isClockOpen ? labels.keyboard : labels.clock
            "
            :aria-pressed="timePicker?.isClockOpen ?? false"
            :data-testid="`${props.dataTestid}-Clock-Switch`"
            @click.stop="timePicker?.toggleClock()"
          >
            <Icon
              :name="
                timePicker?.isClockOpen
                  ? IconNameEnum.keyboard
                  : IconNameEnum.time
              "
            />
          </Button>
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
            :disabled="isInvalidDate"
            :data-testid="`${props.dataTestid}-Save`"
            @click="saveDate"
          >
            {{ labels.save }}
          </Button>
        </div>
      </div>
    </PopoverWrapper>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref, useId, watch } from 'vue';
import Badges from '../Badges/Badges.vue';
import Button from '../Button/Button.vue';
import { ButtonTypeEnum } from '../Button/enum/enum';
import Icon from '../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import InputNumber from '../InputNumber/InputNumber.vue';
import TimePicker from '../TimePicker/TimePicker.vue';
import { SizesEnum } from '@/common/sizes';
import PopoverWrapper from './PopoverWrapper.vue';
import CalendarPanel from './RangeCalendarPanel.vue';
import { formatDates } from './date-utils';
import type {
  IDatePickerProps,
  IDateTimePickerAddition
} from './interfaces/interfaces';

const props = withDefaults(defineProps<IDatePickerProps>(), {
  locale: 'ru-RU',
  dataTestid: 'DatePicker'
});
const emits = defineEmits<{
  (e: 'change', value: Date | null): void;
}>();
const date = defineModel<Date | string | null>();
const isActive = ref(false);
const draft = ref<Date | null>(null);
const panel = ref<HTMLElement | null>(null);
const dateTrigger = ref<HTMLButtonElement | null>(null);
const timeTrigger = ref<HTMLButtonElement | null>(null);
const timePicker = ref<InstanceType<typeof TimePicker> | null>(null);
const activeTrigger = ref<'date' | 'time'>('date');
const editorId = useId();
const addition = reactive<IDateTimePickerAddition>({ value: 0 });

const parsedDate = computed(() => {
  if (!date.value) return null;
  const value = new Date(date.value);
  return Number.isNaN(value.getTime()) ? null : value;
});

const formattedDate = computed(() => {
  const [month, ...rest] = formatDates(parsedDate.value, props.locale).split(
    ' '
  );
  return month ? `${month.slice(0, 3)} ${rest.join(' ')}` : '';
});

const formattedTime = computed(() =>
  parsedDate.value
    ? `${String(parsedDate.value.getHours()).padStart(2, '0')}:${String(
        parsedDate.value.getMinutes()
      ).padStart(2, '0')}`
    : ''
);

const labels = computed(() =>
  props.locale.startsWith('ru')
    ? {
        period: 'Выбор даты и времени',
        date: 'Установка даты',
        time: 'Установка времени',
        addTime: 'Смещение времени в часах',
        clear: 'Очистить дату и время',
        clock: 'Показать циферблат',
        keyboard: 'Ввести время с клавиатуры',
        cancel: 'Отменить',
        reset: 'Сбросить',
        save: 'Сохранить'
      }
    : {
        period: 'Select date and time',
        date: 'Set date',
        time: 'Set time',
        addTime: 'Time offset in hours',
        clear: 'Clear date and time',
        clock: 'Show clock',
        keyboard: 'Enter time with keyboard',
        cancel: 'Cancel',
        reset: 'Reset',
        save: 'Save'
      }
);

// Прибавляем длительность к копии черновика только для проверки и сохранения.
const resultDate = computed<Date | null>(() => {
  if (!draft.value) return null;

  // Дробные часы округляем до целых минут: 1,50 часа = 90 минут.
  const additionalMinutes = Math.round(addition.value * 60);

  return new Date(draft.value.getTime() + additionalMinutes * 60000);
});

const dayValue = (value: Date): number =>
  new Date(value.getFullYear(), value.getMonth(), value.getDate()).getTime();

const isInvalidDate = computed(
  () =>
    !!resultDate.value &&
    ((!!props.startDate &&
      dayValue(resultDate.value) < dayValue(props.startDate)) ||
      (!!props.endDate && dayValue(resultDate.value) > dayValue(props.endDate)))
);

/** При смене выбранного дня начинает его с 08:00 вместо прежнего времени. */
const handleCalendarChange = (value: Date): void => {
  const selectedDate = new Date(value);

  // Первый выбор и повторный клик по тому же дню сохраняют прежнее поведение.
  if (draft.value && dayValue(draft.value) !== dayValue(selectedDate)) {
    selectedDate.setHours(8, 0, 0, 0);
  }

  // Меняем только черновик: прибавки применяются при подтверждении.
  draft.value = selectedDate;
};

/** Хранит дробные часы отдельно от выбранной исходной даты. */
const updateAdditionalTime = (value: number | string): void => {
  const amount = Number(String(value).replace(',', '.'));

  // Оба направления используют прежний годовой предел поля часов.
  if (
    props.disabled ||
    !Number.isFinite(amount) ||
    amount < -8760 ||
    amount > 8760
  )
    return;

  addition.value = amount;
};

/** Сбрасывает черновик и прибавки без изменения сохранённого значения. */
const resetDraft = (): void => {
  draft.value = null;

  // Следующее открытие начинается без прибавки к уже сохранённому результату.
  addition.value = 0;
};

/** Открывает черновик и один раз подставляет переданную прибавку часов. */
const showPopover = async (type: 'date' | 'time'): Promise<void> => {
  if (props.disabled) return;
  activeTrigger.value = type;
  if (!isActive.value) {
    draft.value = parsedDate.value ? new Date(parsedDate.value) : null;
    const initialHours = props.initialAdditionalHours;

    // Повторный клик по открытому календарю не перезаписывает введённую длительность.
    if (
      typeof initialHours === 'number' &&
      Number.isFinite(initialHours) &&
      initialHours >= -8760 &&
      initialHours <= 8760
    ) {
      addition.value = initialHours;
    }

    isActive.value = true;
  }
  await nextTick();
  if (type === 'time') {
    panel.value
      ?.querySelector<HTMLInputElement>('.time-picker__input_hour input')
      ?.focus();
  } else {
    panel.value?.focus({ preventScroll: true });
  }
};

const closePopover = (restoreFocus = false): void => {
  isActive.value = false;
  resetDraft();
  if (restoreFocus) {
    (activeTrigger.value === 'date' ? dateTrigger : timeTrigger).value?.focus();
  }
};

const commitDate = (value: Date | null): void => {
  date.value = value ? new Date(value) : null;
  emits('change', value ? new Date(value) : null);
};

const saveDate = (): void => {
  if (props.disabled || isInvalidDate.value) return;
  commitDate(resultDate.value);
  closePopover(true);
};

/** Подтверждает выбранное время и прибавку дробных часов по Enter из инпута. */
const handleTimeEnter = (event: KeyboardEvent): void => {
  // Кнопки, удержание Enter и подтверждение IME не запускают сохранение.
  if (
    !(event.target instanceof HTMLInputElement) ||
    event.isComposing ||
    event.repeat
  )
    return;

  event.preventDefault();
  event.stopPropagation();
  saveDate();
};

const clearDate = (): void => {
  if (props.disabled) return;
  commitDate(null);
  closePopover(true);
};

watch(
  () => date.value,
  () => closePopover()
);
watch(
  () => props.disabled,
  disabled => {
    if (disabled) closePopover();
  }
);
</script>

<style scoped>
.date-time-picker-yui-kit__wrapper_titled {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: max-content;
  gap: 2px;
}

.date-time-picker-yui-kit__title {
  cursor: default;
}

.date-time-picker-yui-kit__header {
  display: flex;
  align-items: center;
  width: max-content;
  padding: 5px;
  border: 1px solid var(--border-table);
  border-radius: 10px;
  background: var(--surface-overlay);
  color: var(--text-secondary);
}

.date-time-picker-yui-kit__wrapper_titled .date-time-picker-yui-kit__header {
  width: 100%;
}

.date-time-picker-yui-kit__header button {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: inherit;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
}

.date-time-picker-yui-kit__header button:hover:not(:disabled) {
  background: var(--surface-input-secondary);
}

.date-time-picker-yui-kit__header_small {
  padding: 2px;
}

.date-time-picker-yui-kit__header_active {
  border-color: var(--border-hover);
  color: var(--text-brand);
}

.date-time-picker-yui-kit__header_disabled {
  background: var(--action-disabled-bg);
  color: var(--text-disabled);
}

.date-time-picker-yui-kit__header_disabled button {
  cursor: default;
}

.date-time-picker-yui-kit__panel {
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

.date-time-picker-yui-kit__panel:focus-visible {
  outline: 2px solid var(--border-hover);
  outline-offset: -2px;
}

.date-time-picker-yui-kit__panel-title {
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 1.4;
}

.date-time-picker-yui-kit__editors {
  display: grid;
  grid-template-columns: auto minmax(263px, 1fr);
  align-items: start;
  gap: 24px;
}

.date-time-picker-yui-kit__label {
  display: flex;
  align-items: center;
  min-height: 32px;
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 1.4;
}

.date-time-picker-yui-kit__time-editor {
  display: grid;
  justify-items: start;
  align-content: start;
}

/* Числа, прибавки и циферблат располагаются в одном редакторе по вертикали. */
.date-time-picker-yui-kit__time-picker,
.date-time-picker-yui-kit__time-picker :deep(.time-picker-dialog),
.date-time-picker-yui-kit__time-picker :deep(.time-picker-dialog-content) {
  display: contents;
}

.date-time-picker-yui-kit__time-picker :deep(.time-picker-header) {
  grid-row: 1;
  margin: 0;
}

.date-time-picker-yui-kit__time-picker :deep(.time-picker-clock) {
  grid-row: 3;
}

/* Подпись прибавки сохраняет доступное имя единственного поля. */
.date-time-picker-yui-kit__addition-input-label {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
}

.date-time-picker-yui-kit__addition-field {
  display: block;
  grid-row: 2;
  width: 263px;
  max-width: 100%;
  margin-top: 16px;
}

.date-time-picker-yui-kit__panel .date-time-picker-yui-kit__addition-input {
  box-sizing: border-box;
  grid-template-columns: minmax(0, 1fr) min-content;
  width: 100%;
  min-width: 0;
  height: 80px;
  margin: 0;
  background: var(--surface-input-secondary);
}

.date-time-picker-yui-kit__addition-input :deep(input) {
  width: 100%;
  min-width: 0;
  height: 100%;
  padding: 10px 6px;
  font-size: 55px;
  font-weight: 400;
  line-height: 1;
}

/* Размер каждой стрелки соответствует увеличенному полю смещения. */
.date-time-picker-yui-kit__panel
  .date-time-picker-yui-kit__addition-input
  :deep(.input-yui-kit__buttons button) {
  width: 30px;
  height: 20px;
}

.date-time-picker-yui-kit__panel :deep(.calendar) {
  display: block;
  border: 1px solid var(--border-table);
}

.date-time-picker-yui-kit__panel :deep(col-cal-dates)::part(day selected) {
  color: var(--text-brand);
  background: var(--action-secondary-bg);
}

.date-time-picker-yui-kit__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
}

.date-time-picker-yui-kit__clock-switch {
  margin-right: auto;
  color: var(--text-secondary);
}

@media (max-width: 600px) {
  .date-time-picker-yui-kit__panel {
    padding: 16px;
  }

  .date-time-picker-yui-kit__editors {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
