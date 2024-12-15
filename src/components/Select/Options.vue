<template>
  <li
    :class="[classes, { active: option === state.choosedOption }]"
    v-for="option in props.options"
    @click="() => getChoosenOption(option)"
    :key="option"
  >
    {{ option }}
  </li>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import type { IOptionsProps } from './interface/interface';

const props = withDefaults(defineProps<IOptionsProps>(), {});

const state = reactive({
  choosedOption: props.defaultOption || props.options[0] || '',
  lengthOption: 0
});

watch(
  () => props.defaultOption,
  () => {
    if (props.defaultOption) {
      state.choosedOption = props.defaultOption;
    }
  },
  { immediate: true }
);

const emit = defineEmits<{
  (e: 'change', value: string): void;
}>();

const classes = computed(() => ({
  'select-list-yui-kit__item': true,
  'truncate-yui-kit': true
}));

/**
 * Получает знание выбранного элемента списка и передает по событию родителю. Закрывает список.
 */
const getChoosenOption = (value: string) => {
  state.choosedOption = value;
  emit('change', state.choosedOption);
};
</script>

<style scoped>
.select-list-yui-kit__item {
  &:first-child {
    margin-top: 5px;
  }
  padding: 5px 10px;
  cursor: pointer;
  &:nth-last-child(3) {
    margin-bottom: 2px;
  }

  &.active {
    color: var(--black);
    background-color: var(--blue10);
    border-radius: 5px;
  }

  &:hover {
    color: var(--black);
    background-color: var(--blue9);
    border-radius: 5px;
  }

  &.active-yui-kit {
    background-color: #ecf3ff;
    border-radius: 5px;
  }
}

.truncate-yui-kit {
  display: inline-block;
  width: var(--width, 100%);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
