<template>
  <fieldset class="input-yui-kit">
    <legend class="input-yui-kit__legend">{{ props.inputMessage }}</legend>
    <input class="input-yui-kit__input" :placeholder="props.placeholder" />
  </fieldset>
</template>

<script setup lang="ts">
import type { IInputProps } from './interface/interface.ts';

const props = withDefaults(defineProps<IInputProps>(), {});
</script>

<style scoped lang="scss">
fieldset.input-yui-kit {
  border: none;
  padding: 0 15px;
  & .input-yui-kit__legend {
    display: none;
    border-radius: 5px;
  }
  &:hover,
  &:focus-visible,
  &.pressed {
    border: 1px solid $BLUE-9CBEFF;
    color: $BLUE-9CBEFF;
    & .input-yui-kit__legend {
      display: block;
      border-radius: 5px;
    }
  }
}

input.input-yui-kit__input {
  background-color: $WHITE;
  height: 44px;
  font-size: 16px;
  border: none;
  outline: none;
}

input.input-yui-kit:disabled {
  background-color: $WHITE-F5F5F5;
}

input.input-yui-kit.success {
  border: 1px soild $GREEN-0FBE3F;
}

input.input-yui-kit.error {
  border: 1px soild $RED-F42C2B;
}

input.input-yui-kit.warning {
  border: 1px soild $YELLOW-F79400;
}
</style>
