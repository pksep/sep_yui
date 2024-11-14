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

const clearInput = (): void => {
  state.inputElement = '';
  inputRef.value?.focus();
};

const handleInput = (e: Event): void => {
  const target = e.currentTarget as HTMLInputElement;
  emits('input', target.value);
};

const handleFocus = (): void => {
  state.isPressed = true;
};

const handleBlur = (): void => {
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
fieldset.input-yui-kit .input-yui-kit__close {
  justify-self: end;
  &:hover {
    background-color: $TRANSPARENT;
  }
}
</style>
