<template>
  <div class="search">
    <div class="search__icon-wrapper">
      <input
        type="search"
        class="search__input"
        :placeholder="props.placeholder || 'Поиск'"
      />
      <Icon name="searchNormal" />
    </div>
    <button
      type="button"
      class="search__history history"
      v-if="showHistory"
      @click="showHistoryClickHandler"
    >
      <p class="history__button-text">Просмотреть историю запросов</p>
      <ul
        :class="
          state.isClicked
            ? 'history__list'
            : 'history__list history__list--opened'
        "
      >
        <li class="history__item" v-for="post of [1, 2, 3]">{{ post }}</li>
      </ul>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { ISearchProps } from './interface';
import Icon from './../Icon/Icon';

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
  isClicked: false
});

const showHistoryClickHandler = () => {
  state.isClicked = !state.isClicked;
};

const addPost = post => {};
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
