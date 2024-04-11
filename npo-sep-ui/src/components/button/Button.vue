<template>
  <button
    class="button"
    :class="[props.size, props.color]"
    :disabled="props.disabled"
  >
    <slot name="left-icon" />
    <slot />
    <slot name="right-icon" />
  </button>
</template>

<script lang="ts" setup>
import { IProps } from './interface';
// import { PropType } from 'vue';

// interface IProps {
//   disabled: {
//     type: Boolean,
//     default: false
//   }
//   size: {
//     type: String as PropType<'small' | 'medium' | 'large'>,
//     default: 'medium'
//   }
//   color: {
//     type: String as PropType<'primary' | 'secondary'>,
//     default: 'primary'
//   }
// }

const props = withDefaults(defineProps<IProps>(), {
  disabled: false,
  size: 'medium',
  color: 'primary'
});
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
