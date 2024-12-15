<template>
  <SelectList @change="change" :is-opened="state.isOpened">
    <template #header>
      <span> {{ props.title }} </span>
      <Badges :text="state.choosedOption" disabled />
    </template>
    <template #options>
      <Badges :text="state.choosedOption" />
      <Search :show-history="false" />
      <Options
        :options="props.options"
        :default-option="state.choosedOption"
        @change="getChoosenOption"
      />
    </template>
  </SelectList>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import SelectList from './SelectList.vue';
import Options from './Options.vue';
import Badges from '../Badges/Badges.vue';
import Search from '../Search/Search.vue';
import type { IFilterProps } from './interface/interface';

const props = withDefaults(defineProps<IFilterProps>(), {});

const state = reactive({
  choosedOption: props.defaultOption || props.options[0] || '',
  isOpened: false
});

const emit = defineEmits<{
  (e: 'change', value: string): void;
  (e: 'update:modelValue', value: string): void;
}>();

const change = (val: boolean) => {
  state.isOpened = val;
};

const getChoosenOption = (value: string) => {
  state.choosedOption = value;
  state.isOpened = false;
  emit('change', value);
};
</script>
