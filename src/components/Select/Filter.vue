<template>
  <SelectList
    @change="change"
    :is-opened="state.isOpened"
    :disable-open="state.isNoOpen"
    :class="props.class"
    header-classes="filter__header"
    options-classes="filter__options"
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
      <Tooltip :hint="state.choosedOption" position="top-center">
        <Badges
          :type="
            state.choosedOption === props.noOptionText
              ? BadgesTypeEnum.default
              : BadgesTypeEnum.blue
          "
          class="filter__options-badge"
          :text="state.choosedOption"
          disabled
        />
      </Tooltip>
      <YButton
        v-if="props.enableClearAll && state.isClear"
        @click="clearOptions"
        :type="ButtonTypeEnum.ghost"
        :size="SizesEnum.small"
      >
        <YIcon :name="IconNameEnum.crossLarge" width="16" height="16" />
      </YButton>
    </template>
    <template #options>
      <template
        v-if="
          !props.enableClearAll && state.choosedOption !== props.noOptionText
        "
      >
        <Badges
          :type="BadgesTypeEnum.blue"
          class="filter__options-badge"
          :text="state.choosedOption"
          @choose="chooseOption"
          disabled
          choosed
        />
        <li class="filter__options-underline">
          <hr class="filter__options-underline-hr" />
        </li>
      </template>
      <Search :show-history="false" v-model="state.searchData" />
      <Options
        class="filter__options-option"
        :options="filteredOptions"
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
import Tooltip from '../Tooltip/Tooltip.vue';
import { BadgesTypeEnum } from '../Badges/enum/enum';
import { IconNameEnum } from '../Icon/enum/enum';
import { ButtonTypeEnum } from '../Button/enum/enum';
import { SizesEnum } from '@/common/sizes';
import type { IFilterProps } from './interface/interface';

const props = withDefaults(defineProps<IFilterProps>(), {
  noOptionText: 'Не выбран',
  enableClearAll: false
});

const state = reactive({
  choosedOption: props.defaultOption || props.noOptionText,
  defaultOption: props.defaultOption || props.noOptionText,
  searchData: '',
  options: [
    {
      key: '',
      value: ''
    }
  ],
  optionStrings: [''],
  isOpened: false,
  isNoOpen: false,
  isClear: false
});

const filteredOptions = computed(() =>
  state.optionStrings.filter(item =>
    item.toLowerCase().includes(state.searchData.toLowerCase())
  )
);

const emits = defineEmits<{
  (e: 'change', value: string): void;
  (e: 'search', value: string): void;
}>();

const change = (val: boolean): void => {
  state.isOpened = val;
};

const clearOptions = (): void => {
  state.isOpened = false;
  state.isClear = false;
  state.isNoOpen = true;
  state.choosedOption = props.noOptionText;
  state.defaultOption = props.noOptionText;
  setTimeout(() => (state.isNoOpen = false), 1);
  emits('change', props.noOptionText);
};

const getChoosenOption = (value: string): void => {
  state.choosedOption =
    state.options.find(obj => obj.value === value)?.key || '';
  state.isOpened = false;
  state.isClear = true;
  emits('change', value);
};

const chooseOption = (value: boolean): void => {
  if (!state.defaultOption) return;
  if (value) state.choosedOption = props.noOptionText;
  state.isClear = !value;
  emits('change', props.noOptionText);
};

const updateOptions = (): void => {
  if (props.options.every(item => typeof item === 'string')) {
    state.options = props.options.map(item => ({ key: item, value: item }));
  } else {
    state.options = props.options;
  }
  state.optionStrings = state.options.map(item => item.value);
};

onMounted(() => {
  updateOptions();
});

watch(
  () => props.options,
  () => {
    updateOptions();
  },
  { deep: true }
);

watch(
  () => props.defaultOption,
  () => {
    if (props.defaultOption) {
      state.defaultOption = props.defaultOption;
      state.choosedOption = props.defaultOption;
    }
  },
  { deep: true }
);
</script>

<style scoped>
:deep(.filter__header) {
  --radius: 10px;
  gap: 5px;
  padding: 13px 10px;
  justify-content: start;
  border: 1px solid var(--border-grey);
  color: var(--text-grey);
  width: max-content;
  max-width: 214px;
  overflow: hidden;

  & .filter__header-title {
    font-size: 14px;
    font-weight: 400;
    line-height: 16.94px;
    white-space: nowrap;
    overflow: visible;
  }

  & .filter__header-title__active {
    color: var(--text-blue);
  }

  & .filter__options-badge {
    overflow: hidden;
    display: block;
    & :deep(.badges-text) {
      max-width: 100%;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  & button.button-yui-kit {
    padding: 2px;
    min-height: 20px;
    & :deep(svg.icon-yui-kit) > g > path {
      stroke-width: 1.5;
    }
  }
}

:deep(.filter__header:hover) {
  border-color: var(--border-blue);
}

:deep(.filter__options) {
  padding: 10px;
  gap: 5px;
  border: none;
  box-shadow: 0 4px 9.8px 0 #0000000d;
  width: 334px;
}

:deep(.filter__options-badge) {
  white-space: nowrap;
}

:deep(.filter__options-option) {
  font-size: 14px;
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
