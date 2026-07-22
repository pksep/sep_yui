<template>
  <label
    :class="`label-checkbox checkbox-yui-kit_${props.size} checkbox-yui-kit_${props.circular} checkbox-yui-kit_${props.color}`"
  >
    <input
      type="checkbox"
      :class="`checkbox-yui-kit `"
      :data-testid="`${props.dataTestid}`"
      tabindex="0"
      @change="onClick"
      :checked="state.isChecked"
      :disabled="props.disabled"
      @keyup.enter="onClick"
    />

    <Icon class="checkbox__icon" :name="IconNameEnum.checked" />
  </label>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue';
import type { ICheckboxProps } from './interface/interface';
import {
  CheckboxSizeEnum,
  CheckboxCircularEnum,
  CheckboxColorEnum
} from './enum/enum';
import Icon from '@/components/Icon/Icon.vue';
import { IconNameEnum } from '@/components/Icon/enum/enum';

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
.label-checkbox {
  position: relative;
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 2.5px;
  transition: all 0.2s ease;
}

.checkbox-yui-kit {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.label-checkbox .checkbox__icon {
  position: absolute;
  top: 50%;
  left: 50%;

  width: 16px;
  height: 16px;

  transform: translate(-50%, -50%);
  z-index: 1;

  opacity: 0;

  color: var(--surface-overlay);

  transition: all 0.2s ease;
}

.label-checkbox:has(.checkbox-yui-kit:checked) .checkbox__icon {
  opacity: 1;
}

.checkbox-yui-kit_small {
  border-radius: 2.5px;
  width: 16px;
  height: 16px;

  padding: 0;
}

.checkbox-yui-kit_medium {
  border-radius: 3.5px;
  width: 20px;
  height: 20px;
}

.checkbox-yui-kit_medium .checkbox__icon {
  width: 20px;
  height: 20px;
}

.checkbox-yui-kit_big {
  border-radius: 4.5px;
  width: 24px;
  height: 24px;
}

.checkbox-yui-kit_circled {
  border-radius: 50%;
}

.checkbox-yui-kit,
.checkbox-yui-kit:focus,
.checkbox-yui-kit:focus-visible {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  outline: none;

  color: var(--surface-overlay);
  cursor: pointer;
  padding: 2px;
  background-color: all 0.2s ease-in-out;

  &:disabled {
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

.label-checkbox.checkbox-yui-kit_blue:has(.checkbox-yui-kit:checked) {
  background: var(--text-brand);
}

.checkbox-yui-kit_red,
.checkbox-yui-kit_red:focus,
.checkbox-yui-kit_red:focus-visible {
  border: 2px solid var(--status-error);

  &:checked {
    background: var(--status-error);
  }
}

.label-checkbox.checkbox-yui-kit_red:has(.checkbox-yui-kit:checked) {
  background: var(--status-error);
}

.checkbox-yui-kit:checked {
  color: var(--surface-overlay);

  &:disabled {
    background: var(--border-table);
  }
}

.label-checkbox:has(.checkbox-yui-kit:checked:disabled) {
  background: var(--border-table);
}

.label-checkbox:has(.checkbox-yui-kit:disabled) {
  border-color: var(--border-table);
  cursor: default;
}
</style>
