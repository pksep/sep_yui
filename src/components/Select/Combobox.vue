<template>
  <SelectList
    @change="change"
    :is-opened="state.isOpened"
    :cn="classes"
    :class="props.class"
    :disabled="props.disabled"
  >
    <template #header>
      <input
        type="search"
        class="combobox__input"
        v-model="state.searchValue"
        :placeholder="state.placeholder"
        @keydown.enter="changeSearchValue"
        @input="changeSearchValue"
      />
    </template>
    <template #options>
      <Options :options="state.values" @change="getChoosenOption" />
    </template>
  </SelectList>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import SelectList from './SelectList.vue';
import Options from './Options.vue';
import type { IComboboxProps } from './interface/interface';

const emits = defineEmits<{
  (e: 'change', value: string): void;
}>();

const classes = computed(() => ({
  header: 'filter__header',
  options: 'filter__options'
}));

const props = withDefaults(defineProps<IComboboxProps>(), {
  disabled: false
});

const state = reactive({
  isOpened: false,
  placeholder: props.placeholder,
  values: props.options,
  searchValue: ''
});

const change = (val: boolean): void => {
  state.isOpened = val;
};

const changeSearchValue = (): void => {
  state.isOpened = true;
  state.values = props.options.filter(item =>
    state.searchValue
      .toLowerCase()
      .split(' ')
      .every(val => item.toLowerCase().includes(val))
  );
  if (state.values?.length == 0) state.isOpened = false;
};

const getChoosenOption = (value: string) => {
  state.searchValue = value;
  state.isOpened = false;
  emits('change', value);
};
</script>

<style scoped>
.combobox__input {
  border: 0;
  outline: none;
}

:deep(.filter__header) {
  --radius: 10px;
  gap: 5px;
  padding: 13px 10px;
  justify-content: start;
  border: 1px solid var(--border-grey);
  color: var(--text-grey);
  width: max-content;
  max-width: 214px;

  .filter__header-title {
    font-size: 14px;
    font-weight: 400;
    line-height: 16.94px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .filter__header-title__active {
    color: var(--text-blue);
  }
}
</style>
