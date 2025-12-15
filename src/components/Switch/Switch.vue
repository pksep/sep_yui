<template>
  <ul
    class="switch-yui-kit-list"
    :class="switchClass"
    :data-testid="props.dataTestid"
  >
    <li
      v-for="(item, index) of props.items"
      :key="index"
      :class="getClasses(index)"
      :data-testid="`${props.dataTestid}-Item${index}`"
      @click="toChooseItem(index)"
    >
      <Icon
        :name="item as IconNameEnum"
        v-if="props.isIcons"
        :data-testid="`${props.dataTestid}-Item-Icon${index}`"
      />
      <template v-else>
        {{ getDisplayText(item) }}
      </template>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, watch } from 'vue';
import Icon from '@/components/Icon/Icon.vue';
import { IconNameEnum } from '@/components/Icon/enum/enum';
import {
  ISwitchProps,
  IChangeSwitchEmit,
  type SwitchItem
} from './interface/interface';

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

const getDisplayText = (item: string | SwitchItem): string => {
  return typeof item === 'string' ? item : item.label;
};

const getValue = (item: string | SwitchItem): string => {
  return typeof item === 'string' ? item : item.value;
};

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
    value: getValue(props.items[index])
  });
};

watch(
  () => props.defaultValue,
  () => {
    state.activeIndex = props.defaultValue
      ? (props.items.findIndex(item => getValue(item) === props.defaultValue) ??
        0)
      : 0;
  }
);

/**
 * Устанавливает и делает активным дефолтный элемент если он передан и содержится в массиве элементов.
 */
onMounted(() => {
  if (props.defaultValue) {
    const idx = props.items.findIndex(
      item => getValue(item) === props.defaultValue
    );
    if (idx !== -1) {
      state.activeIndex = idx;
    }
  }
});
</script>

<style scoped>
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
  background-color: var(--background-light-color);
}

.switch-yui-kit-list_disabled {
  background-color: var(--button-neutral-color);
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
  color: var(--text-light-color);
  background-color: var(--button-neutral-color);
}

.switch-yui-kit-active {
  background-color: var(--primary-color);
  color: var(--white);
}

.switch-yui-kit-active_disabled {
  background-color: var(--text-light-color);
}
</style>
