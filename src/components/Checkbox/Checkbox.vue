<template>
  <input
    type="checkbox"
    :class="`checkbox-yui-kit checkbox-yui-kit_${props.size} checkbox-yui-kit_${props.circular} checkbox-yui-kit_${props.color}`"
    :data-testid="`${props.dataTestid}`"
    tabindex="0"
    @change="onClick"
    :checked="state.isChecked"
    :disabled="props.disabled"
    @keyup.enter="onClick"
  />
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue';
import type { ICheckboxProps } from './interface/interface';
import {
  CheckboxSizeEnum,
  CheckboxCircularEnum,
  CheckboxColorEnum
} from './enum/enum';

const props = withDefaults(defineProps<ICheckboxProps>(), {
  size: CheckboxSizeEnum.medium,
  circular: CheckboxCircularEnum.rounded,
  modelValue: false,
  disabled: false,
  dataTestid: 'Checkbox',
  color: CheckboxColorEnum.blue
});

const emits = defineEmits<{
  (e: 'change', isChecked: boolean): void;
  (e: 'update:modelValue', value: boolean): void;
}>();

const state = reactive({
  isChecked: props.modelValue
});

watchEffect(() => {
  state.isChecked = props.modelValue;
});

const onClick = (): void => {
  state.isChecked = !state.isChecked;
  emits('change', state.isChecked);
  emits('update:modelValue', state.isChecked);
};
</script>

<style scoped>
.checkbox-yui-kit_medium {
  --radius: 3.5px;
  --size: 20px;
}

.checkbox-yui-kit_big {
  --radius: 4.5px;
  --size: 24px;
}

.checkbox-yui-kit_circled {
  --radius: 50%;
}

.checkbox-yui-kit,
.checkbox-yui-kit:focus,
.checkbox-yui-kit:focus-visible {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  outline: none;
  width: var(--size);
  height: var(--size);
  color: var(--surface-overlay);
  border-radius: var(--radius);
  cursor: pointer;
  padding: 2px;
  background-color: all 0.2s ease-in-out;

  &:disabled {
    border-color: var(--border-table);
    cursor: default;
  }
}

.checkbox-yui-kit_blue,
.checkbox-yui-kit_blue:focus,
.checkbox-yui-kit_blue:focus-visible {
  border: 2px solid var(--text-brand);

  &:checked {
    background: var(--text-brand);
  }
}

.checkbox-yui-kit_red,
.checkbox-yui-kit_red:focus,
.checkbox-yui-kit_red:focus-visible {
  border: 2px solid var(--status-error);

  &:checked {
    background: var(--status-error);
  }
}

.checkbox-yui-kit:checked {
  color: var(--surface-overlay);
  content: url('data:image/svg+xml,<svg viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.66667 0.666748L3 7.34008L1 5.34008" stroke="currentColor" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>');

  &:disabled {
    background: var(--border-table);
  }
}
.checkbox-yui-kit.checkbox-yui-kit_small {
  --radius: 3px;
  --size: 16px;
  padding: 0;
}
</style>
