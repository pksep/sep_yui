<template>
  <fieldset
    class="input-yui-kit initial"
    :class="{
      pressed: state.isPressed,
      [props.size]: true
    }"
    :data-testid="props.dataTestid"
    @focusout="handleBlur"
  >
    <legend
      v-if="props.inputMessage"
      class="input-yui-kit__legend"
      :data-testid="`${props.dataTestid}-Legend`"
    >
      {{ props.inputMessage
      }}<sup
        class="input-yui-kit__star"
        :data-testid="`${props.dataTestid}-Star`"
        v-if="props.required"
        >*</sup
      >
    </legend>
    <input
      ref="inputNumberRef"
      v-model="state.inputElement"
      @focus="handleFocus"
      @input="handleInput"
      class="input-yui-kit__input"
      :required="props.required"
      :data-testid="`${props.dataTestid}-Input`"
      :min="props.min"
      :max="props.max"
      type="number"
    />
    <div
      class="input-yui-kit__buttons"
      :data-testid="`${props.dataTestid}-Buttons`"
    >
      <button
        class="input-yui-kit__button-up"
        :data-testid="`${props.dataTestid}-UpButton`"
        @mousedown.prevent="upValue"
        :disabled="state.inputElement >= props.max"
      >
        <Icon
          :name="IconNameEnum.chevronUp"
          :data-testid="`${props.dataTestid}-Icon`"
        />
      </button>
      <button
        class="input-yui-kit__button-down"
        :data-testid="`${props.dataTestid}-DownButton`"
        @mousedown.prevent="downValue"
        :disabled="state.inputElement <= props.min"
      >
        <Icon
          :name="IconNameEnum.chevronDown"
          :data-testid="`${props.dataTestid}-Icon`"
        />
      </button>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from 'vue';
import Icon from '../Icon/Icon.vue';
import { IconNameEnum } from '@/components/Icon/enum/enum.ts';
import { SizesEnum } from '@/common/sizes.ts';

import type { IInputNumberProps } from './interface/interface.ts';

interface IState {
  isPressed: boolean;
  inputElement: number;
}

const emits = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const props = withDefaults(defineProps<IInputNumberProps>(), {
  modelValue: 0,
  min: -Infinity,
  max: Infinity,
  size: SizesEnum.medium,
  dataTestid: 'InputNumber'
});

const state = reactive<IState>({
  isPressed: false,
  inputElement: props.modelValue || (props.min > 0 ? props.min : 0)
});

const inputNumberRef = ref<HTMLInputElement | null>(null);

const handleInput = (e: Event): void => {
  const target = e.currentTarget as HTMLInputElement;
  const value = +target.value;

  if (value > props.max) {
    state.inputElement = props.max;
  } else if (value < props.min) {
    state.inputElement = props.min;
  } else {
    state.inputElement = value;
  }

  emits('update:modelValue', state.inputElement);
};

const handleFocus = (): void => {
  state.isPressed = true;
};

const handleBlur = (): void => {
  if (state.inputElement === null || isNaN(state.inputElement)) {
    state.inputElement = props.min > 0 ? props.min : 0;
  }
  emits('update:modelValue', state.inputElement);
  state.isPressed = false;
};

const upValue = (): void => {
  if (state.inputElement < props.max) {
    state.inputElement = +state.inputElement + 1;
    emits('update:modelValue', state.inputElement);
    inputNumberRef.value?.focus();
  }
};

const downValue = (): void => {
  if (Number(state.inputElement) - 1 >= props.min) {
    state.inputElement = +state.inputElement - 1;
    emits('update:modelValue', state.inputElement);
    inputNumberRef.value?.focus();
  }
};

watch(
  () => props.modelValue,
  newValue => {
    state.inputElement = newValue;
  }
);
</script>

<style scoped>
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
      background-color: var(--white);
      border: 0.3px solid var(--border-grey);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      overflow: hidden;

      &:not(:disabled):hover {
        border-color: var(--blue1);
        cursor: pointer;

        & * {
          color: var(--blue1);
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

  &.small {
    height: 30px;
    margin: 0;
    padding: 0;

    & .input-yui-kit__input {
      padding: 3px 6px;
    }

    & .input-yui-kit__buttons {
      margin-right: 6px;

      & button {
        width: 18px;
        height: 12px;
      }
    }
  }

  &.active {
    background: var(--blue9);
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
