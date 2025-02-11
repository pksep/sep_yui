<template>
  <div :class="classes" :disabled="props.disabled" :style="styles">
    <input
      class="toggle-yui-kit-input"
      :id="uniqueId"
      type="checkbox"
      v-model="isChecked"
      @change="onClick"
    />
    <label class="toggle-yui-kit-label" :for="uniqueId"></label>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
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
const isChecked = ref(props.checked);

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
const onClick = () => emit('change', isChecked.value);
</script>

<style lang="scss" scoped>
.toggle-yui-kit {
  color: var(--white);
  outline: none;
  border: none;
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;
  display: inline-block;
  width: 25px;
  height: 16px;

  .toggle-yui-kit-input {
    display: none;
  }

  .toggle-yui-kit-input:checked + label.toggle-yui-kit-label {
    background-color: $BLUE-9CBEFF;
  }

  .toggle-yui-kit-input:checked + label.toggle-yui-kit-label::before {
    transform: translateX(10px);
  }
}

label.toggle-yui-kit-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 26px;
  height: 16px;
  background-color: $GREY-E2E2E2;
  border-radius: 34px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 0;

  &:before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    top: 3px;
    left: 3px;
    background-color: $WHITE;
    transition: transform 0.3s;
  }
}
</style>
