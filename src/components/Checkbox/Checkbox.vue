<template>
  <input
    type="checkbox"
    :class="`checkbox-yui-kit checkbox-yui-kit_${props.size} checkbox-yui-kit_${props.circular}`"
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
import { CheckboxSizeEnum, CheckboxCircularEnum } from './enum/enum';

const props = withDefaults(defineProps<ICheckboxProps>(), {
  size: CheckboxSizeEnum.medium,
  circular: CheckboxCircularEnum.rounded,
  modelValue: false,
  disabled: false
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
  color: var(--white);
  border: 2px solid var(--blue1);
  border-radius: var(--radius);
  cursor: pointer;
  padding: 2px;

  &:disabled {
    border-color: var(--border-grey);
    cursor: default;
  }
}

.checkbox-yui-kit:checked {
  color: var(--white);
  background: var(--blue1);
  content: url('data:image/svg+xml,<svg viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.66667 0.666748L3 7.34008L1 5.34008" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>');

  &:disabled {
    background: var(--border-grey);
  }
}
.checkbox-yui-kit.checkbox-yui-kit_small {
  --radius: 3px;
  --size: 16px;
  padding: 0;
}
</style>
