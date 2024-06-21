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
        />
        <Icon :name="IconNameEnum.searchNormal" />
      </div>
    </div>
    <History
      :showHistory="props.showHistory"
      :isShowButtonHistory="state.isShowButtonHistory"
      :isShowList="state.isShowList"
      @choosePost="choosePost"
      v-if="props.showHistory"
    />
    <SearchResult
      :isShowList="state.isShowList"
      @choosePost="choosePost"
      v-if="props.global"
      :getAllResults="state.getAllResults"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, computed } from 'vue';
import { ISearchProps } from './interface';
import { useSearchStore } from '../../stores/search';
import { IconNameEnum } from '../Icon/enum';
import Icon from './../Icon/Icon.vue';
import Dropdown from './../Dropdown/Dropdown.vue';
import History from './History.vue';
import SearchResult from './SearchResult.vue';

const searchStore = useSearchStore();

const props = withDefaults(defineProps<ISearchProps>(), {
  showHistory: true,
  placeholder: 'Поиск',
  options: []
});

const state = reactive({
  searchValue: '',
  isShowList: false,
  isShowButtonHistory: true,
  getAllResults: computed(() => props.getAllResults())
});

const classesDropdown = computed(() => ({
  'search__icon-wrapper': true
}));

const getValueOption = (value: string) => {
  state.choosenOption = value;
};

const choosePost = (value: string): string => {
  state.searchValue = value;
};

const hidehistory = () => {
  state.isShowList = false;
  state.isShowButtonHistory = false;
};

const showhistory = () => {
  state.isShowButtonHistory = true;
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

// const getAllResults = () => props.getAllResults();

onMounted(() => {
  if (props.defaultValue) state.searchValue = props.defaultValue;
  console.log(state.getAllResults, 'search');
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
