<template>
  <div
    :class="classes"
    :disabled="props.disabled"
    :style="styles"
    :data-testid="`${props.dataTestid}-Toggle`"
  >
    <input
      class="toggle-yui-kit-input"
      :id="uniqueId"
      type="checkbox"
      :disabled
      v-model="model"
      @change="onClick"
      :data-testid="`${props.dataTestid}-Input`"
    />
    <label
      class="toggle-yui-kit-label"
      :for="uniqueId"
      :data-testid="`${props.dataTestid}-Label`"
    ></label>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { IToggleProps } from './interface/interface';
import { generateUniqueId } from './../../helpers/genarate-unic-id';
import { ToggleEnum } from './enums/enums.ts';

const props = withDefaults(defineProps<IToggleProps>(), {
  disabled: false,
  checked: false,
  type: ToggleEnum.small,
  dataTestid: 'Toggle'
});

const emit = defineEmits<{
  (e: 'change', isChecked: boolean): void;
}>();

/**
 * Проверяет на состояние выбра - не выбран элемент
 */
const model = defineModel<boolean>();

/**
 * высчитывает уникальный id
 */
const uniqueId = generateUniqueId();

/**
 * Высчитывает классы для всего Тоггла
 */
const classes = computed(() => ({
  'toggle-yui-kit': true,
  'toggle-yui-kit_small': props.type === ToggleEnum.small,
  'toggle-yui-kit_medium': props.type === ToggleEnum.medium,
  'toggle-yui-kit_large': props.type === ToggleEnum.large
}));

/**
 * Высчитывает стили для всего Тоггла, меняет фон элемента
 */
const styles = computed(() => ({
  backgroundColor: props.backgroundColor
}));

/**
 * По событию click передает значение выбран-не выбран элемент.
 */
const onClick = () => emit('change', Boolean(model.value));
</script>

<style scoped>
.toggle-yui-kit_small {
  --size: 16px;
  --position: 10px;
}

.toggle-yui-kit_medium {
  --size: 20px;
  --position: 10px;
}

.toggle-yui-kit_big {
  --size: 24px;
  --position: 14px;
}

.toggle-yui-kit {
  color: var(--white);
  outline: none;
  border: none;
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;
  display: block;

  & .toggle-yui-kit-input {
    display: none;
  }

  & .toggle-yui-kit-input:checked + label.toggle-yui-kit-label {
    background-color: var(--border-blue);
  }

  & .toggle-yui-kit-input:checked + label.toggle-yui-kit-label::before {
    transform: translateX(var(--position));
    &:has(.toggle-yui-kit-input:disabled) {
      & label.toggle-yui-kit-label {
        background-color: rgba(208, 208, 208, 0.5);
        &::before {
          background-color: #c8c8c8;
        }
      }
    }
  }
}

.toggle-yui-kit_large {
  & .toggle-yui-kit-input:checked + label.toggle-yui-kit-label {
    background-color: var(--border-blue);
    box-shadow:
      inset 0px 3px 3px 0 rgba(0, 0, 0, 0.15),
      inset 0px 3px 3px 0 rgba(128, 128, 128, 0.18);
  }
  & .toggle-yui-kit-input:checked + label.toggle-yui-kit-label::before {
    transform: translateX(24px);
  }

  & label.toggle-yui-kit-label {
    width: 56px;
    height: 32px;
    box-shadow:
      inset 1px 1.5px 4px 0 rgba(0, 0, 0, 0.1),
      inset 1px 1.5px 4px 0 rgba(0, 0, 0, 0.08);
    border-radius: 34px;

    &::before {
      width: 24px;
      height: 24px;
      top: 4px;
      left: 4px;
      box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.22);
    }
  }
}

label.toggle-yui-kit-label {
  display: block;
  width: calc(var(--size, 24px) + 10px);
  height: var(--size, 24px);
  background-color: var(--grey3);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 0;

  &:before {
    content: '';
    position: absolute;
    width: calc(var(--size, 24px) - 6px);
    height: calc(var(--size, 24px) - 6px);
    border-radius: 50%;
    top: 3px;
    left: 3px;
    background-color: var(--white);
    transition:
      transform 0.3s,
      background-color 0.3s;
  }
}
</style>
