<template>
  <SelectList
    @change="change"
    :is-opened="state.isOpened"
    :disable-open="state.values?.length == 0"
    :class="props.class"
    :disabled="props.disabled"
    header-classes="filter__header"
    options-classes="filter__options"
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
      <Options
        :default-option="state.searchValue"
        :options="state.values"
        @change="getChoosenOption"
      />
    </template>
  </SelectList>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue';
import SelectList from './SelectList.vue';
import Options from './Options.vue';
import type { IComboboxProps } from './interface/interface';

const emits = defineEmits<{
  (e: 'change', value: string): void;
}>();

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
  if (state.values?.length == 0 || props.disableOpen) {
    state.isOpened = val;
  }
};

watchEffect(() => (state.values = props.options));

watchEffect(() => (state.searchValue = props.defaultOption || ''));

const changeSearchValue = (): void => {
  state.isOpened = true;
  state.values = props.options.filter(item =>
    state.searchValue
      .toLowerCase()
      .split(' ')
      .every(val => item.toLowerCase().includes(val))
  );
  emits('change', state.searchValue);
  if (state.values?.length == 0) state.isOpened = false;
};

const getChoosenOption = (value: string) => {
  state.searchValue = value;
  state.isOpened = false;
  emits('change', value);
};
</script>

<style scoped>
input.combobox__input {
  border: 0;
  padding: 13px 5px;
  border-radius: 5px;
  outline: none;
  &:focus::placeholder {
    color: transparent;
  }
}

input[type='search']::-webkit-search-cancel-button {
  -webkit-appearance: none;
  display: none;
}

:deep(.filter__header) {
  --radius: 10px;
  gap: 5px;
  padding: 0px 5px;
  justify-content: start;
  border: 0;
  color: var(--text-grey);
  width: max-content;
  border: 1px solid var(--border-grey);
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
