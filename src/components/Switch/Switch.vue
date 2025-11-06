<template>
  <ul
    class="switch-yui-kit-list"
    :class="switchClass"
    :data-testid="props.dataTestid"
  >
    <li
      v-for="(item, index) of props.items"
      :key="item"
      :class="getClasses(index)"
      :data-testid="`${props.dataTestid}-Item${index}`"
      @click="toChooseItem(index)"
    >
      <Icon
        :name="item"
        v-if="props.isIcons"
        :data-testid="`${props.dataTestid}-Item-Icon${index}`"
      />
      <template v-else>
        {{ item }}
      </template>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, watch } from 'vue';
import Icon from '@/components/Icon/Icon.vue';
import { ISwitchProps, IChangeSwitchEmit } from './interface/interface';

const props = withDefaults(defineProps<ISwitchProps>(), {
  dataTestid: 'Switch',
  theme: 'default'
});

const emit = defineEmits<{
  (e: 'change', event: IChangeSwitchEmit): void;
}>();

const state = reactive({
  activeIndex: 0
});

const switchClass = computed(() => [
  {
    'switch-yui-kit-list_default': props.theme === 'default',
    'switch-yui-kit-list_contrast': props.theme === 'contrast',
    'switch-yui-kit-list_disabled': props.disabled
  }
]);

/**
 * Устанавливает и вычисляет классы для элементов списка
 */
const getClasses = (index: number) => ({
  'switch-yui-kit-item': true,
  'switch-yui-kit-active': state.activeIndex === index,
  'switch-yui-kit-active_disabled':
    state.activeIndex === index && props.disabled,
  'switch-yui-kit-item_disabled': props.disabled
});

/**
 * @param index:  number
 * @returns
 */

/**
 * Получает выбранный элемнт списка, делает его активным и передает его родителю.
 */
const toChooseItem = (index: number): void => {
  if (state.activeIndex === index) {
    return;
  }

  state.activeIndex = index;
  emit('change', {
    index,
    value: props.items[index]
  });
};

watch(
  () => props.defaultValue,
  () => {
    state.activeIndex = props.defaultValue
      ? props.items?.indexOf(props.defaultValue)
      : 0;
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
  gap: 6px;
  width: inherit;
  border-radius: 5px;
  background-color: var(--white);
  margin: 0;
  transition: all 0.3s ease-in-out;
}

.switch-yui-kit-list_contrast {
  background-color: var(--blue15);
}

.switch-yui-kit-list_disabled {
  background-color: var(--grey1);
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
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
}

.switch-yui-kit-item_disabled {
  pointer-events: none;
  color: var(--grey7);
  background-color: var(--grey1);
}

.switch-yui-kit-active {
  background-color: var(--blue1);
  color: var(--white);
}

.switch-yui-kit-active_disabled {
  background-color: var(--grey7);
}
</style>
