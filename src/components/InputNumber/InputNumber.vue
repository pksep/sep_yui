<template>
  <fieldset
    class="input-yui-kit"
    :class="{
      pressed: state.isPressed
    }"
    @focusout="handleBlur"
    :disabled="props.disabled"
  >
    <legend class="input-yui-kit__legend">
      {{ props.inputMessage
      }}<sup class="input-yui-kit__star" v-if="props.required">*</sup>
    </legend>
    <input
      ref="inputNumberRef"
      v-model="state.inputElement"
      @focus="handleFocus"
      @input="handleInput"
      class="input-yui-kit__input"
      :placeholder="props.placeholder"
      :required="props.required"
      :min="props.min"
      :max="props.max"
      type="number"
    />

    <div class="input-yui-kit__buttons">
      <button
        class="input-yui-kit__button-up"
        @mousedown.prevent="upValue"
        :disabled="props.max !== undefined && +state.inputElement >= props.max"
      >
        <Icon :name="IconNameEnum.chevronUp" />
      </button>
      <button
        class="input-yui-kit__button-down"
        @mousedown.prevent="downValue"
        :disabled="props.min !== undefined && +state.inputElement <= props.min"
      >
        <Icon :name="IconNameEnum.chevronDown" />
      </button>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { watch, reactive, ref } from 'vue';
import type { IInputNumberProps } from './interface/interface.ts';
import { Icon } from '@/components';
import { IconNameEnum } from '@/components/Icon/enum/enum.ts';

const emits = defineEmits<{
  (e: 'input', value: string): void;
}>();

const props = withDefaults(defineProps<IInputNumberProps>(), {
  disabled: false
});

const state = reactive({
  isPressed: false,
  inputElement: ''
});

const inputNumberRef = ref<HTMLInputElement | null>(null);

const handleInput = (e: Event) => {
  const target = e.currentTarget as HTMLInputElement;
  const value = +target.value;

  if (props.max !== undefined && value > props.max) {
    state.inputElement = props.max.toString();
    emits('input', props.max.toString());
  } else if (props.min !== undefined && value < props.min) {
    state.inputElement = props.min.toString();
    emits('input', props.min.toString());
  } else {
    state.inputElement = target.value;
    emits('input', target.value);
  }

  state.isPressed = target.value !== '';
};

const handleFocus = () => {
  state.isPressed = true;
};

const handleBlur = () => {
  state.isPressed = false;
};

const upValue = () => {
  state.inputElement = (+state.inputElement + 1).toString();
  inputNumberRef.value?.focus();
};

const downValue = () => {
  state.inputElement = (+state.inputElement - 1).toString();
  inputNumberRef.value?.focus();
};

watch(
  () => state.inputElement,
  value => {
    state.isPressed = value !== '';
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

  &.initial::before,
  &.disabled::before,
  &.ordinary::before {
    border-color: $TRANSPARENT;
  }

  &:has(.input-yui-kit__input:focus-visible)::before {
    border-width: 1.5px;
    border-color: $color;
  }

  &.pressed::before,
  &:hover::before {
    border-width: 1.5px;
  }

  & .input-yui-kit__buttons {
    justify-self: end;
    display: grid;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 3.23px 0 #36363617;
    border-radius: 4.5px;

    & button {
      width: 24px;
      height: 16px;
      background-color: $WHITE;
      border: 0.3px solid $WHITE-E7E7E7;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      overflow: hidden;

      &:not(:disabled):hover {
        border-color: $BLUE-77A6FF;

        & * {
          color: $BLUE-77A6FF;
        }
      }
    }

    & .input-yui-kit__button-up {
      border-radius: 4.5px 4.5px 0 0;
    }
    & .input-yui-kit__button-down {
      border-radius: 0 0 4.5px 4.5px;
    }
  }

  & .input-yui-kit__legend {
    color: $color;
  }
}

fieldset.input-yui-kit {
  --background: var(--white);
  display: grid;
  align-items: center;
  background-color: var(--background);
  grid-template-columns: 1fr min-content;
  padding: 0 10px 0 15px;
  border-radius: 5px;
  height: 44px;
  column-gap: 4px;
  position: relative;
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
      //font-family: $STAR-FONT;
      font-size: 11px;
      font-weight: 600;
      vertical-align: 2px;
      color: var(--red6);
    }
  }

  &.pressed .input-yui-kit__legend,
  &.error .input-yui-kit__legend,
  &.success .input-yui-kit__legend,
  &.warning .input-yui-kit__legend {
    display: block;
  }

  &.ordinary .input-yui-kit__legend {
    display: none;
  }

  & .input-yui-kit__close {
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

/* Hide default arrows on input[type=number] for WebKit browsers */
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox specific (hides default spinner) */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
