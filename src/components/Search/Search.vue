<template>
  <div class="search">
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
        v-if="state.isClicked"
        @click="showHistoryClickHandler"
        :class="'history__button-text'"
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
          v-for="item of state.getHistorySearch"
          :key="item"
          @click="item => choosePost(item)"
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
import { useSearchStore } from '../../stores/search';
import Icon from './../Icon/Icon';

const searchStore = useSearchStore();

const props = withDefaults(defineProps<ISearchProps>(), {
  showHistory: true,
  placeholder: 'Поиск'
});

const emit = defineEmits<{
  (e: 'enter', value: string): void;
}>();

const state = reactive({
  searchValue: '',
  isClicked: true,
  getHistorySearch: computed(() => searchStore.getHistorySearch)
});

const choosePost = value => {
  console.log("value: ", value);
  state.searchValue = value;
};

const changeSearch = () => {
  console.log("changeSearch: ", state.searchValue, props.showHistory)
  emit('enter', state.searchValue);
  if (props.showHistory)
    searchStore.addHistorySearch(state.searchValue);
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
