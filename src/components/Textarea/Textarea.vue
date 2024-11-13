<template>
  <fieldset class="textarea-yui-kit" :class="{ pressed: state.isPressed }">
    <legend class="textarea-yui-kit__legend">
      {{ props.title
      }}<sup class="textarea-yui-kit__star" v-if="props.required">*</sup>
    </legend>
    <textarea
      @input="e => handleInput(e)"
      class="textarea-yui-kit__textarea"
      :placeholder="props.placeholder"
      :required="props.required"
      :maxlength="props.maxlength"
      :value="props.value || null"
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
  const target = (e.target as HTMLTextAreaElement) || null;
  state.inputElement = target?.value;
  state.isPressed = state.inputElement?.length > 0;
  emits('input', target?.value);
};
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
    pointer-events: none;
  }

  &.initial::before,
  &.disabled::before,
  &.ordinary::before {
    border-color: $TRANSPARENT;
  }

  &:has(.textarea-yui-kit__textarea:focus-visible)::before {
    border-width: 1.5px;
    border-color: $color;
  }

  &.pressed::before,
  &:hover::before {
    border-width: 1.5px;
    border-color: $color;
  }

  & .textarea-yui-kit__legend {
    color: $color;
  }

  & .textarea-yui-kit__close {
    color: $color;
  }

  fieldset.textarea-yui-kit:hover &,
  fieldset.textarea-yui-kit:has(.textarea-yui-kit__textarea:focus-visible) & {
    border: 1.5px solid $color;
  }
}

fieldset.textarea-yui-kit {
  --background: var(--white);
  position: relative;
  display: grid;
  align-items: center;
  border-radius: 5px;
  padding: 10px 5px 10px 15px;
  box-sizing: border-box;
  background: var(--background);
  column-gap: 4px;
  @include fieldset-border($BLUE-9CBEFF);
  & .textarea-yui-kit__legend {
    position: absolute;
    bottom: 97px;
    left: 19px;
    background: var(--background);
    display: none;
    font-size: 13px;
    font-weight: 600;
    padding: 0 4px;
    & .textarea-yui-kit__star {
      font-size: 11px;
      font-weight: 600;
      color: #da1414;
    }
  }

  &:has(.textarea-yui-kit__textarea:focus-visible) .textarea-yui-kit__legend,
  &.success .textarea-yui-kit__legend,
  &.error .textarea-yui-kit__legend,
  &.warning .textarea-yui-kit__legend {
    display: inline-block;
    color: $BLUE-9CBEFF;
  }
}

textarea.textarea-yui-kit__textarea {
  padding-right: 15px;
  width: inherit;
  min-height: 80px;
  margin-bottom: 5px;
  background: var(--background);
  appearance: none;
  resize: none;
  border: none;
  outline: none;
  font-size: 16px;

  &::placeholder {
    font-size: 16px;
  }

  &:focus::placeholder {
    color: transparent;
  }
}

fieldset.textarea-yui-kit:disabled {
  background-color: $WHITE-F5F5F5;

  & textarea.textarea-yui-kit__textarea {
    background-color: $WHITE-F5F5F5;
    color: $GREY-A6A3AD;
  }

  &:hover::before {
    border-color: transparent;
  }

  & .textarea-yui-kit__legend {
    display: none;
  }
}

fieldset.textarea-yui-kit.success {
  @include fieldset-border($GREEN-0FBE3F);
}

fieldset.textarea-yui-kit.error {
  @include fieldset-border(var(--red6));
}

fieldset.textarea-yui-kit.warning {
  @include fieldset-border(var(--orange6));
}

fieldset.textarea-yui-kit.ordinary .textarea-yui-kit__legend {
  --display: none;
}
fieldset.textarea-yui-kit.ordinary:has(
    .textarea-yui-kit__textarea:focus-visible
  ) {
  & .textarea-yui-kit__legend {
    --display: none;
  }
}
</style>
