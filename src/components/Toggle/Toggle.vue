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
  checked: false
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
  'toggle-yui-kit': true
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
    box-shadow:
      inset 0px 3px 3px 0 rgba(0, 0, 0, 0.15),
      inset 0px 3px 3px 0 rgba(128, 128, 128, 0.18);
  }

  .toggle-yui-kit-input:checked + label.toggle-yui-kit-label::before {
    transform: translateX(24px);
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
  // position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  display: block;
  width: 56px;
  height: 32px;
  background-color: var(--grey3);
  border-radius: 34px;
  overflow: hidden;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  margin: 0;
  box-shadow:
    inset 1px 1.5px 4px 0 rgba(0, 0, 0, 0.1),
    inset 1px 1.5px 4px 0 rgba(0, 0, 0, 0.08);

  &:before {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    top: 4px;
    left: 4px;
    background-color: var(--white);
    transition:
      transform 0.3s,
      background-color 0.3s;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.22);
  }
}
</style>
