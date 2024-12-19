<template>
  <SelectList
    @change="change"
    :is-opened="state.isOpened"
    :cn="classes"
    :class="props.class"
  >
    <template #header>
      <span
        :class="[
          'filter__header-title',
          { 'filter__header-title__active': state.isOpened }
        ]"
      >
        {{ props.title }}
      </span>
      <Badges
        :type="
          state.choosedOption === props.defaultOption
            ? BadgesTypeEnum.default
            : BadgesTypeEnum.blue
        "
        class="filter__options-badge"
        :text="state.choosedOption"
        disabled
      />
    </template>
    <template #options>
      <template v-if="state.choosedOption != props.defaultOption">
        <Badges
          :type="BadgesTypeEnum.blue"
          class="filter__options-badge"
          :text="state.choosedOption"
          @choose="chooseOption"
        />
        <li class="filter__options-underline">
          <hr class="filter__options-underline-hr" />
        </li>
      </template>
      <Search :show-history="false" v-model="state.searchData" />
      <Options
        class="filter__options-option"
        :options="state.options"
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
import { reactive, computed, watch, onMounted } from 'vue';
import SelectList from './SelectList.vue';
import Options from './Options.vue';
import Badges from '../Badges/Badges.vue';
import Search from '../Search/Search.vue';
import type { IFilterProps } from './interface/interface';
import { BadgesTypeEnum } from '../Badges/enum/enum';

const props = withDefaults(defineProps<IFilterProps>(), {});

const state = reactive({
  choosedOption: props.defaultOption || '',
  searchData: '',
  options: [],
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
  if (props.options.some(obj => obj.value)) {
    state.choosedOption = props.options.find(obj => obj?.value === value)?.key;
  }
  state.isOpened = false;
  emits('change', value);
};

const chooseOption = (value: boolean): void => {
  if (!props.defaultOption) return;
  if (value) state.choosedOption = props.defaultOption;
};

watch(
  () => state.searchData,
  value => {
    emits('search', value);
  }
);

onMounted(() => {
  if (props.options.some(obj => obj.value)) {
    state.options = props.options.map(item => item.value);
    return;
  }
  state.options = props.options;
});
</script>

<style scoped>
:deep(.filter__header) {
  --radius: 10px;
  gap: 5px;
  padding: 13px 10px;
  justify-content: start;
  border: 1px solid var(--border-grey);
  color: var(--text-grey);
  & .filter__header-title:hover,
  .filter__header-title__active {
    color: var(--text-blue);
  }
}

:deep(.filter__options) {
  padding: 10px;
  gap: 10px;
  border: none;
  box-shadow: 0px 4px 9.8px 0px #0000000d;
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
