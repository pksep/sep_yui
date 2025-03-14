<template>
  <SelectList
    @change="change"
    :is-opened="isOpened"
    :class="props.class"
    header-classes="filter__header"
    options-classes="filter__options"
  >
    <template #header>
      <span
        :class="[
          'filter__header-title',
          { 'filter__header-title__active': isOpened }
        ]"
      >
        {{ title }}
      </span>
      <Badges
        :type="
          choosedOption === props.defaultOption
            ? BadgesTypeEnum.default
            : BadgesTypeEnum.blue
        "
        class="filter__options-badge"
        :text="choosedOption"
        disabled
      />
    </template>
    <template #options>
      <Options
        class="filter__options-option"
        :options="filterOptions"
        :default-option="choosedOption"
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
import Badges from '@/components/Badges/Badges.vue';
import { BadgesTypeEnum } from '@/components/Badges/enum/enum';
import { IBaseFilterProps } from '@/components/Select/interface/interface';
import Options from '@/components/Select/Options.vue';
import SelectList from '@/components/Select/SelectList.vue';
import { computed, ref } from 'vue';

defineOptions({
  name: 'BaseFilter'
});

const props = withDefaults(defineProps<IBaseFilterProps>(), {
  defaultOption: 'Выберите значение'
});

const emits = defineEmits<{
  (e: 'change', value: string): void;
}>();

const model = defineModel();
const filterOptions = computed(() => {
  return props.options.map(option => option.value);
});

const choosedOption = computed(() => {
  const result = props.options.find(option => {
    return option.key === String(model.value);
  })?.value;

  return result ? result : props.defaultOption;
});
const isOpened = ref<boolean>();

const getChoosenOption = (value: string) => {
  const option = props.options.find(option => option.value === value);
  model.value = option?.key || '';

  isOpened.value = false;

  emits('change', String(model.value));
};
const change = (val: boolean) => {
  isOpened.value = val;
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
  max-width: 214px;

  display: flex;
  align-items: baseline;

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

:deep(.filter__options .filter__options-option) {
  font-size: 14px;

  &.active {
    background-color: inherit;
  }
}

:deep(.badges-text) {
  white-space: nowrap;
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
