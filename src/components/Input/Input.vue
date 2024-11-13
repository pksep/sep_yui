<template>
  <fieldset
    class="input-yui-kit"
    :class="{
      pressed: state.isPressed
    }"
    @focusout="handleBlur"
  >
    <legend class="input-yui-kit__legend">
      {{ props.inputMessage
      }}<sup class="input-yui-kit__star" v-if="props.required">*</sup>
    </legend>
    <input
      ref="inputRef"
      v-model="state.inputElement"
      @focus="handleFocus"
      @input="handleInput"
      :type="props.type"
      class="input-yui-kit__input"
      :placeholder="props.placeholder"
      :required="props.required"
      input-message=""
    />
    <Button
      :type="ButtonTypeEnum.ghost"
      class="input-yui-kit__close"
      @mousedown.prevent="clearInput"
      v-if="state.isPressed"
    >
      <Icon :name="IconNameEnum.exitSmall" color="currentColor" />
    </Button>
  </fieldset>
</template>

<script setup lang="ts">
import { watch, reactive, ref } from 'vue';
import type { IInputProps } from './interface/interface.ts';
import Icon from './../Icon/Icon.vue';
import Button from '../Button/Button.vue';
import { ButtonTypeEnum } from '../Button/enum/enum';
import { TextFieldEnum } from '../Input/enum/enum';
import { IconNameEnum } from '../Icon/enum/enum';

const emits = defineEmits<{
  (e: 'input', value: string): void;
}>();

const props = withDefaults(defineProps<IInputProps>(), {
  type: TextFieldEnum.text,
  required: false
});

const state = reactive({
  isPressed: false,
  inputElement: ''
});

const inputRef = ref<HTMLInputElement | null>(null);

const clearInput = () => {
  state.inputElement = '';
  inputRef.value?.focus();
};

const handleInput = (e: Event) => {
  const target = e.currentTarget as HTMLInputElement;
  emits('input', target.value);
};

const handleFocus = () => {
  state.isPressed = state.inputElement?.length > 0;
};

const handleBlur = () => {
  state.isPressed = false;
};

watch(
  () => state.inputElement,
  value => {
    state.isPressed = value?.length > 0;
  }
);
</script>

<style lang="scss" scoped>
@mixin fieldset-border($color) {
  border: none;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid $color;
    border-radius: 5px;
    transition: border 0.2s ease;
    pointer-events: none;
  }

  &:has(.input-yui-kit__input:focus-visible)::before {
    border-width: 1.5px;
    border-color: $color;
  }

  &.pressed::before,
  &:hover::before {
    border-width: 1.5px;
  }

  & .input-yui-kit__legend {
    color: $color;
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
  grid-template-columns: 1fr min-content;
  padding: 0 4px 0 15px;
  border-radius: 5px;
  height: 44px;
  column-gap: 4px;
  @include fieldset-border($BLUE-9CBEFF);
  & .input-yui-kit__legend {
    position: absolute;
    bottom: 35px;
    left: 19px;
    background: var(--background);
    display: none;
    font-size: 13px;
    font-weight: 600;
    padding-inline: 4px;

    & .input-yui-kit__star {
      font-family: $STAR-FONT;
      font-size: 11px;
      font-weight: 600;
      vertical-align: 2px;
      color: var(--red6);
    }
  }

  &.pressed .input-yui-kit__legend {
    display: block;
  }

  & .input-yui-kit__close {
    padding-inline: 0;
    justify-self: end;
  }
}

input.input-yui-kit__input {
  box-sizing: border-box;
  font-size: 16px;
  line-height: 19px;
  border-color: $TRANSPARENT;
  width: inherit;
  outline: none;
  &:focus::placeholder {
    color: $TRANSPARENT;
  }
}

fieldset.input-yui-kit:disabled {
  background-color: $WHITE-F5F5F5;
  & input.input-yui-kit__input {
    background-color: $WHITE-F5F5F5;
    color: $GREY-A6A3AD;
  }

  &:hover::before {
    border-color: transparent;
  }

  & .input-yui-kit__legend {
    display: none;
  }
}

fieldset.input-yui-kit.success {
  @include fieldset-border($GREEN-0FBE3F);
}

fieldset.input-yui-kit.error {
  @include fieldset-border(var(--red6));
}

fieldset.input-yui-kit.warning {
  @include fieldset-border(var(--orange6));
}

fieldset.input-yui-kit.ordinary .input-yui-kit__legend {
  --display: none;
}

fieldset.input-yui-kit__ordinary:has(.input-yui-kit__input:focus-visible) {
  & .input-yui-kit__legend {
    --display: none;
  }
}
</style>
