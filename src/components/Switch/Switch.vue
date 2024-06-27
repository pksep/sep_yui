<template>
  <ul class="switch-list">
    <li
      v-for="(item, index) of props.items"
      :key="state.generateUniqueId"
      :class="getClasses(index)"
      @click="toChooseItem(index)"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { onMounted, reactive, computed } from 'vue';
import { ISwitchProps, IChangeSwitchEmit } from './interface/interface';
import { generateUniqueId } from './../../helpers/genarate-unic-id';

const props = withDefaults(defineProps<ISwitchProps>(), {});

const state = reactive({
  activeIndex: 0,
  generateUniqueId: generateUniqueId
});

const emit = defineEmits<{
  (e: 'languageSwitch', event: IChangeSwitchEmit): void;
}>();

const getClasses = (index: number) => ({
  'switch-item': true,
  'switch-active': state.activeIndex === index
});

const toChooseItem = (index: number) => {
  state.activeIndex = index;
  emit('languageSwitch', {
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
.switch-list {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 6px;
  width: fit-content;
  border-radius: 5px;
  background-color: $WHITE;
  margin: 0;
}

.switch-item {
  padding: 3.5px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.switch-active {
  background-color: $BLUE-77A6FF;
  color: $WHITE;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
}
</style>
