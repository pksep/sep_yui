<template>
  <SelectList
    @change="change"
    :is-opened="state.isOpened"
    :class="props.class"
    :disabled="props.disabled"
  >
    <template #header>
      <span class="truncate-yui-kit dropdown-yui-kit__text">{{
        state.choosedOption
      }}</span>
      <Icon :name="IconNameEnum.chevronUp" v-if="state.isOpened" />
      <Icon :name="IconNameEnum.chevronDown" v-if="!state.isOpened" />
    </template>
    <template #options>
      <Options
        :options="props.options"
        :default-option="props.defaultOption"
        @change="getChoosenOption"
      />
    </template>
  </SelectList>
</template>
<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
import SelectList from './SelectList.vue';
import Options from './Options.vue';
import Icon from './../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import type { IOptionsProps } from './interface/interface';
import { isArrayOptionsObject } from '@/helpers/guards/is-options-object';

const props = withDefaults(defineProps<IOptionsProps>(), {
  disabled: false
});

const state = reactive({
  choosedOption: props.defaultOption || props.options[0] || '',
  isOpened: false
});

const emit = defineEmits<{
  (e: 'change', value: string): void;
}>();

const change = (val: boolean) => {
  state.isOpened = val;
};

/**
 * Получает знание выбранного элемента списка и передает по событию родителю. Закрывает список.
 */
const getChoosenOption = (value: string) => {
  let key: string | undefined;
  if (isArrayOptionsObject(props.options)) {
    const option = props.options.find(option => option.key === value);
    state.choosedOption = option?.value || value;
    key = option?.key;
  } else {
    state.choosedOption = value;
  }
  state.isOpened = false;
  emit('change', key || value);
};

watch(
  () => props.defaultOption,
  () => {
    if (props.defaultOption) {
      state.choosedOption = props.defaultOption;
    }
  }
);

onMounted(() => {
  if (isArrayOptionsObject(props.options)) {
    state.choosedOption = props.defaultOption || props.options[0].value;
  }
});
</script>

<style scoped>
.dropdown-yui-kit__text {
  padding: 8.5px 0;
}

.truncate-yui-kit {
  display: inline-block;
  width: var(--width, 100%);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

:deep(.select-list-yui-kit__list) {
  width: var(--width, 100%);
  max-height: 120px;
  padding: 5px;
}

:deep(.select-list-yui-kit__item) {
  width: 100%;
}
.select-list-yui-kit :deep(.select-list-yui-kit__item:first-child) {
  margin-top: 0;
}
</style>
