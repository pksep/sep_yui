<template>
  <div
    :class="classes"
    :disabled="props.disabled"
    :style="styles"
    @click="onClick"
  >
    <input
      v-if="!props.lang"
      class="toggle-input"
      id="toggle"
      type="checkbox"
    />
    <label v-if="!props.lang" class="toggle-label" for="toggle"></label>
    <input
      v-if="props.lang"
      class="toggle-input-lang"
      id="toggle"
      type="checkbox"
    />
    <label v-if="props.lang" class="toggle-label-lang" for="toggle">222</label>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { IToggleProps } from './interface';

const props = withDefaults(defineProps<IToggleProps>(), {
  disabled: false,
  lang: false
});

const emit = defineEmits<{
  (e: 'click', id: number): void;
}>();

const classes = computed(() => ({
  toggle: true
}));

const styles = computed(() => ({
  backgroundColor: props.backgroundColor
}));

const onClick = () => emit('click', 1);
</script>

<style lang="scss" scope>
@import './../../assets/scss/_global.scss';

.toggle {
  color: $white;
  outline: none;
  border: none;
  box-sizing: border-box;
  border-radius: 5px;
}

/* Genel stil */
.toggle {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  margin: 10px;
}

/* Giriş stil */
.toggle .toggle-input {
  display: none;
}

/* Anahtarın stilinin etrafındaki etiketin stil */
.toggle .toggle-label {
  position: absolute;
  top: 0;
  left: 0;
  width: 26px;
  height: 16px;
  background-color: #e2e2e2;
  border-radius: 34px;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Anahtarın yuvarlak kısmının stil */
.toggle .toggle-label::before {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  top: 3px;
  left: 3px;
  background-color: #fff;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s;
}

/* Anahtarın etkin hale gelmesindeki stil değişiklikleri */
.toggle .toggle-input:checked + .toggle-label {
  background-color: $blue-9CBEFF;
}

.toggle .toggle-input:checked + .toggle-label::before {
  transform: translateX(10px);
}

/* Light tema */
.toggle.light .toggle-label {
  background-color: #bebebe;
}

.toggle.light .toggle-input:checked + .toggle-label {
  background-color: #9b9b9b;
}

.toggle.light .toggle-input:checked + .toggle-label::before {
  transform: translateX(6px);
}

/* Dark tema */
.toggle.dark .toggle-label {
  background-color: #4b4b4b;
}

.toggle.dark .toggle-input:checked + .toggle-label {
  background-color: #717171;
}

.toggle.dark .toggle-input:checked + .toggle-label::before {
  transform: translateX(16px);
}
</style>
