<template>
  <SelectList
    @change="change"
    :is-opened="isOpened"
    :class="props.class"
    header-classes="filter__header"
    options-classes="filter__options"
    :data-testid="props.dataTestid"
  >
    <template #header>
      <span
        :class="[
          'filter__header-title',
          { 'filter__header-title__active': isOpened }
        ]"
        :data-testid="`${props.dataTestid}-Title`"
      >
        {{ title }}
      </span>
      <Tooltip
        :position="tooltipPosition"
        type="blue"
        :is-can-show="isCanShowHint && !(isShowValues && isShowMiniOptions)"
        :hint="choosedHint"
        :hint-gap="28"
        class="filter__header-tooltip"
        :data-testid="`${props.dataTestid}-Tooltip`"
      >
        <Badges
          ref="badgesRef"
          :type="
            choosedOption === props.defaultOption
              ? BadgesTypeEnum.default
              : BadgesTypeEnum.blue
          "
          class="filter__options-badge"
          :data-testid="`${props.dataTestid}-Badge`"
          :text="choosedOption"
          @mouseenter="onMouseEnter"
          @mouseleave="onMouseLeave"
          disabled
        />

        <div
          v-if="isShowValues && isShowMiniOptions"
          class="filter__values"
          :data-testid="`${props.dataTestid}-Filter-Value`"
        >
          <ChoosenMiniOptions
            :data-testid="`${props.dataTestid}-Filter-Value-MiniOptions`"
            @click.stop
            :options="choosedMiniOptions"
            @remove="getChoosenOption"
          />
        </div>
      </Tooltip>

      <span
        v-if="countModelValue && countModelValue > 1"
        class="filter__count"
        :data-testid="`${props.dataTestid}-Filter-Count`"
      >
        +{{ countModelValue - 1 }}

        <div
          v-if="isShowValues"
          class="filter__values"
          :data-testid="`${props.dataTestid}-Filter-Values`"
        >
          <ChoosenMiniOptions
            @click.stop
            :options="choosedOptions"
            @remove="getChoosenOption"
            :data-testid="`${props.dataTestid}-MiniOptions`"
          />
        </div>
      </span>

      <span
        v-if="isPosibleToClear"
        class="filter__cross"
        @click.stop="clear"
        :data-testid="`${props.dataTestid}-Filter-Cross`"
      >
        <Icon :name="IconNameEnum.crossLarge" :width="16" :height="16" />
      </span>
    </template>
    <template #options>
      <Search
        v-if="isSearch"
        :show-history="false"
        v-model="searchData"
        :data-testid="`${props.dataTestid}-Search`"
      />

      <Options
        :data-testid="`${props.dataTestid}-Options`"
        class="filter__options-option"
        :options="filterOptions"
        :default-option="choosedOption"
        @change="getChoosenOption"
      >
        <li
          class="filter__options-underline"
          :data-testid="`${props.dataTestid}-Underline`"
        >
          <hr class="filter__options-underline-hr" />
        </li>
      </Options>
    </template>
  </SelectList>
</template>

<script setup lang="ts">
import Badges from '@/components/Badges/Badges.vue';
import { BadgesTypeEnum } from '@/components/Badges/enum/enum';
import { IconNameEnum } from '@/components/Icon/enum/enum';
import Icon from '@/components/Icon/Icon.vue';
import Search from '@/components/Search/Search.vue';
import ChoosenMiniOptions from '@/components/Select/ChoosenMiniOptions.vue';
import {
  IBaseFilterProps,
  OptionsObject
} from '@/components/Select/interface/interface';
import Options from '@/components/Select/Options.vue';
import SelectList from '@/components/Select/SelectList.vue';
import Tooltip from '@/components/Tooltip/Tooltip.vue';
import { isArrayOfOptionsObjectWithHint } from '@/helpers/guards/is-options-object-with-hint';
import { isArray } from 'lodash';
import { computed, ref, reactive, watch, nextTick } from 'vue';

defineOptions({
  name: 'BaseFilter'
});

const props = withDefaults(defineProps<IBaseFilterProps>(), {
  defaultOption: 'Выберите значение',
  isSearch: false,
  isPosibleToClear: false,
  isShowMiniOptions: false,
  dataTestid: 'BaseFilter',
  isOpened: false,
  tooltipPosition: 'top-center'
});

const state = reactive({
  isHovered: false
});

const emits = defineEmits<{
  (e: 'change', value: string | string[]): void;
  (e: 'unmount-open', value: boolean): void;
}>();

const badgesRef = ref<InstanceType<typeof Badges> | null>(null);
const model = defineModel<string | string[]>({
  default: []
});

const isOpened = ref<boolean>(props.isOpened);

watch(isOpened, () => emits('unmount-open', isOpened.value));
watch(
  () => props.isOpened,
  () => {
    isOpened.value = props.isOpened;
  }
);

const searchData = ref('');

const filterOptions = computed(() => {
  let filterResult: OptionsObject[] = [];
  if (searchData.value) {
    if (isArrayOfOptionsObjectWithHint(props.options)) {
      filterResult = props.options.filter(option => {
        return (
          option.value.toLowerCase().includes(searchData.value.toLowerCase()) ||
          option?.hint?.toLowerCase().includes(searchData.value.toLowerCase())
        );
      });
    } else {
      filterResult = props.options.filter(option => {
        return option.value
          .toLowerCase()
          .includes(searchData.value.toLowerCase());
      });
    }

    return filterResult;
  }

  if (isArrayOfOptionsObjectWithHint(props.options)) {
    filterResult = props.options;
  } else {
    filterResult = props.options;
  }

  return filterResult;
});

const choosedOption = computed(() => {
  const result = props.options.find(option => {
    if (isArray(model.value)) {
      return model.value.includes(option.key);
    }
    return option.key === String(model.value);
  })?.value;

  return result || props.defaultOption;
});

const choosedOptions = computed(() => {
  return props.options.filter(option => {
    if (isArray(model.value)) {
      return (
        model.value.includes(option.key) && option.value !== choosedOption.value
      );
    }
    return option.key === String(model.value);
  });
});

const choosedMiniOptions = computed(() => {
  return props.options.filter(option => {
    if (isArray(model.value)) {
      return (
        model.value.includes(option.key) && option.value === choosedOption.value
      );
    }
    return option.key === String(model.value);
  });
});

const choosedHint = computed(() => {
  const options = props.options;
  let result;
  if (isArray(model.value)) {
    if (isArrayOfOptionsObjectWithHint(options)) {
      result = options.find(
        option => option.value === choosedOption.value
      )?.hint;
    } else {
      result = options.find(
        option => option.value === choosedOption.value
      )?.value;
    }
  } else {
    result = options.find(option => option.key === String(model.value))?.value;
  }

  return result || '';
});

const onMouseEnter = () => {
  state.isHovered = true;
};

const onMouseLeave = () => {
  state.isHovered = false;
};

const isCanShowHint = computed(() => {
  if (isArrayOfOptionsObjectWithHint(props.options)) {
    return state.isHovered && Boolean(choosedHint.value);
  }

  return badgesRef.value?.isSpanOverflow || false;
});

const isPosibleToClear = computed(() => {
  if (isArray(model.value)) {
    return props.isPosibleToClear && model.value.length > 0;
  } else {
    return props.isPosibleToClear && model.value;
  }
});
const isShowValues = computed(
  () => isArray(model.value) && model.value.length > 1
);
const countModelValue = computed(() => {
  if (isArray(model.value)) {
    return model.value.length;
  }
  return null;
});

const getChoosenOption = async (value: string): Promise<void> => {
  if (isArray(model.value)) {
    if (model.value.includes(value)) {
      model.value = model.value.filter(item => item !== value);
    } else {
      model.value = [...model.value, value];
    }
  } else {
    let option = props.options.find(option => option.key === value);

    if (!option && isArrayOfOptionsObjectWithHint(props.options)) {
      option = props.options.find(option => option.hint === value);
    }

    model.value = option?.key || '';

    isOpened.value = false;
  }

  await nextTick();

  emits('change', String(model.value));
};

const change = (val: boolean): void => {
  isOpened.value = val;
};

const clear = async (): Promise<void> => {
  if (isArray(model.value)) {
    model.value = [];
  } else {
    model.value = '';
  }

  await nextTick();
  emits('change', model.value);
};
</script>

<style scoped lang="scss">
:deep(.filter__header) {
  --radius: 10px;
  gap: 5px;
  padding: var(--filter-padding, 13px 10px);
  justify-content: start;
  border: 1px solid var(--border-grey);
  color: var(--text-grey);
  width: max-content;
  max-width: 237px;

  display: flex;
  align-items: center;

  .filter__header-title,
  .filter__count {
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;

    flex-shrink: 0;
  }

  .filter__header-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .filter__header-title__active {
    color: var(--text-blue);
  }
}

:deep(.filter__header:hover) {
  border-color: var(--border-blue);
}

:deep(.filter__options) {
  max-height: var(--options-max-height, 390px);
  padding: 10px;
  gap: 5px;
  border: none;
  box-shadow: 0 4px 9.8px 0 #0000000d;
  width: 334px;
}

:deep(.filter__options-badge) {
  display: flex;
}

:deep(.filter__options .filter__options-option) {
  font-size: 14px;

  &.active {
    background-color: inherit;
  }
}

.filter__header-tooltip {
  position: relative;
  min-width: 0;
}

:deep(.base-yui-kit span.badges-text) {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.filter__cross {
  --width: 20px;
  display: inline-flex;
  width: var(--width);
  height: var(--width);
  color: var(--text-grey);
  align-items: center;
  justify-content: center;

  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f9fd;
  }
}

.filter__count {
  position: relative;
  transition: all 0.2s ease;
}

.filter__cross:active,
.filter__count:hover {
  color: var(--blue1);
}

.filter__count:hover .filter__values,
.filter__header-tooltip:hover .filter__values {
  visibility: visible;
  opacity: 1;
}

.filter__values {
  position: absolute;
  z-index: 2223;
  top: 100%;
  left: 0;

  padding-top: 4px;

  visibility: hidden;
  opacity: 0;

  transition: all 0.2s ease;
}

:deep(.filter__options .truncate-yui-kit) {
  width: auto;
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
