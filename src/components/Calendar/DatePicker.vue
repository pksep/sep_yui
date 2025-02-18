<template>
  <DatePicker
    locale="ru"
    v-model="state.date"
    title-position="left"
    :masks="state.masks"
    :popover="{ visibility: 'click' }"
    :is-range="props.range"
    @popover-did-hide="state.isActive = false"
    borderless
    class="date-picker-yui-kit"
  >
    <template #default="{ inputValue, togglePopover }">
      <template v-if="props.range">
        <div
          :class="[
            'date-picker-yui-kit__header',
            { 'date-disable-yui-kit': props.disabled },
            { 'date-active-yui-kit': state.isActive }
          ]"
        >
          <DataPickerChoose
            @click="toggle(togglePopover)"
            @clear="state.date.start = ''"
            :is-active="inputValue.start && state.isActive"
            :value="inputValue.start"
          />
          --
          <DataPickerChoose
            @click="toggle(togglePopover)"
            @clear="state.date.end = ''"
            :is-active="inputValue.end && state.isActive"
            :value="inputValue.end"
          />
        </div>
      </template>
      <template v-else>
        <DataPickerChoose
          @click="toggle(togglePopover)"
          @clear="state.date = ''"
          :is-active="state.isActive"
          :value="inputValue"
          class="date-picker-yui-kit__header"
        />
      </template>
    </template>
  </DatePicker>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { DatePicker } from 'v-calendar';
import type { IDatePickerProps } from './interfaces/interfaces';
import DataPickerChoose from './DataPickerChoose.vue';
import 'v-calendar/style.css';

const props = defineProps<IDatePickerProps>();

const state = reactive({
  date: '',
  isActive: false,
  masks: {
    input: 'MMMM DD, YYYY'
  }
});

const getDate = (year?: number, month?: number, day?: number): Date | string =>
  new Date(year || null, month || null, day || null).toLocaleDateString(
    'ru-RU'
  );

const toggle = (toggleFunc: () => void): void => {
  toggleFunc();
  if (!state.isActive) {
    state.isActive = true;
    return;
  }
  state.isActive = false;
};

onMounted(() => {
  if (props.range) {
    state.date = {
      start: getDate(2020, 0, 1),
      end: getDate(2020, 0, 1)
    };
    return;
  }
  state.date = getDate();
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
  & .date-picker-yui-kit__header-btn {
    border: 0;
  }
  &:hover {
    border-color: var(--border-blue);
  }
  &.date-active-yui-kit {
    border-color: var(--border-blue);
  }
}

.date-disable-yui-kit {
  user-select: none;
  pointer-events: none;
  color: var(--grey4);
  background: var(--grey1);
}
</style>

<style>
.date-picker-yui-kit.vc-container {
  border-radius: 12px;
}

.vc-popover-caret.direction-bottom.align-left {
  display: none;
}
</style>
