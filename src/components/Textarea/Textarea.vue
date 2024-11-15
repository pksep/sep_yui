<template>
  <fieldset
    class="input-yui-kit"
    :class="{ pressed: state.isPressed }"
    @focusout="handleBlur"
  >
    <legend class="input-yui-kit__legend">
      {{ props.inputMessage
      }}<sup class="input-yui-kit__star" v-if="props.required">*</sup>
    </legend>
    <textarea
      @input="e => handleInput(e)"
      class="input-yui-kit__input"
      :placeholder="props.placeholder"
      @focus="handleFocus"
      :required="props.required"
      :maxlength="props.maxlength"
    />
  </fieldset>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { ITextareaProps } from './interface/interface';

const props = withDefaults(defineProps<ITextareaProps>(), {
  required: false
});

const state = reactive({
  isPressed: false,
  inputElement: ''
});

const emits = defineEmits<{
  (e: 'input', value: string): void;
}>();

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
</script>

<style lang="scss" scoped>
fieldset.input-yui-kit {
  height: auto;
  padding-block: 10px;
}
textarea {
  resize: none;
  height: 96px;
}
</style>
