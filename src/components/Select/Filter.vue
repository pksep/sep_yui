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
      <Tooltip
        class="filter__header-tooltip"
        type="blue"
        :hint="state.choosedOption"
        :hint-gap="28"
        :is-can-show="isCanShowHint"
        position="top-center"
      >
        <Badges
          ref="badgesRef"
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
          class="filter__options-badge selected-badge"
          :text="state.choosedOption"
          @choose="chooseOption"
          disabled
          choosed
        />
      </template>
      <Search :show-history="false" v-model="state.searchData" />
      <div class="filter__options-list">
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
      </div>
    </template>
  </SelectList>
</template>

<script setup lang="ts">
import { reactive, computed, watch, onMounted, ref } from 'vue';
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
  tooltipText: '',
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

const badgesRef = ref<InstanceType<typeof Badges> | null>(null);

const filteredOptions = computed(() =>
  state.optionStrings.filter(item =>
    item.toLowerCase().includes(state.searchData.toLowerCase())
  )
);

const isCanShowHint = computed(() => {
  return Boolean(badgesRef.value?.isSpanOverflow || false);
});

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
  state.tooltipText = value;
  emits('change', value);
};

const chooseOption = (value: boolean): void => {
  if (!state.defaultOption) return;
  state.isClear = !value;
  if (value) {
    state.choosedOption = props.noOptionText;
    state.tooltipText = '';
  }
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
      state.tooltipText =
        state.options.find(opt => opt.key === props.defaultOption)?.value ||
        props.defaultOption ||
        '';
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
  display: flex;
  align-items: center;

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
    display: grid;
    grid-auto-flow: column;
    & :deep(.badges-text) {
      display: inline-block;
      width: 100%;
      white-space: nowrap;
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

:deep(.filter__header) {
  overflow: visible;
}

:deep(.filter__header:hover) {
  border-color: var(--border-blue);
}

:deep(.filter__options) {
  padding: 10px;
  border: none;
  box-shadow: 0 4px 9.8px 0 #0000000d;
  width: 334px;
  overflow: hidden;
}

:deep(.filter__options-badge) {
  white-space: nowrap;
}

.selected-badge {
  margin-bottom: 5px;
}

:deep(.filter__options-list) {
  overflow-y: scroll;
  max-height: 376px;
  margin-right: -8px;
  padding-right: 2px;
}

:deep(.filter__options-option) {
  font-size: 14px;
  margin-block: 5px;
  display: block;
}

li.filter__options-underline {
  height: 0.5px;
  & .filter__options-underline-hr {
    margin: 0;
    border: none;
    border-bottom: 0.5px solid var(--border-grey);
  }
}

.filter__options-badge {
  font-weight: bold;
}

.filter__header-tooltip {
  position: relative;
}
</style>
