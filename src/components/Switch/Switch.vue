<template>
  <ul class="switch-yui-kit-list">
    <li
      v-for="(item, index) of props.items"
      :key="item"
      :class="getClasses(index)"
      @click="toChooseItem(index)"
    >
      <Icon :name="item as IconNameEnum" v-if="props.isIcons" />
      <template v-else>
        {{ item }}
      </template>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue';
import Icon from '@/components/Icon/Icon.vue';
import { ISwitchProps, IChangeSwitchEmit } from './interface/interface';
import { IconNameEnum } from '../Icon/enum/enum';

const props = withDefaults(defineProps<ISwitchProps>(), {});

const state = reactive({
  activeIndex: 0
});

const emit = defineEmits<{
  (e: 'change', event: IChangeSwitchEmit): void;
}>();

/**
 * @param index:  number
 * @returns
 */

/**
 * Устанавливает и вычисляет классы для элементов списка
 */
const getClasses = (index: number) => ({
  'switch-yui-kit-item': true,
  'switch-yui-kit-active': state.activeIndex === index
});

/**
 * @param index:  number
 * @returns
 */

/**
 * Получает выбранный элемнт списка, делает его активным и передает его родителю.
 */
const toChooseItem = (index: number) => {
  state.activeIndex = index;
  emit('change', {
    index,
    value: props.items[index]
  });
};

watch(
  () => props.defaultValue,
  () => {
    if (props.defaultValue && props.items.includes(props.defaultValue)) {
      state.activeIndex = props.items.indexOf(props.defaultValue);
    }
  }
);

/**
 * Устанавливает и делает активным дефолтный элемент если он передан и содержится в массиве элементов.
 */
onMounted(() => {
  if (props.defaultValue && props.items.includes(props.defaultValue)) {
    state.activeIndex = props.items.indexOf(props.defaultValue);
  }
});
</script>

<style lang="scss" scoped>
.switch-yui-kit-list {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 6px;
  width: inherit;
  border-radius: 5px;
  background-color: $WHITE;
  margin: 0;
}

.switch-yui-kit-item {
  padding: 3.5px 10px;
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: inherit;
  height: 24px;
}

.switch-yui-kit-active {
  background-color: $BLUE-77A6FF;
  color: $WHITE;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
}
</style>
