<template>
  <div class="search" @mousemove="showhistory" @mouseleave="hidehistory">
    <div :class="classesDropdown">
      <div class="search__dropdown">
        <input
          type="text"
          class="search__input"
          v-model="state.searchValue"
          :placeholder="props.placeholder"
          @keydown.enter="changeSearch"
          @input="changeSearchValue"
          @focus="setFocusSearch"
          @blur="setBlurSearch"
        />
        <Icon :name="IconNameEnum.searchNormal" />
      </div>
    </div>
    <History
      :show-history="props.showHistory"
      :is-show-button-history="state.isShowButtonHistory"
      :is-show-list="state.isShowList"
      @choosePost="choosePost"
      v-if="props.showHistory"
    />
    <SearchResult
      :is-show-list="state.isShowList"
      @choosePost="choosePost"
      v-if="props.global"
      :global-results-function="state.globalResultsFunction"
      :is-show-result="state.isShowResult"
      :key="random(1, 999)"
      :search-value="state.searchValue"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, computed } from 'vue';
import { ISearchProps } from './interface';
import { useSearchStore } from '../../stores/search';
import { IconNameEnum } from '../Icon/enum';
import Icon from './../Icon/Icon.vue';
import History from './History.vue';
import SearchResult from './SearchResult.vue';
import { random } from 'lodash';

const searchStore = useSearchStore();

const props = withDefaults(defineProps<ISearchProps>(), {
  showHistory: true,
  placeholder: 'Поиск'
});

const state = reactive({
  isShowList: false,
  isShowButtonHistory: true,
  globalResultsFunction: computed(() => {
    return props.globalResultsFunction;
  }),
  isShowResult: false,
  searchValue: ''
});

const setFocusSearch = () => {
  state.isShowResult = true;
};

const setBlurSearch = () => {
  state.isShowResult = false;
};

const classesDropdown = computed(() => ({
  'search__icon-wrapper': true
}));

const choosePost = (value: string) => {
  state.searchValue = value;
};

const hidehistory = () => {
  state.isShowList = false;
  state.isShowResult = false;
  state.isShowButtonHistory = false;
};

const showhistory = () => {
  state.isShowButtonHistory = true;
  state.isShowResult = true;
  if (!state.isShowButtonHistory) state.isShowList = true;
};

const emit = defineEmits<{
  (e: 'enter', value: string): void;
  (e: 'input', value: string): void;
}>();

const changeSearch = () => {
  emit('enter', state.searchValue);
  if (props.showHistory) searchStore.addHistorySearch(state.searchValue.trim());
};

const changeSearchValue = () => {
  emit('input', state.searchValue);
};

onMounted(() => {
  if (props.defaultValue) state.searchValue = props.defaultValue;
  console.log(state.isShowResult, 'state.isShowResult');
});
</script>

<style lang="scss" scoped>
@import './Search.scss';

.search {
  &__input {
    &:focus,
    &:focus-visible,
    &:active {
      background-color: $white;
      & + svg {
        display: none;
      }
      padding-left: 10px;
    }
  }
}
</style>
