<template>
  <div
    class="data-picker-choose"
    :class="{
      'data-picker-choose_time': props.isTimeSelect
    }"
  >
    <button
      @click="handleClick"
      :class="[
        'date-picker-yui-kit__header-btn',
        { 'date-picker-yui-kit__header-btn_table-view': props.isSmall },
        { 'date-picker-yui-kit__header-btn_range-view': props.isRange },
        { 'date-disable-yui-kit': props.disabled },
        { 'date-active-yui-kit': state.isActive }
      ]"
      :data-testid="`${props.dataTestid}-HeaderBtn-Trigger`"
    >
      <Icon
        :name="IconNameEnum.calendar"
        :data-testid="`${props.dataTestid}-Icon`"
      />
      <span
        v-if="state.value"
        :data-testid="`${props.dataTestid}-Value-Display`"
      >
        {{ formatLetter(state.value) }}
      </span>
      <span
        class="date-picker-yui-kit__header-btn__dash"
        v-else
        :data-testid="`${props.dataTestid}-HeaderBtnDash-Placeholder`"
      >
        {{ state.defaultValue }}
      </span>
      <Button
        :size="SizesEnum.small"
        :type="ButtonTypeEnum.ghost"
        :disabled="props.disabled"
        v-if="state.value && !props.isTimeSelect"
        @click.stop="handleClear"
        class="date-picker-close-yui-kit"
        :data-testid="`${props.dataTestid}-Button-Clear`"
      >
        <Icon
          :name="IconNameEnum.crossSmall"
          :data-testid="`${props.dataTestid}-ButtonClose-Icon`"
        />
      </Button>
    </button>

    <TimePicker
      v-if="props.isTimeSelect"
      :disabled="props.disabled"
      class="data-picker-choose__time-picker"
      v-model="date"
      @update:model-value="handleChangeTime"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue';
import Button from '../Button/Button.vue';
import Icon from '../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import { ButtonTypeEnum } from '../Button/enum/enum';
import { SizesEnum } from '@/common/sizes';
import type { IDatePickerChooserProps } from './interfaces/interfaces';
import TimePicker from '@/components/TimePicker/TimePicker.vue';

const props = withDefaults(defineProps<IDatePickerChooserProps>(), {
  dataTestid: 'DatePickerChoose'
});

const state = reactive({
  defaultValue: '-- -- ----',
  value: '',
  isActive: false
});

const emits = defineEmits<{
  (e: 'clear'): void;
  (e: 'click'): void;
  (e: 'change', value: string | Date | null | undefined): void;
}>();

const date = defineModel<string | null | Date>();

watchEffect(() => (state.isActive = props.isActive));

watchEffect(() => (state.value = props.value));

const handleChangeTime = (value: string | null): void => {
  emits('change', value);
};

const handleClear = (): void => {
  emits('clear');
};

const handleClick = (): void => {
  emits('click');
};

const formatLetter = (str: string): string | null => {
  if (!str) return null;
  const commaIndex = str.indexOf(' ');
  const endIndex = commaIndex === -1 ? 3 : Math.min(commaIndex, 3);
  return `${str.charAt(0).toUpperCase()}${str.slice(1, endIndex)}${str.slice(commaIndex)}`;
};
</script>

<style scoped>
.date-picker-yui-kit__header-btn {
  display: flex;
  align-items: center;
  align-content: center;
  background: var(--background, var(--surface-overlay));
  width: max-content;
  gap: 5px;
  padding: var(--header-padding, 10px);
  border-radius: 5px;
  font-size: 14px;
  color: var(--color, var(--text-secondary));
  border: 1px solid var(--border, var(--border-table));

  transition: all 0\.2s ease;
  &:hover {
    cursor: pointer;
    background: var(--surface-input-secondary);
  }
  &.date-active-yui-kit {
    --background: var(--action-secondary-pressed-bg);
    --color: var(--text-brand);
    --border: var(--active-border, var(--border-table));
  }
  &:nth-child(2) {
    padding-left: 10px;
  }
}

.date-picker-yui-kit__header-btn_table-view {
  --header-padding: 4px 10px;
}

.date-picker-yui-kit__header-btn_range-view {
  --header-padding: 5px;
}

.date-disable-yui-kit {
  user-select: none;
  pointer-events: none;
  --color: var(--text-disabled);
  --background: var(--action-disabled-bg);
  --border: var(--disable-border, var(--border-table));
  & button.disabled-yui-kit {
    color: var(--text-light-color);
    background: transparent;
  }
}

.date-picker-yui-kit__header-btn__dash {
  color: var(--text-secondary);
  font-weight: 400;
}

.date-picker-close-yui-kit {
  padding: 0;
  min-height: auto;
}

.data-picker-choose_time {
  display: flex;

  align-items: center;
  gap: 7px;

  background: var(--surface-overlay);
  border-radius: 10px;
  border: 1px solid var(--border, var(--border-table));
  padding: 5px;
}

.data-picker-choose_time .data-picker-choose__time-picker {
  padding: 0;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  height: auto;
}

.data-picker-choose_time .date-picker-yui-kit__header-btn {
  --header-padding: 5px;
}

.data-picker-choose_time
  :is(.date-picker-yui-kit__header-btn, .data-picker-choose__time-picker) {
  --border: transparent;
}
</style>
