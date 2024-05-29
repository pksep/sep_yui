<template>
  <div class="search">
    <div class="search__icon-wrapper">
      <input
        type="text"
        class="search__input"
        ref="inputSearchRef"
        :placeholder="props.placeholder || 'Поиск'"
        @change="e => addLocalStoragePost(e.target.value)"
      />
      <Icon name="searchNormal" />
    </div>
    <div class="search__history history" v-if="showHistory">
      <button
        type="button"
        v-if="isClicked"
        @click="showHistoryClickHandler"
        :class="
          props.showHistory
            ? 'history__button-text'
            : 'history__button-text history__button-text--closed'
        "
      >
        Просмотреть историю запросов
      </button>
      <ul
        :class="
          state.isClicked
            ? 'history__list'
            : 'history__list history__list--opened'
        "
      >
        <li
          class="history__item"
          v-for="post of state.historySearch"
          :key="post"
          @click="post => choosePost(post)"
        >
          <span>{{ post }}</span
          ><button type="button"><Icon name="exitSmall" /></button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { ISearchProps } from './interface';
import Icon from './../Icon/Icon';

const props = withDefaults(defineProps<ISearchProps>(), {
  showHistory: true
});

const inputSearchRef = ref(null);

interface IEnterSearchEmit {
  value: string;
}

const emit =
  defineEmits<{
    (e: 'enter', event: IEnterSearchEmit): void;
  }>();

const state = reactive({
  isClicked: false,
  searchValue: '',
  historySearch: []
});

const showHistoryClickHandler = () => {
  state.isClicked = !state.isClicked;
};

const choosePost = post => {
  if (inputSearchRef.value) {
    state.searchValue = post;
    inputSearchRef.value = state.searchValue.textContent;
    showHistoryClickHandler();
  }
};

const addLocalStoragePost = post => {
  if (post.length > 0 && props.showHistory && post !== null) {
    state.historySearch.push(post);
    // emit('enter', {
    //   value: post
    // });
    console.log(post, 'post');
    localStorage.setItem('SEARCH_DATA.', JSON.stringify(state.historySearch));
  }
};

onMounted(() => {
  state.historySearch = JSON.parse(localStorage.getItem('SEARCH_DATA.'));
  console.log(state.historySearch, 'history');
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
