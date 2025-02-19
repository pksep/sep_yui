<template>
  <DatePicker
    :locale="props.locale || 'ru'"
    title-position="left"
    v-model="date"
    :masks="state.masks"
    :popover="{ visibility: 'click' }"
    @popover-did-hide="state.isActive = false"
    borderless
    class="date-picker-yui-kit"
  >
    <template #default="{ inputValue, togglePopover }">
      <!-- {{ inputValue }} -->
      <DataPickerChoose
        @click="toggle(togglePopover)"
        @clear="clearChoose"
        :is-active="state.isActive"
        :value="inputValue"
        :disabled="props.disabled"
      />
    </template>
  </DatePicker>
</template>

<script setup lang="ts">
import { reactive, watchEffect, onMounted } from 'vue';
import { DatePicker } from 'v-calendar';
import DataPickerChoose from './DataPickerChoose.vue';
import type { IDatePickerProps } from './interfaces/interfaces';
import 'v-calendar/style.css';

const props = defineProps<IDatePickerProps>();

const state = reactive({
  isActive: false,
  date: undefined as string | undefined,
  masks: {
    input: 'MMMM DD, YYYY'
  }
});

const emits = defineEmits<{
  (e: 'clear'): void;
}>();

const toggle = (toggleFunc: () => void): void => {
  toggleFunc();
  if (!state.isActive) {
    state.isActive = true;
    return;
  }
  state.isActive = false;
};

const date = defineModel<string>();

const clearChoose = (): void => {
  // date.value = '';
  emits('clear');
};

watchEffect(() => {
  // state.date = date.value;
  // console.log('date.value', date.value);
});

onMounted(() => {
  state.date = date.value;
});
</script>

<style scoped></style>

<style>
.date-picker-yui-kit.vc-container {
  border-radius: 12px;
}

.vc-popover-caret.direction-bottom.align-left {
  display: none;
}
</style>
