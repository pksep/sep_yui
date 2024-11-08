<template>
  <fieldset class="textarea-yui-kit" :class="{ pressed: state.isPressed }">
    <legend class="textarea-yui-kit__legend">
      {{ props.title }}
      <sup class="textarea-yui-kit__star" v-if="props.required">*</sup>
    </legend>
    <Scroll
      :style="{ width: '100%', height: '90px' }"
      :railStyle="{
        y: {
          right: '0px'
        }
      }"
    >
      <textarea
        @input="e => handleInput(e)"
        class="textarea-yui-kit__textarea"
        :placeholder="props.placeholder"
        :required="props.required"
        :maxlength="props.maxlength"
        :value="props.value || null"
      />
    </Scroll>
  </fieldset>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { ITextareaProps } from './interface/interface';
import Scroll from '../Scrollbar/Scrollbar.vue';

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
  target.style.height = 'auto';
  target.style.height = `${target.scrollHeight}px`;
};
</script>

<style lang="scss" scoped>
@mixin fieldset-border($color) {
  border: 1px solid $color;
  &:has(.textarea-yui-kit__textarea:focus-visible) {
    border: 1px solid $color;
    & .textarea-yui-kit__legend {
      color: $color;
      display: inline-block;
    }
  }
  & .textarea-yui-kit__legend {
    color: $color;
    display: block;
  }
  &:hover,
  &.pressed {
    border: 1.5px solid $color;
  }
}

fieldset.textarea-yui-kit {
  --background: var(--white);
  position: relative;
  display: grid;
  align-items: center;
  border-radius: 5px;
  padding: 10px 15px;
  box-sizing: border-box;
  @include fieldset-border($BLUE-9CBEFF);
  border-color: transparent;
  background: var(--background);
  column-gap: 4px;
  & > div:first-child {
    background-color: $WHITE;
    padding-right: 7px;
  }
  & .textarea-yui-kit__legend {
    position: absolute;
    top: -11px;
    left: 15px;
    background: var(--background);
    display: none;
    font-size: 13px;
    font-weight: 600;
    padding-right: 4px;
    padding-left: 4px;
    & .textarea-yui-kit__star {
      font-size: 11px;
      font-weight: 600;
      color: #da1414;
    }
  }
}

textarea.textarea-yui-kit__textarea {
  padding-right: 20px;
  width: inherit;
  min-height: 80px;
  margin-bottom: 5px;
  overflow-y: scroll;
  background: var(--background);
  appearance: none;
  resize: none;
  font-size: 16px;
  border: none;
  outline: none;
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
  &:hover {
    border: none;
    & .textarea-yui-kit__legend {
      display: none;
    }
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

fieldset.textarea-yui-kit .textarea-yui-kit__textarea {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  & ::-webkit-scrollbar {
    display: none; /* Скрывает скроллбар в Chrome, Safari и Opera */
  }
}
</style>

<style>
.ps__thumb-x,
.ps__rail-x {
  display: none !important;
}
</style>
