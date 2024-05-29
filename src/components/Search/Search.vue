<template>
  <input
    type="search"
    class="search"
    :placeholder="props.placeholder || 'Поиск'"
  />

  <!-- <ul class="multiselect">
    <li v-for="post in props.posts">{{ post }}</li>
  </ul> -->
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { ISearchProps } from './interface';

const props = withDefaults(defineProps<ISearchProps>(), {
  showHistory: true
});

interface IEnterSearchEmit {
  value: string;
}

const emit =
  defineEmits<{
    (e: 'enter', event: IEnterSearchEmit): void;
  }>();

const state = reactive({
  posts: props.posts
});

const addPost = post => {};
</script>

<style lang="scss" scope>
@import './Search.scss';
</style>
