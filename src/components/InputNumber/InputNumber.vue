<template>
  <fieldset
    class="input-yui-kit input-yui-kit_number initial"
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
      @keydown="handleKeyDown"
      class="input-yui-kit__input"
      :required="props.required"
      :data-testid="`${props.dataTestid}-Input`"
      type="text"
    />
    <div
      class="input-yui-kit__buttons"
      :data-testid="`${props.dataTestid}-Buttons`"
    >
      <button
        class="input-yui-kit__button-up"
        :data-testid="`${props.dataTestid}-UpButton`"
        @mousedown.prevent="upValue"
        :disabled="+state.inputElement >= props.max"
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
        :disabled="+state.inputElement <= props.min"
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
import { reactive, watch, ref, onMounted } from 'vue';
import Icon from '../Icon/Icon.vue';
import { IconNameEnum } from '@/components/Icon/enum/enum.ts';
import { SizesEnum } from '@/common/sizes.ts';

import type { IInputNumberProps } from './interface/interface.ts';

interface IState {
  isPressed: boolean;
  inputElement: number | string;
  prevValue: number | string;
}

const emits = defineEmits<{
  (e: 'update:modelValue', value: number | string): void;
  (e: 'focused', event: FocusEvent): void;
}>();

const props = withDefaults(defineProps<IInputNumberProps>(), {
  modelValue: 0,
  min: 0,
  max: Infinity,
  size: SizesEnum.medium,
  dataTestid: 'InputNumber',
  isInteger: false,
  zeroPad: false,
  modelModifiers: () => ({}) // not delete
});

const state = reactive<IState>({
  isPressed: false,
  inputElement: props.modelValue || (props.min > 0 ? props.min : 0),
  prevValue: ''
});

const validPattern = /^-?\d{0,10}(\.\d{0,7})?$/;

const inputNumberRef = ref<HTMLInputElement | null>(null);

/**
 * Добавляет ведущие нули, если zeroPad = true
 */
function formatWithZeroPad(value: number | string, digits = 2): string {
  if (props.zeroPad && !isNaN(+value)) {
    return String(value).padStart(digits, '0');
  }
  return String(value);
}

watch(
  () => props.isInteger,
  () => {
    if (props.isInteger) {
      state.inputElement = getFormateValue(state.inputElement.toString());
      validateValue(state.inputElement);
    }
  }
);

watch([() => props.min, () => props.max], () => {
  checkAndSetMaxValue();
  checkAndSetMinValue();
});

watch(
  () => props.modelValue,
  (newValue, oldValue) => {
    state.inputElement =
      props.zeroPad && (!state.isPressed || Number(oldValue) === 0)
        ? formatWithZeroPad(newValue)
        : newValue;
  }
);

const handleInput = (e: Event): void => {
  let newValue = (e.target as HTMLInputElement).value;
  if (!(props.zeroPad && newValue === '00')) {
    newValue = getFormateValue(newValue);
  }

  validateValue(newValue);

  if (
    !isNaN(+state.inputElement) &&
    Number(state.inputElement) <= props.max &&
    Number(state.inputElement) >= props.min
  ) {
    emits('update:modelValue', state.inputElement);
  }
};

/**
 * Возвращает отформатированное значение для корректного числа
 * @param value
 */
const getFormateValue = (value: string): string => {
  let formattedValue = value.replace(',', '.');

  // если значение должны быть целочисленными, то "." удаляем
  if (props.isInteger && formattedValue.includes('.')) {
    formattedValue = formattedValue.replace('.', '');
  }

  // Добавляем ведущий 0, если точка в начале
  if (formattedValue === '.') {
    formattedValue = '0' + formattedValue;
  } else if (formattedValue === '-.') {
    formattedValue = '-0.' + formattedValue.slice(2);
  }

  if (/[^\d.]/.test(formattedValue)) {
    formattedValue = formattedValue.replace(
      props.min >= 0 ? /[^0-9.]/g : /[^0-9.-]/g,
      ''
    );
  }

  // Обработка неправильного положения '-' (знак минус должен быть только в начале)
  if (formattedValue.includes('-')) {
    // Оставить только начальный минус, удалить остальные
    formattedValue =
      (formattedValue.startsWith('-') ? '-' : '') +
      formattedValue.replace(/-/g, '');
  }

  // Ваш исходный обработчик начальных нулей
  if (
    formattedValue.startsWith('0') &&
    formattedValue.length > 1 &&
    !formattedValue.startsWith('0.')
  ) {
    formattedValue = formattedValue.replace(/^0+/, '');
  }

  if (
    formattedValue.startsWith('-0') &&
    formattedValue.length > 2 &&
    !formattedValue.startsWith('-0.')
  ) {
    formattedValue = '-' + formattedValue.slice(2).replace(/^0+/, '');
  }

  // Ваш исходный обработчик нескольких точек
  const dotCount = (formattedValue.match(/\./g) || []).length;
  if (dotCount > 1) {
    formattedValue =
      formattedValue.slice(0, formattedValue.lastIndexOf('.')) +
      formattedValue.slice(formattedValue.lastIndexOf('.') + 1);
  }

  return formattedValue;
};

/**
 * Валидирует значение на min, max,
 * @param value
 */
const validateValue = (value: string): void => {
  if (Number(value) > props.max) {
    state.inputElement = props.max;
  } else {
    state.inputElement = value;
  }

  if (
    state.inputElement !== '' &&
    !validPattern.test(`${state.inputElement}`)
  ) {
    state.inputElement = state.prevValue;
  }
};

const checkAndSetMinValue = (): void => {
  if (Number(state.inputElement) < props.min) {
    state.inputElement = props.min;
    emits('update:modelValue', +state.inputElement);
  }
};

const checkAndSetMaxValue = (): void => {
  if (Number(state.inputElement) > props.max) {
    state.inputElement = props.max;
    emits('update:modelValue', +state.inputElement);
  }
};

const handleKeyDown = (e: KeyboardEvent): void => {
  state.prevValue = state.inputElement;
  if (e.key === 'ArrowUp') {
    upValue();
  }

  if (e.key === 'ArrowDown') {
    downValue();
  }
};

const handleFocus = (event: FocusEvent): void => {
  state.isPressed = true;
  emits('focused', event);
};

const handleBlur = (): void => {
  if (
    state.inputElement === '' ||
    state.inputElement === null ||
    isNaN(+state.inputElement)
  ) {
    state.inputElement = props.min > 0 ? props.min : 0;
  }

  if (isNaN(+state.inputElement)) {
    state.inputElement = Math.max(props.min, 0);
  }

  if (Number(state.inputElement) > props.max) {
    state.inputElement = props.max;
  } else if (Number(state.inputElement) < props.min) {
    state.inputElement = props.min;
  }

  state.inputElement = `${state.inputElement}`
    .replace(/(\.\d*?[1-9])0+$/, '$1')
    .replace(/\.0+$/, '');
  state.inputElement = formatWithZeroPad(state.inputElement);
  emits('update:modelValue', state.inputElement);
  state.isPressed = false;
};

const upValue = (): void => {
  if (+state.inputElement + 1 < props.max) {
    state.inputElement = +state.inputElement + 1;
  } else if (props.max !== Infinity) {
    state.inputElement = props.max;
  } else {
    state.inputElement = 0;
  }

  if (!validPattern.test(`${state.inputElement}`)) {
    state.inputElement = state.prevValue;
  } else {
    state.inputElement = formatWithZeroPad(state.inputElement);
    emits('update:modelValue', state.inputElement);
  }
  inputNumberRef.value?.focus();
};

const downValue = (): void => {
  if (+state.inputElement - 1 > props.min) {
    state.inputElement = +state.inputElement - 1;
  } else if (props.min !== -Infinity) {
    state.inputElement = props.min;
  } else {
    state.inputElement = 0;
  }
  state.inputElement = formatWithZeroPad(state.inputElement);
  emits('update:modelValue', +state.inputElement);
  inputNumberRef.value?.focus();
};

onMounted(() => {
  checkAndSetMaxValue();
  checkAndSetMinValue();
});
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
      border: 0.3px solid var(--border-color);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      overflow: hidden;

      &:not(:disabled):hover {
        border-color: var(--primary-color);
        cursor: pointer;

        & * {
          color: var(--primary-color);
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
    background: var(--primary-hover-light-color);
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
