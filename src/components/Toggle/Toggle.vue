<template>
  <div :class="classes" :disabled="props.disabled" :style="styles">
    <input
      class="toggle-ui-kit-input"
      :id="uniqueId"
      type="checkbox"
      v-model="isChecked"
      @change="onClick"
    />
    <label class="toggle-ui-kit-label" :for="uniqueId"></label>
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
  (e: 'themeChange', isChecked: boolean): void;
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
  'toggle-ui-kit': true
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
const onClick = () => emit('themeChange', isChecked.value);
</script>

<style lang="scss" scoped>
@import './../../assets/scss/_global.scss';

.toggle-ui-kit {
  color: $WHITE;
  outline: none;
  border: none;
  box-sizing: border-box;
  border-radius: 5px;
}

.toggle-ui-kit {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  margin: 10px;
}

.toggle-ui-kit .toggle-ui-kit-input {
  display: none;
}

.toggle-ui-kit .toggle-ui-kit-label {
  position: absolute;
  top: 0;
  left: 0;
  width: 26px;
  height: 16px;
  background-color: $GREY-E2E2E2;
  border-radius: 34px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle-ui-kit .toggle-ui-kit-label::before {
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

.toggle-ui-kit .toggle-ui-kit-input:checked + .toggle-ui-kit-label {
  background-color: $BLUE-9CBEFF;
}

.toggle-ui-kit .toggle-ui-kit-input:checked + .toggle-ui-kit-label::before {
  transform: translateX(10px);
}
</style>
