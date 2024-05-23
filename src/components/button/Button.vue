<template>
  <button
    :class="classes"
    :disabled="props.disabled"
    :style="style"
    @click="onClick"
  >
    <slot name="left-icon" />
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { SizesEnum } from '../../common/sizes';
import { IButtonProps } from './interface';
import { ButtonType } from './enum';

const props = withDefaults(defineProps<IButtonProps>(), {
  disabled: false,
  size: SizesEnum.medium,
  type: ButtonType.outline
});

const emit = defineEmits<{
  (e: 'click', id: number): void;
}>();

const classes = computed(() => ({
  button: true,
  [props.size]: true,
  primary: true,
  default: props.type === ButtonType.default,
  outline: props.type === ButtonType.outline,
  ghost: props.type === ButtonType.ghost
}));

const style = computed(() => ({
  backgroundColor: props.backgroundColor
}));

const onClick = () => emit('click', 1);
</script>

<style>
.button {
  color: #ffffff;
  outline: none;
  border: none;
  padding: 0 16px;
}

.small {
  height: 32px;
  border-radius: 8px;
}

.medium {
  height: 36px;
  border-radius: 10px;
}

.large {
  height: 400px;
  border-radius: 12px;
}

.primary {
  background: #535bf2;
}

.secondary {
  background: #a7a7a7;
}
</style>
