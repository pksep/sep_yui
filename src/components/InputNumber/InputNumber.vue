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
      ref="inputNumberRef"
      v-model="state.inputElement"
      @focus="handleFocus"
      @input="handleInput"
      class="input-yui-kit__input"
      :required="props.required"
      :min="props.min"
      :max="props.max"
      type="number"
    />

    <div class="input-yui-kit__buttons">
      <button
        class="input-yui-kit__button-up"
        @mousedown.prevent="upValue"
        :disabled="+state.inputElement >= props.max"
      >
        <Icon :name="IconNameEnum.chevronUp" />
      </button>
      <button
        class="input-yui-kit__button-down"
        @mousedown.prevent="downValue"
        :disabled="+state.inputElement <= props.min"
      >
        <Icon :name="IconNameEnum.chevronDown" />
      </button>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { IInputNumberProps } from './interface/interface.ts';
import { Icon } from '@/components';
import { IconNameEnum } from '@/components/Icon/enum/enum.ts';

interface IState {
  isPressed: boolean;
  inputElement: number | string;
}

const emits = defineEmits<{
  (e: 'input', value: number): void;
}>();

const props = withDefaults(defineProps<IInputNumberProps>(), {
  min: -Infinity,
  max: Infinity
});

const state = reactive<IState>({
  isPressed: false,
  inputElement: props.min > 0 ? props.min : 0
});

const inputNumberRef = ref<HTMLInputElement | null>(null);

const handleInput = (e: Event): void => {
  const target = e.currentTarget as HTMLInputElement;
  const value = target.value;
  if (+value > props.max) {
    state.inputElement = props.max;
  } else if (props.min && +value < props.min) {
    state.inputElement = props.min;
  } else {
    state.inputElement = value;
  }

  if (+value === 0) {
    state.inputElement = props.min > 0 ? props.min : 0;
  }

  emits('input', +state.inputElement);
};

const handleFocus = (): void => {
  state.isPressed = true;
};

const handleBlur = (): void => {
  if (state.inputElement === '') {
    state.inputElement = props.min > 0 ? props.min : 0;
  }
  state.inputElement = +state.inputElement;
  emits('input', +state.inputElement);
  state.isPressed = false;
};

const upValue = (): void => {
  state.inputElement = +state.inputElement + 1;
  emits('input', state.inputElement);
  inputNumberRef.value?.focus();
};

const downValue = (): void => {
  state.inputElement = +state.inputElement - 1;
  emits('input', state.inputElement);
  inputNumberRef.value?.focus();
};
</script>

<style lang="scss" scoped>
fieldset.input-yui-kit {
  & .input-yui-kit__buttons {
    margin-right: 8px;
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
      cursor: pointer;

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
