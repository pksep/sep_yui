<template>
  <input type="search" class="search" placeholder="Поиск" />
  <ul class="multiselect">
    <li v-for="li in props.arr">{{ li }}</li>
  </ul>
</template>

<script lang="ts" setup>
import { ISearchProps } from './interface';

const props = withDefaults(defineProps<ISearchProps>(), {
  arr: () => []
});
</script>

<style lang="scss" scope>
@import './../../assets/scss/_global.scss';
</style>
