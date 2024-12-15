<template>
  <SelectList @change="change" :is-opened="state.isOpened">
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
import { reactive } from 'vue';
import SelectList from './SelectList.vue';
import Options from './Options.vue';
import Icon from './../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import type { IOptionsProps } from './interface/interface';

const props = withDefaults(defineProps<IOptionsProps>(), {});

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
  state.choosedOption = value;
  state.isOpened = false;
  emit('change', value);
};
</script>

<style scoped>
.dropdown-yui-kit__text {
  padding: 8.5px 0;
}

.truncate-yui-kit {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
