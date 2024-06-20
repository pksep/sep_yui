<template>
  <div class="dropdown">
    <span class="dropdown__current" @click="e => closeOpenList(e)">
      <span class="truncate">{{ state.choosedOption }}</span>
      <Icon :name="IconNameEnum.chevronDown" v-if="state.isOpened" />
      <Icon :name="IconNameEnum.chevronUp" v-if="!state.isOpened" />
    </span>
    <ul class="dropdown__list" v-if="state.isOpened">
      <li
        class="dropdown__item truncate"
        v-for="option in options"
        @click="() => getChoosenOption(option)"
        :key="option"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { IDropdownProps } from './interface';
import { IconNameEnum } from '../Icon/enum';
import Icon from './../Icon/Icon.vue';

const props = withDefaults(defineProps<IDropdownProps>(), {
  options: []
});

const emit = defineEmits<{
  (e: 'click', value: string): void;
}>();

const state = reactive({
  isOpened: false,
  choosedOption: props.options[0],
  lengthOption: 0
});

const getChoosenOption = (value: string) => {
  state.choosedOption = value;
  emit('click', state.choosedOption);
  state.isOpened = false;
};

const closeOpenList = (e: Event) => {
  state.isOpened = !state.isOpened;
  e.currentTarget.classList.toggle('active');
};
</script>
<style lang="scss" scoped>
.dropdown {
  width: 100%;

  &__current {
    width: inherit;
    padding: 6px 5px;
    background-color: $white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid $transparent;
    margin-bottom: 5px;
    border-radius: 5px;
    cursor: pointer;

    &.active {
      border: 1px solid $blue-9CBEFF;
    }

    svg {
      flex-shrink: 0;
    }
  }

  &__list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    padding: 6px 5px;
    max-height: 120px;
    overflow-y: scroll;
    background-color: $white;
    border-radius: 5px;
    border: 1px solid $blue-9CBEFF;
    display: grid;
    gap: 10px;
  }

  &__item {
    padding: 6px 5px;
    cursor: pointer;

    &:hover {
      background-color: $white-ECF3FF;
      border-radius: 5px;
    }
  }
}

.truncate {
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
