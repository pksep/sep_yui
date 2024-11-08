<template>
  <input
    type="checkbox"
    :class="`checkbox-yui-kit checkbox-yui-kit_${props.size} checkbox-yui-kit_${props.circular}`"
    @change="onClick"
    :checked="state.isChecked"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { ICheckboxProps } from './interface/interface';
import { CheckboxSizeEnum, CheckboxCircularEnum } from './enum/enum';

const props = withDefaults(defineProps<ICheckboxProps>(), {
  size: CheckboxSizeEnum.medium,
  circular: CheckboxCircularEnum.rounded
});

const emits = defineEmits<{
  (e: 'change', isChecked: boolean): void;
}>();

const state = reactive({
  isChecked: false
});

const onClick = (): void => {
  state.isChecked = !state.isChecked;
  emits('change', state.isChecked);
};
</script>

<style lang="scss" scoped>
.checkbox-yui-kit_rounded {
  --radius: 2px;
}

.checkbox-yui-kit_circled {
  --radius: 50%;
}

.checkbox-yui-kit_small {
  --size: 16px;
}

.checkbox-yui-kit_medium {
  --size: 18px;
}

.checkbox-yui-kit_big {
  --size: 24px;
}

.checkbox-yui-kit {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  outline: none;
  content: url('data:image/svg+xml,<svg viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.66667 0.666748L3 7.34008L1 5.34008" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  width: var(--size);
  height: var(--size);
  color: var(--white);
  background: var(--white);
  border: var(--radius) solid var(--blue1);
  border-radius: 2px;
}

.checkbox-yui-kit:checked {
  color: var(--white);
  background: var(--blue1);
}
</style>
