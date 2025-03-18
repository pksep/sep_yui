<template>
  <template v-for="option in props.options" :key="option">
    <li
      :class="[
        classes,
        { active: option === state.choosedOption },
        props.class
      ]"
      @click="() => getChoosenOption(option)"
    >
      {{
        isOptionsObjectWithHint(option)
          ? option.hint
          : isOptionsObject(option)
            ? option.value
            : option
      }}
    </li>
    <slot />
  </template>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import type { IOptionsProps, OptionsObject } from './interface/interface';
import isOptionsObject from '@/helpers/guards/is-options-object';
import isOptionsObjectWithHint from '@/helpers/guards/is-options-object-with-hint';

const props = withDefaults(defineProps<IOptionsProps>(), {});

const state = reactive({
  choosedOption: props.defaultOption ?? (props.options[0] || ''),
  lengthOption: 0
});

watch(
  () => props.defaultOption,
  () => {
    if (props.defaultOption) {
      state.choosedOption = props.defaultOption;
    } else {
      state.choosedOption = '';
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
const getChoosenOption = (value: string | OptionsObject) => {
  state.choosedOption = value;

  if (isOptionsObject(state.choosedOption)) {
    emit('change', state.choosedOption.key);
  } else {
    emit('change', state.choosedOption);
  }
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
