<template>
  <div :class="classes" :disabled="props.disabled" :style="styles">
    <input
      class="toggle-input"
      :id="uniqueId"
      type="checkbox"
      v-model="isChecked"
      @change="onClick"
    />
    <label class="toggle-label" :for="uniqueId"></label>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { IToggleProps } from './interface';

const props = withDefaults(defineProps<IToggleProps>(), {
  disabled: false,
  checked: false
});

const emit = defineEmits<{
  (e: 'themeChange', isChecked: boolean): void;
}>();

const classes = computed(() => ({
  toggle: true
}));

const styles = computed(() => ({
  backgroundColor: props.backgroundColor
}));

const generateUniqueId = () => {
  return 'toggle-' + Math.random().toString(36).substr(2, 9);
};

const isChecked = ref(props.checked);

const uniqueId = ref(generateUniqueId());

const onClick = () => emit('themeChange', isChecked.value);
</script>

<style lang="scss" scoped>
@import './../../assets/scss/_global.scss';

.toggle {
  color: $white;
  outline: none;
  border: none;
  box-sizing: border-box;
  border-radius: 5px;
}

.toggle {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  margin: 10px;
}

.toggle .toggle-input {
  display: none;
}

.toggle .toggle-label {
  position: absolute;
  top: 0;
  left: 0;
  width: 26px;
  height: 16px;
  background-color: $grey-E2E2E2;
  border-radius: 34px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle .toggle-label::before {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  top: 3px;
  left: 3px;
  background-color: $white;
  transition: transform 0.3s;
}

.toggle .toggle-input:checked + .toggle-label {
  background-color: $blue-9CBEFF;
}

.toggle .toggle-input:checked + .toggle-label::before {
  transform: translateX(10px);
}
</style>
