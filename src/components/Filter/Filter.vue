<template>
  <div class="filter">
    <div class="filter__wrapper">
      <Icon :name="props.iconName" />
      <span>{{ props.title }}</span>
      <span
        ><Badges>{{ state.items[0] }}</Badges></span
      >
      <span class="filter__counter">{{ '+' + state.items.length }}</span>
      <button type="button" class="filter__close">
        <Icon :name="'exitBig'" />
      </button>
    </div>
    <ul class="filter__select-list">
      <li class="filter__select-item" v-for="(badge, index) of state.items">
        <Badges :type="badgeTypes[index]">{{ badge }}</Badges>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { IFilterProps } from './interface';
import { FilterType } from './enum';
import { BadgesType } from './../Badges/enum';
import Badges from '@/components/Badges/Badges';
import Icon from '@/components/Icon/Icon';
import { IconNameEnum } from '../Icon/enum';

const props = withDefaults(defineProps<IFilterProps>(), {
  title: FilterType.default,
  iconName: IconNameEnum.filter,
  multiselect: false,
  items: [],
  defaultValue: 'red'
});

const state = reactive({
  items: []
});
const badgeTypes = Object.values(BadgesType);
onMounted(() => {
  state.items = props.items;
});
</script>

<style lang="scss" scope>
.filter {
  display: grid;

  &__wrapper {
    display: flex;
    align-items: center;
    width: fit-content;
    border: 1px solid $white-E7E7E7;
    color: $grey-757D8A;
    transition: 0.3s ease-in-out;
    padding: 10px;
    border-radius: 10px;

    &:hover {
      border: 1px solid $blue-9CBEFF;
      color: $blue-9CBEFF;
    }
  }

  &__counter {
    color: $grey-757D8A;
  }

  &__select-list {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  &__close {
    cursor: pointer;
    background-color: $transparent;
    border: 1px solid $transparent;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
