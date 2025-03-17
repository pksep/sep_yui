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

const props = withDefaults(defineProps<IToggleProps>(), {
  disabled: false,
  checked: false,
  size: 'small'
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
const classes = computed(() => [
  {
    'toggle-yui-kit': true,
    'toggle-yui-kit_large': props.size === 'large',
    'toggle-yui-kit_small': props.size === 'small'
  }
]);

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

<style lang="scss" scoped>
@import './../../assets/scss/_global.scss';

.toggle-yui-kit {
  color: var(--white);
  outline: none;
  border: none;
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;
  display: block;

  .toggle-yui-kit-input {
    display: none;
  }

  .toggle-yui-kit-input:checked + label.toggle-yui-kit-label {
    background-color: var(--border-blue);
  }
  .toggle-yui-kit-input:checked + label.toggle-yui-kit-label::before {
    transform: translateX(10px);
  }

  &:has(.toggle-yui-kit-input:disabled) {
    & label.toggle-yui-kit-label {
      background-color: rgba(208, 208, 208, 0.5);
      &::before {
        background-color: #c8c8c8;
      }
    }
  }

  &_large {
    .toggle-yui-kit-input:checked + label.toggle-yui-kit-label {
      background-color: var(--border-blue);
      box-shadow:
        inset 0px 3px 3px 0 rgba(0, 0, 0, 0.15),
        inset 0px 3px 3px 0 rgba(128, 128, 128, 0.18);
    }
    .toggle-yui-kit-input:checked + label.toggle-yui-kit-label::before {
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
}

label.toggle-yui-kit-label {
  display: block;
  width: 26px;
  height: 16px;
  background-color: var(--grey3);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  margin: 0;

  &:before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
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
