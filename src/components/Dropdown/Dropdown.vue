<template>
  <div
    class="dropdown-yui-kit"
    :style="{ width: props.width }"
    v-on-click-outside.bubble="dropdownHandler"
  >
    <span
      :class="[
        'dropdown-yui-kit__current',
        { 'active-yui-kit': state.isOpened }
      ]"
      @click="closeOpenList"
    >
      <span class="truncate-yui-kit dropdown-yui-kit__text">{{
        state.choosedOption
      }}</span>
      <Icon :name="IconNameEnum.chevronUp" v-if="state.isOpened" />
      <Icon :name="IconNameEnum.chevronDown" v-if="!state.isOpened" />
    </span>
    <ul
      class="dropdown-yui-kit__list"
      v-if="state.isOpened"
      :style="{ width: props.width }"
    >
      <li
        :class="[classes, { active: option === state.choosedOption }]"
        v-for="option in props.options"
        @click="() => getChoosenOption(option)"
        :key="option"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import { IDropdownProps } from './interface/interface';
import type { OnClickOutsideHandler } from '@vueuse/core';
import { vOnClickOutside } from '@vueuse/components';
import { IconNameEnum } from '../Icon/enum/enum';
import Icon from './../Icon/Icon.vue';

const props = withDefaults(defineProps<IDropdownProps>(), {});

const state = reactive({
  isOpened: false,
  choosedOption: props.defaultOption || props.options[0] || '',
  lengthOption: 0,
  width: '100%'
});

const emit = defineEmits<{
  (e: 'change', value: string): void;
}>();

/**
 * Создаем проверки для классов, устанавливаем их элементам списка
 */
const classes = computed(() => ({
  'dropdown-yui-kit__item': true,
  'truncate-yui-kit': true
}));

/**
 * @param value: string
 * @returns
 */

/**
 * Получает знание выбранного элемента списка и передает по событию родителю. Закрывает список.
 */
const getChoosenOption = (value: string) => {
  state.choosedOption = value;
  emit('change', state.choosedOption);
  state.isOpened = false;
};

watch(
  () => props.defaultOption,
  () => {
    if (props.defaultOption) {
      state.choosedOption = props.defaultOption;
    }
  },
  { immediate: true }
);

/**
 * @returns
 */

/**
 * Закрывает открытый список, и также открывает его.
 */
const closeOpenList = () => {
  state.isOpened = !state.isOpened;
};

const dropdownHandler: OnClickOutsideHandler = () => {
  state.isOpened = false;
};
</script>
<style lang="scss" scoped>
.dropdown-yui-kit {
  width: 100%;

  &__current {
    width: inherit;
    padding: 0px 10px;
    background-color: $WHITE;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid $TRANSPARENT;
    border-radius: 5px;
    cursor: pointer;

    &.active-yui-kit {
      border: 1px solid $BLUE-9CBEFF;
    }

    svg {
      flex-shrink: 0;
      height: 16px;
      width: 16px;
    }
  }

  &__text {
    padding: 8.5px 0;
  }
  &__list {
    margin-top: 5px;
    list-style-type: none;
    display: grid;
    padding: 0;
    background-color: $WHITE;
    border: 1px solid $BLUE-9CBEFF;
    max-height: 120px;
    border-radius: 5px;
    position: absolute;
    overflow: auto;
    overflow-x: hidden;
    z-index: 2222222;
  }
  &__list > div {
    display: grid;
    max-height: 120px;
    gap: 10px;
  }

  &__item {
    &:first-child {
      margin-top: 5px;
    }
    padding: 5px 10px;
    cursor: pointer;
    &:nth-last-child(3) {
      margin-bottom: 2px;
    }

    &.active {
      color: var(--black);
      background-color: var(--blue10);
      border-radius: 5px;
    }

    &:hover {
      color: var(--black);
      background-color: var(--blue9);
      border-radius: 5px;
    }

    &.active-yui-kit {
      background-color: $WHITE-ECF3FF;
      border-radius: 5px;
    }
  }
}

.truncate-yui-kit {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
