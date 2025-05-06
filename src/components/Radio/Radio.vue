<template>
  <input
    v-model="inputModel"
    type="radio"
    :disabled
    :name
    :value="props.modelValue"
    class="radio"
    :data-testid="props.dataTestid"
  />
</template>

<script setup lang="ts">
import type { IRadioProps } from '@/components/Radio/interface/interface';

defineOptions({
  name: 'Radio'
});

const props = withDefaults(defineProps<IRadioProps>(), {
  disabled: false,
  dataTestid: 'Radio'
});

const inputModel = defineModel<HTMLInputElement>();
</script>

<style scoped lang="scss">
.radio {
  --radio-color: var(--blue1);
  --radio-disabled-color: var(--grey7);

  --radio-width: 18px;

  display: flex;
  gap: 15px;

  position: relative;
  appearance: none;

  width: var(--radio-width);
  height: var(--radio-width);

  border: 1px solid var(--radio-color);
  border-radius: 50%;

  background-color: var(--white);

  cursor: pointer;

  &::after {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: calc(var(--radio-width) * 0.384);
    height: calc(var(--radio-width) * 0.384);

    border-radius: 50%;

    background-color: var(--radio-color);

    opacity: 0;
    transition: all 0.2s ease;
  }

  &:checked {
    &::after {
      opacity: 1;
    }
  }

  &:disabled {
    --radio-color: var(--radio-disabled-color);
    cursor: default;
  }
}
</style>
