<template>
  <div :class="classes" :disabled="props.disabled" :style="styles">
    <input
      class="toggle-yui-kit-input"
      :id="uniqueId"
      type="checkbox"
      :disabled
      v-model="model"
      @change="onClick"
    />
    <label class="toggle-yui-kit-label" :for="uniqueId"></label>
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
  type: ToggleEnum.medium
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
  'toggle-yui-kit_big': props.type === ToggleEnum.big
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
  }

  &:has(.toggle-yui-kit-input:disabled) {
    & label.toggle-yui-kit-label {
      background-color: rgba(208, 208, 208, 0.5);
      &::before {
        background-color: #c8c8c8;
      }
    }
  }
}

label.toggle-yui-kit-label {
  display: block;
  width: calc(var(--size, 24px) + 10px);
  height: var(--size, 24px);
  background-color: var(--grey3);
  border-radius: 34px;
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
    transition: transform 0.3s;
  }
}
</style>
