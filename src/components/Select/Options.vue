<template>
  <template v-for="(option, inx) in props.options" :key="inx">
    <li
      :class="[classes, getActiveClass(option), props.class]"
      @click="() => handleChoosenOption(option)"
      :data-testid="`${props.dataTestid}-${inx}`"
    >
      {{ getOption(option) }}
    </li>
    <slot />
  </template>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import type {
  IOptionsObjectWithHint,
  IOptionsProps,
  OptionsObject
} from '@/components/Select/interface/interface';
import isOptionsObject from '@/helpers/guards/is-options-object';
import isOptionsObjectWithHint from '@/helpers/guards/is-options-object-with-hint';

const props = withDefaults(defineProps<IOptionsProps>(), {
  dataTestid: 'Options'
});

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
const handleChoosenOption = (value: string | OptionsObject): void => {
  state.choosedOption = value;

  if (isOptionsObject(state.choosedOption)) {
    emit('change', state.choosedOption.key);
  } else {
    emit('change', state.choosedOption);
  }
};

const getActiveClass = (
  option: string | OptionsObject | IOptionsObjectWithHint
): Record<'active', boolean> => {
  let active = false;
  if (isOptionsObject(option)) {
    if (isOptionsObject(state.choosedOption)) {
      if (option.value === state.choosedOption.value) active = true;
    } else {
      if (
        (option.key === 'null' || option.key === null) &&
        state.choosedOption === ''
      )
        active = true;
      if (option.value === state.choosedOption) active = true;
    }
  } else {
    if (isOptionsObject(state.choosedOption)) {
      if (option === state.choosedOption.value) active = true;
    } else {
      if (option === state.choosedOption) active = true;
    }
  }

  return {
    active
  };
};

const getOption = (
  option: string | OptionsObject | IOptionsObjectWithHint
): string => {
  if (isOptionsObjectWithHint(option)) {
    return option.hint;
  }
  if (isOptionsObject(option)) return option.value;
  return option;
};
</script>

<style scoped lang="scss">
.select-list-yui-kit__item {
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:first-child {
    margin-top: 5px;
  }
  &:nth-last-child(3) {
    margin-bottom: 2px;
  }

  &.active-yui-kit {
    background-color: #ecf3ff;
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
