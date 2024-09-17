<template>
  <fieldset class="input-yui-kit" :class="{ pressed: state.isPressed }">
    <legend class="input-yui-kit__legend">
      {{ props.inputMessage }}
      <span class="input-yui-kit__star" v-if="props.required">*</span>
    </legend>
    <input
      v-model="state.inputElement"
      @input="handleInput"
      @change="changeInput"
      @focus="handleInput"
      :type="props.inputType"
      class="input-yui-kit__input"
      :placeholder="props.placeholder"
      :required="props.required"
    />
    <Button
      type="ghost"
      class="input-yui-kit__close"
      @click="clearInput"
      v-if="state.isPressed"
    >
      <Icon :name="IconNameEnum.exitSmall" color="currentColor" />
    </Button>
  </fieldset>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue';
import type { IInputProps } from './interface/interface.ts';
import Icon from './../Icon/Icon.vue';
import Button from '../Button/Button.vue';
import { IconNameEnum } from '../Icon/enum/enum';

const props = withDefaults(defineProps<IInputProps>(), {
  type: 'text',
  required: false
});

const state = reactive({
  isPressed: false,
  inputElement: null
});

const clearInput = () => {
  state.inputElement = '';
  state.isPressed = false;
};

const handleInput = () => {
  state.isPressed = state.inputElement?.length > 0;
};

const changeInput = () => {
  state.isPressed = false;
};

watch(
  () => state.inputElement,
  value => {
    state.isPressed = value.length > 0;
  }
);
</script>

<style scoped lang="scss">
@mixin fieldset-border($color) {
  border: 1px solid $color;
  &:has(.input-yui-kit__input:focus-visible) {
    border: 1.5px solid $color;
    & .input-yui-kit__legend {
      color: $color;
      display: block;
    }
  }
  & .input-yui-kit__legend {
    color: $color;
    display: block;
  }
  &:hover,
  &.pressed {
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
  padding: 0 15px;
  border-radius: 5px;
  @include fieldset-border($BLUE-9CBEFF);
  border: none;
  & .input-yui-kit__legend {
    display: none;
    & .input-yui-kit__star {
      color: $RED-F42C2B;
    }
  }
  &.pressed {
    & .input-yui-kit__legend {
      display: block;
    }
  }
}

.input-yui-kit__close {
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
