<template>
  <div class="search__history history">
    <ul :class="classes">
      <li
        class="history__item"
        v-for="(item, index) in props.getAllResults"
        :key="index"
      >
        <span @click="e => emit('choosePost', e.target.textContent)">
          {{ valueListItem(item) }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed } from 'vue';
import { ISearchProps } from './interface';
import { IconNameEnum } from '../Icon/enum';
import Icon from './../Icon/Icon.vue';
import { useSearchStore } from '../../stores/search';

const searchStore = useSearchStore();

const props = defineProps<ISearchProps>();
// const props = defineProps<{ getAllResults: () => {}[] }>();
const state = reactive({
  result: props.result,
  isShowList: props.isShowList
});

const removeItem = (item: string) => {
  searchStore.removeHistorySearch(item);
};

const valueListItem = (item: string) => {
  return item.length > 33 ? item.slice(0, 30) + '...' : item;
};

// const getAllResults = () => props.getAllResults();

onMounted(() => {
  // console.log(getAllResults, 'getAllResults');
});
</script>

<style lang="scss" scoped>
@import './Search.scss';
</style>
