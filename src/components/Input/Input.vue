<template>
  <fieldset class="input-yui-kit" :class="{ pressed: state.isPressed }">
    <legend class="input-yui-kit__legend">
      {{ props.inputMessage
      }}<sup class="input-yui-kit__star" v-if="props.required">*</sup>
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

const emits = defineEmits<{
  (e: 'input', value: string): void;
}>();

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

const handleInput = (val: string) => {
  state.isPressed = state.inputElement?.length > 0;
  emits('input', val);
};

const changeInput = () => {
  // TODO: bug after seconds not disable state
  setTimeout(() => (state.isPressed = false), 150);
};

watch(
  () => state.inputElement,
  value => {
    state.isPressed = value.length > 0;
  }
);
</script>

<style lang="scss" scoped>
@mixin fieldset-border($color) {
  border: 1px solid $color;
  &:has(.input-yui-kit__input:focus-visible) {
    border: 1.5px solid $color;
    & .input-yui-kit__legend {
      color: $color;
      display: inline-block;
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
  & .input-yui-kit__close {
    color: $color;
  }
}

fieldset.input-yui-kit {
  --background: var(--white);
  display: grid;
  align-items: center;
  background-color: var(--background);
  grid-template-columns: 1fr 0.01fr;
  padding: 0 15px;
  padding-right: 7px;
  border-radius: 5px;
  @include fieldset-border($BLUE-9CBEFF);
  border: none;
  column-gap: 4px;
  & .input-yui-kit__legend {
    position: absolute;
    top: 3px;
    left: 15px;
    background: var(--background);
    display: none;
    font-size: 13px;
    font-weight: 600;
    padding-left: 4px;
    padding-right: 9px;
    & .input-yui-kit__star {
      font-size: 11px;
      font-weight: 600;
      color: $RED-F42C2B;
    }
  }
  &.pressed {
    & .input-yui-kit__legend {
      display: block;
    }
  }
  & .input-yui-kit__close {
    margin-bottom: 5px;
    justify-self: end;
  }
}

input.input-yui-kit__input {
  height: 44px;
  margin-bottom: 5px;
  font-size: 16px;
  border: none;
  width: inherit;
  outline: none;
  &:focus::placeholder {
    color: transparent;
  }
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
