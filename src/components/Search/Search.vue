<template>
  <div class="search" @mousemove="showhistory" @mouseleave="hidehistory">
    <div class="search__icon-wrapper">
      <input
        type="text"
        class="search__input"
        v-model="state.searchValue"
        :placeholder="props.placeholder"
        @keydown.enter="changeSearch"
        @input="changeSearchValue"
      />
      <Icon :name="IconNameEnum.searchNormal" />
    </div>

    <div class="search__history history" v-if="props.showHistory">
      <button
        type="button"
        v-if="state.isShowButtonHistory && state.getHistorySearch.length > 0"
        @click="showHistoryClickHandler"
        :class="'history__button-text'"
      >
        Просмотреть историю запросов
      </button>
      <ul :class="classes">
        <li
          class="history__item"
          v-for="(item, index) of state.getHistorySearch"
          :key="index"
        >
          <span @click="() => choosePost(item)">
            {{ item.length > 33 ? item.slice(0, 30) + '...' : item }}</span
          ><button type="button" @click="removeItem(item)">
            <Icon :name="IconNameEnum.exitSmall" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, computed } from 'vue';
import { ISearchProps } from './interface';
import { useSearchStore } from '../../stores/search';
import { IconNameEnum } from '../Icon/enum';
import Icon from './../Icon/Icon.vue';

const searchStore = useSearchStore();

const props = withDefaults(defineProps<ISearchProps>(), {
  showHistory: true,
  placeholder: 'Поиск'
});

const emit = defineEmits<{
  (e: 'enter', value: string): void;
  (e: 'input', value: string): void;
}>();

const state = reactive({
  searchValue: '',
  isClicked: false,
  getHistorySearch: computed(() => searchStore.getHistorySearch),
  isShowList: false,
  isShowButtonHistory: true
});

const classes = computed(() => ({
  history__list: true,
  'history__list--opened': state.isShowList,
  'history__list--scroll':
    state.getHistorySearch.length >= 5 && state.isShowList
}));

const choosePost = (value: string): string => (state.searchValue = value);

const showHistoryClickHandler = () => {
  state.isShowList = !state.isShowList;
  state.isShowButtonHistory = !state.isShowButtonHistory;
};

const changeSearch = () => {
  emit('enter', state.searchValue);
  if (props.showHistory) searchStore.addHistorySearch(state.searchValue.trim());
};
const changeSearchValue = () => {
  emit('input', state.searchValue);
};

const hidehistory = () => {
  state.isShowList = false;
  state.isShowButtonHistory = false;
};

const showhistory = () => {
  state.isShowButtonHistory = true;
  if (!state.isShowButtonHistory) state.isShowList = true;
};

const removeItem = (item: string) => {
  searchStore.removeHistorySearch(item);
};

onMounted(() => {
  if (props.defaultValue) state.searchValue = props.defaultValue;
});
</script>

<style lang="scss" scoped>
@import './Search.scss';

.search {
  &__input {
    &:focus,
    &:focus-visible,
    &:active {
      & + svg {
        display: none;
      }
      padding-left: 10px;
    }
  }
}
</style>
