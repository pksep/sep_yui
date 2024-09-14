<template>
  <fieldset class="input-yui-kit">
    <legend class="input-yui-kit__legend">{{ props.inputMessage }}</legend>
    <input :type="props.inputType" class="input-yui-kit__input" :placeholder="props.placeholder" />
    <Button type="ghost" class="input-yui-kit__close" > <Icon :name="IconNameEnum.exitSmall" color="currentColor" /> </Button>
  </fieldset>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import type { IInputProps } from './interface/interface.ts';
import Icon from './../Icon/Icon.vue';
import Button from "../Button/Button.vue"
import { IconNameEnum } from '../Icon/enum/enum';

const props = withDefaults(defineProps<IInputProps>(), {
  inputType: 'text'
});
</script>

<style scoped lang="scss">

@mixin fieldset-border($color) {
  border: 1px solid $color;
  & .input-yui-kit__legend {
    color: $color;
    display: block;
  }
  &:hover, &:focus-visible, &.pressed {
      border: 1.5px solid $color;
  }
  .input-yui-kit__close {
    color: $color;
  }
}

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
    @include fieldset-border($BLUE-9CBEFF);
  }
}

.input-yui-kit__close {
  display: none;
  margin-bottom: 5px;
  justify-self: end;
}

input.input-yui-kit__input {
  background-color: $WHITE;
  height: 44px;
  margin-bottom: 5px;
  font-size: 16px;
  border: none;
  outline: none;
}

fieldset.input-yui-kit:disabled {
  background-color: $WHITE-F5F5F5;
  & input.input-yui-kit__input {
    background-color: $WHITE-F5F5F5;
    color: $GREY-A6A3AD;
  }
  &:hover {
    border: none;
    & .input-yui-kit__legend {
      display: none;
    }
  }
}

fieldset.input-yui-kit.success {
  @include fieldset-border($GREEN-0FBE3F);
}

fieldset.input-yui-kit.error {
  @include fieldset-border($RED-F42C2B);
}

fieldset.input-yui-kit.warning {
  @include fieldset-border($YELLOW-F79400);
}
</style>
