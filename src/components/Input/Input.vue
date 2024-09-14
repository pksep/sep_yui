<template>
  <fieldset class="input-yui-kit">
    <legend class="input-yui-kit__legend">{{ props.inputMessage }}</legend>
    <input class="input-yui-kit__input" :placeholder="props.placeholder" />
    <Button type="ghost" class="input-yui-kit__close" > <Icon :name="IconNameEnum.exitSmall" /> </Button>
  </fieldset>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import type { IInputProps } from './interface/interface.ts';
import Icon from './../Icon/Icon.vue';
import Button from "../Button/Button.vue"
import { IconNameEnum } from '../Icon/enum/enum';

const props = withDefaults(defineProps<IInputProps>(), {});

</script>

<style scoped lang="scss">
fieldset.input-yui-kit {
  display: grid;
  align-items: center;
  grid-template-columns: 0.9fr 0.1fr;
  border: none;
  padding: 0 15px;
  border-radius: 5px;
  & .input-yui-kit__legend {
    display: none;
  }
  &:hover,
  &:focus-visible,
  &.pressed {
    border: 1px solid $BLUE-9CBEFF;
    color: $BLUE-9CBEFF;
    & .input-yui-kit__legend {
      display: block;
    }
  }
}

.input-yui-kit__close {
  display: none;
  margin-bottom: 5px;
  justify-self: end;
}

input.input-yui-kit__input {
  background-color: $WHITE;
  height: 24px;
  margin-bottom: 5px;
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
