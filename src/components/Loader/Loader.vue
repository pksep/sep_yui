<template>
  <div class="loader">
    <svg viewBox="0 0 30 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="15%" cy="50%" rx="5.4" ry="5.4" fill="#77A6FF" />
      <ellipse cx="80%" cy="50%" rx="5.4" ry="5.4" fill="#407BFF" />
    </svg>
    <span v-if="props.title" class="loader__span">
      {{ props.title }}
    </span>
  </div>
</template>

<script setup lang="ts">
//import { reactive } from 'vue';
import type { ILoaderProps } from './interfaces/interfaces';

const props = withDefaults(defineProps<ILoaderProps>(), {
  width: '30',
  height: '10',
  title: 'Загрузка...'
});

/*
const state = reactive({
  percent: 0
});
*/
</script>

<style scoped>
.loader {
  display: grid;
  padding: 20px 14px;
  justify-items: center;
  & .loader__span {
    font-size: 18px;
    font-weight: bold;
    color: var(--blue1);
  }
}
</style>
