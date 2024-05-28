<template>
  <div>
    <div :class="'pos_x menu_span'">
      <div class="td-row-wrapper">
        <input type="radio" name="lang" id="lang-Ru" checked />
        <label class="td-row" for="lang-Ru">Ru</label>
      </div>
      <div v-for="dat of props.items" :key="dat" class="td-row-wrapper">
        <input type="radio" name="lang" :id="`lang-${dat}`" />
        <label class="td-row" :for="`lang-${dat}`">{{ dat }}</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ISwitchProps } from './interface';

const props = withDefaults(defineProps<ISwitchProps>(), {});

interface IChangeSwitchEmit {
  index: number;
  value: string;
}

const emit = defineEmits<{
  (e: 'change', event: IChangeSwitchEmit): void;
}>();
</script>

<style lang="scss" scope>
@import './../../assets/scss/_global.scss';

.pos_y {
  display: flex;
  flex-direction: column;
}
.pos_x {
  display: flex;
}

.menu_span {
  width: fit-content;
  padding: 2px 0;
  cursor: pointer;
  background-color: $blue-F2F7FF;
}

.td-row-wrapper .td-row {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  padding: 4px;
  display: flex;
  min-height: 30px;
  min-width: 95px;
  transition: 0.3s ease-in-out;
  cursor: pointer;
}

.td-row-wrapper input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.td-row-wrapper input:checked + .td-row {
  background-color: $blue-77A6FF;
  color: $white;
  border-radius: 5px;
}

.td-row {
  background-color: $blue-F2F7FF;
}

.td-row-all {
  background-color: $blue-77A6FF;
  color: $white;
}
</style>
