<template>
  <ul class="td-list">
    <li
      v-for="(item, index) of props.items"
      :key="index"
      :class="['td-item', { 'td-active': state.activeIndex === index }]"
      @click="toChooseItem(index)"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { ISwitchProps } from './interface';

const props = withDefaults(defineProps<ISwitchProps>(), {});

interface IChangeSwitchEmit {
  index: number;
  value: string;
}

const state = reactive({
  activeIndex: 0
});

const emit = defineEmits<{
  (e: 'change', event: IChangeSwitchEmit): void;
}>();

const toChooseItem = (index: number) => {
  state.activeIndex = index;
  emit('change', {
    index,
    value: props.items[index]
  });
};

onMounted(() => {
  if (props.defaultValue && props.items.includes(props.defaultValue)) {
    state.activeIndex = props.items.indexOf(props.defaultValue);
  }
});
</script>

<style lang="scss" scoped>
@import './../../assets/scss/_global.scss';

.td-list {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 6px;
  width: fit-content;
  border-radius: 5px;
  background-color: $white;
}

.td-item {
  padding: 3.5px 10px;
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
