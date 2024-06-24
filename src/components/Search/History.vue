<template>
  <div class="search__history history" v-if="props.showHistory">
    <button
      type="button"
      v-if="state.getHistorySearch.length > 0"
      @click="showHistoryClickHandler"
      :class="'history__button-text'"
    >
      Просмотреть историю запросов
    </button>

    <ul :class="classes">
      <li
        class="history__item"
        v-for="(item, index) in state.getHistorySearch"
        :key="index"
      >
        <span
          @click="
            e =>
              emit('choosePost', (e.target as HTMLElement)?.textContent || '')
          "
        >
          {{ trimText(item) }}</span
        ><button type="button" @click="removeItem(item)">
          <Icon :name="IconNameEnum.exitSmall" />
        </button>
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
import { trimText } from './../../helpers/trimText';

const searchStore = useSearchStore();

const props = defineProps<ISearchProps>();

const state = reactive({
  getHistorySearch: computed(() => {
    return searchStore.getHistorySearch;
  }),
  isShowList: props.isShowList,
  isShowButtonHistory: props.isShowButtonHistory
});

const emit = defineEmits<{
  (e: 'choosePost', value: string): void;
}>();

const classes = computed(() => ({
  history__list: true,
  'history__list--opened': state.isShowList,
  'history__list--scroll':
    state.getHistorySearch.length >= 5 && state.isShowList
}));

const showHistoryClickHandler = () => {
  state.isShowList = !state.isShowList;
  state.isShowButtonHistory = !state.isShowButtonHistory;
};

const removeItem = (item: string) => {
  searchStore.removeHistorySearch(item);
};

onMounted(() => {
  console.log(props.showHistory, 'SS');
  console.log(state.getHistorySearch, '111SS');
});
</script>

<style lang="scss" scoped>
@import './Search.scss';
</style>
