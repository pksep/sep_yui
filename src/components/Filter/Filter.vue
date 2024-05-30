<template>
  <div :class="classes">
    <Icon :name="props.iconName" />
    <span>{{ props.title }}</span>
    <span
      ><Badges @choose="select => console.log(select, 'select')">{{
        props
      }}</Badges></span
    >
    <ul>
      <li v-for="badge of state.items">
        <Badges>{{ badge }}</Badges>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { IFilterProps } from './interface';
import { FilterType } from './enum';
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

onMounted(() => {
  if (!props.items) return 0;
  state.items = props.items;
});
</script>

<style lang="scss" scope></style>
