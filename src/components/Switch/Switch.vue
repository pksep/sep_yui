<template>
  <ul class="td-list">
    <li
      v-for="(item, index) of props.items"
      :key="item"
      :class="['td-item', { 'td-active': state.activeIndex === index }]"
      @click="e => toChooseItem(index, e.currentTarget.textContent)"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { ISwitchProps } from './interface';

const props = withDefaults(defineProps<ISwitchProps>(), {
  defaultValue: 'Ru',
  index: 0
});

interface IChangeSwitchEmit {
  index: number;
  value: string;
}

const state = reactive({
  activeItem: props.defaultValue,
  activeIndex: props.index
});

const emit =
  defineEmits<{
    (e: 'change', event: IChangeSwitchEmit): void;
  }>();

const toChooseItem = (index: number, value) => {
  state.activeIndex = index;
  state.activeItem = value;
  emit('change', { index, value });
};

onMounted(() => {
  if (props.items.length > 0) {
    const defaultIndex = props.items.indexOf(props.defaultValue);
    if (defaultIndex !== -1) {
      state.activeIndex = defaultIndex;
      state.activeItem = props.defaultValue;
    }
    toChooseItem(state.activeIndex, props.items[state.activeIndex]);
  }
});
</script>

<style lang="scss" scope>
@import './../../assets/scss/_global.scss';

.td-list {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 2px;
  width: fit-content;
  background-color: $blue-F2F7FF;
  font-family: 'Inter', sans-serif;
}

.td-item {
  padding: 5px 10px;
  min-width: 95px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.td-active {
  background-color: $blue-77A6FF;
  color: $white;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
}
</style>
