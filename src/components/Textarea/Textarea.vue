<template>
  <fieldset class="textarea-yui-kit" :class="{ pressed: state.isPressed }">
    <legend class="textarea-yui-kit__legend">
      {{ props.title }}
      <sup class="textarea-yui-kit__star" v-if="props.required">*</sup>
    </legend>
    <Scroll
        :style="{ width: '100%' }"
        :railStyle="{
          y: {
            right: '6px'
          }
        }"
    >
    <textarea
      @input="handleInput"
      @focus="handleInput"
      class="textarea-yui-kit__textarea"
      :placeholder="props.placeholder"
      :required="props.required"
    />
    </Scroll>
  </fieldset>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { ITextareaProps } from './interface/interface';
import Scroll from '../Scrollbar/Scrollbar.vue'

const props = withDefaults(defineProps<ITextareaProps>(), {
  required: false
});

const state = reactive({
  isPressed: false
});

const emits = defineEmits<{
  (e: 'input', value: string): void;
}>();

const handleInput = (val: string) => {
  state.isPressed = state.inputElement?.length > 0;
  emits('input', val);
};
</script>

<style lang="scss" scoped>
@mixin fieldset-border($color) {
  border: 1px solid $color;
  &:has(.textarea-yui-kit__textarea:focus-visible) {
    border: 1.5px solid $color;
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
  display: grid;
  align-items: center;
  background-color: $WHITE;
  grid-template-columns: 1fr 0.01fr;
  padding: 0 15px;
  padding-right: 7px;
  border-radius: 5px;
  @include fieldset-border($BLUE-9CBEFF);
  border: none;
  column-gap: 4px;
  & .textarea-yui-kit__legend {
    display: none;
    font-size: 13px;
    font-weight: 600;
    padding-left: 4px;
    padding-right: 9px;
    & .textarea-yui-kit__star {
      font-size: 11px;
      font-weight: 600;
      color: #da1414;
    }
  }
  &.pressed {
    & .textarea-yui-kit__legend {
      display: block;
    }
  }
}

textarea.textarea-yui-kit__textarea {
  width: inherit;
  height: 118px;
  margin-bottom: 5px;
  overflow-y: scroll;
  appearance: none;
  resize: none;
  font-size: 16px;
  border: none;
  outline: none;
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
