<template>
  <fieldset
    class="input-yui-kit"
    :class="{
      pressed: state.isPressed
    }"
    @focusout="handleBlur"
  >
    <legend v-if="props.inputMessage" class="input-yui-kit__legend">
      {{ props.inputMessage
      }}<sup class="input-yui-kit__star" v-if="props.required">*</sup>
    </legend>
    <input
      ref="inputRef"
      v-model="state.inputElement"
      @focus="handleFocus"
      @input="handleInput"
      :type="props.type"
      :autocomplete="props.autocomplete"
      class="input-yui-kit__input"
      :placeholder="props.placeholder"
      :required="props.required"
    />
    <Button
      :type="ButtonTypeEnum.ghost"
      class="input-yui-kit__close"
      @mousedown.prevent="clearInput"
      tabindex="-1"
      v-if="!props.hideClearButton && state.isPressed && state.inputElement"
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
  (e: 'update:modelValue', value: string): void;
}>();

const props = withDefaults(defineProps<IInputProps>(), {
  type: TextFieldEnum.text,
  required: false,
  inputMessage: '',
  modelValue: '',
  hideClearButton: false,
  modelModifiers: () => ({}) // not delete
});

const state = reactive({
  isPressed: false,
  inputElement: props.modelValue
});

const inputRef = ref<HTMLInputElement | null>(null);

const clearInput = (): void => {
  state.inputElement = '';
  inputRef.value?.focus();
  emits('update:modelValue', '');
};

const handleInput = (): void => {
  emits('update:modelValue', state.inputElement);
};

const handleFocus = (): void => {
  state.isPressed = true;
};

const handleBlur = (): void => {
  state.isPressed = false;
};

watch(
  () => props.modelValue,
  value => {
    state.inputElement = value;
  }
);

watch(
  () => state.inputElement,
  value => {
    if (props.modelValue != value) {
      state.isPressed = value?.length > 0;
      state.inputElement = value;
    }
  }
);
</script>

<style scoped>
input:is(:-webkit-autofill, :autofill) {
  background: transparent !important;
}

fieldset.input-yui-kit .input-yui-kit__input {
  width: calc(100% + 3px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

fieldset.input-yui-kit .input-yui-kit__close {
  position: absolute;
  right: 8px;
  min-height: 24px;
  padding: 0;
  &:hover {
    background-color: transparent;
  }
}
</style>
