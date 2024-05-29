<template>
  <div class="search" @mouseleave="hidehistory">
    <div class="search__icon-wrapper">
      <input
        type="text"
        class="search__input"
        v-model="state.searchValue"
        :placeholder="props.placeholder"
        @keydown.enter="changeSearch"
      />
      <Icon name="searchNormal" />
    </div>

    <div class="search__history history" v-if="props.showHistory">
      <button
        type="button"
        v-if="state.isShowButtonHistory"
        @click="showHistoryClickHandler"
        :class="'history__button-text'"
      >
        Просмотреть историю запросов
      </button>
      <ul
        :class="
          state.isShowList
            ? 'history__list history__list--opened'
            : 'history__list '
        "
      >
        <li
          class="history__item"
          v-for="item of state.getHistorySearch"
          :key="item"
        >
          <span @click="() => choosePost(item)">{{ item }}</span
          ><button type="button" @click="removeItem(item)">
            <Icon name="exitSmall" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { ISearchProps } from './interface';
import { useSearchStore } from '../../stores/search';
import Icon from './../Icon/Icon';

const searchStore = useSearchStore();

const props = withDefaults(defineProps<ISearchProps>(), {
  showHistory: true,
  placeholder: 'Поиск'
});

const emit =
  defineEmits<{
    (e: 'enter', value: string): void;
  }>();

const state = reactive({
  searchValue: '',
  isClicked: false,
  getHistorySearch: computed(() => searchStore.getHistorySearch),
  isShowList: false,
  isShowButtonHistory: true
});

const choosePost = value => {
  state.searchValue = value;
};

const showHistoryClickHandler = () => {
  state.isShowList = !state.isShowList;
  state.isShowButtonHistory = !state.isShowButtonHistory;
};

const changeSearch = () => {
  emit('enter', state.searchValue);
  if (props.showHistory) searchStore.addHistorySearch(state.searchValue);
};

const hidehistory = () => {
  state.isShowList = false;
  state.isShowButtonHistory = true;
};

const removeItem = (item: string) => {
  state.getHistorySearch = searchStore.removeHistorySearch(item);
};

onMounted(() => {
  if (props.defaultValue) state.searchValue = props.defaultValue;
});
</script>

<style lang="scss" scope>
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
