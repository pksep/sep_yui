<template>
  <SelectList @change="change" :is-opened="state.isOpened" :cn="classes">
    <template #header>
      <span class="filter__header-title"> {{ props.title }} </span>
      <Badges
        class="filter__options-badge"
        :text="state.choosedOption"
        disabled
      />
    </template>
    <template #options>
      <Badges
        class="filter__options-badge"
        :text="state.choosedOption"
        @choose="chooseOption"
      />
      <Search :show-history="false" v-model="state.searchData" />
      <Options
        class="filter__options-option"
        :options="props.options"
        :default-option="state.choosedOption"
        @change="getChoosenOption"
      >
        <li class="filter__options-underline">
          <hr class="filter__options-underline-hr" />
        </li>
      </Options>
    </template>
  </SelectList>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import SelectList from './SelectList.vue';
import Options from './Options.vue';
import Badges from '../Badges/Badges.vue';
import Search from '../Search/Search.vue';
import type { IFilterProps } from './interface/interface';

const props = withDefaults(defineProps<IFilterProps>(), {});

const state = reactive({
  choosedOption: props.defaultOption || props.options[0] || '',
  searchData: '',
  isOpened: false
});

const classes = computed(() => ({
  header: 'filter__header',
  options: 'filter__options'
}));

const emits = defineEmits<{
  (e: 'change', value: string): void;
  (e: 'search', value: string): void;
}>();

const change = (val: boolean) => {
  state.isOpened = val;
};

const getChoosenOption = (value: string) => {
  state.choosedOption = value;
  state.isOpened = false;
  emits('change', value);
};

const chooseOption = (value: boolean) => {
  if (value) state.choosedOption = props.defaultOption;
};

watch(
  () => state.searchData,
  value => {
    emits('search', value);
  }
);
</script>

<style scoped>
:deep(.filter__header) {
  --radius: 10px;
  gap: 5px;
  padding: 13px 10px;
  justify-content: start;
  & .filter__header-title {
    &:hover {
      color: var(--text-blue);
    }
  }
}

:deep(.filter__options) {
  padding: 10px;
  gap: 10px;
}

li.filter__options-underline {
  height: 0.5px;
  & .filter__options-underline-hr {
    margin: 0;
    border: none;
    border-bottom: 0.5px solid var(--border-grey);
  }
  &:last-child {
    display: none;
  }
}

.filter__options-badge {
  font-weight: bold;
}
</style>
