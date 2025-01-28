<template>
  <fieldset
    class="input-yui-kit"
    :class="{ pressed: state.isPressed, readonly: props.readonly }"
    @focusout="handleBlur"
  >
    <legend class="input-yui-kit__legend">
      {{ props.inputMessage }}
      <sup class="input-yui-kit__star" v-if="props.required">*</sup>
    </legend>
    <textarea
      v-model="state.inputElement"
      @focus="handleFocus"
      @input="handleInput"
      class="input-yui-kit__input"
      :placeholder="props.placeholder"
      :required="props.required"
      :maxlength="props.maxlength"
      :readonly="props.readonly"
    />
  </fieldset>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { ITextareaProps } from './interface/interface';

const props = withDefaults(defineProps<ITextareaProps>(), {
  required: false,
  modelValue: '',
  readonly: false
});

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const state = reactive({
  isPressed: false,
  inputElement: props.modelValue
});

const handleInput = (): void => {
  emits('update:modelValue', state.inputElement);
};

const handleFocus = (): void => {
  if (!props.readonly) {
    state.isPressed = true;
  }
};

const handleBlur = (): void => {
  state.isPressed = false;
};

watch(
  () => props.modelValue,
  newValue => {
    state.inputElement = newValue;
  }
);
</script>

<style lang="scss" scoped>
fieldset.input-yui-kit {
  height: auto;
  padding-block: 10px;
  margin-inline: 0;
}
textarea {
  resize: none;
  height: 96px;
}

fieldset.input-yui-kit.readonly::before,
fieldset.input-yui-kit.readonly:hover::before {
  border: none;
}
</style>
