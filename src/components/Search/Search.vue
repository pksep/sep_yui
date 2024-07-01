<template>
  <div class="search-ui-kit" @mousemove="showhistory" @mouseleave="hidehistory">
    <div :class="classesDropdown">
      <div class="search-ui-kit__dropdown">
        <input
          type="text"
          class="search-ui-kit__input"
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
      v-if="props.showHistory"
    />
    <SearchResult
      :is-show-list="state.isShowList"
      v-if="props.global"
      :global-results-function="state.globalResultsFunction"
      :is-show-result="state.isShowResult"
      :key="state.generateUniqueId()"
      :search-value="state.searchValue"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, computed } from 'vue';
import { ISearchProps } from './interface/interface';
import { useSearchStore } from '../../stores/search';
import { IconNameEnum } from '../Icon/enum/enum';
import Icon from './../Icon/Icon.vue';
import History from './History.vue';
import SearchResult from './SearchResult.vue';
import { generateUniqueId } from './../../helpers/genarate-unic-id';

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
  searchValue: '',
  generateUniqueId: generateUniqueId
});

const emit = defineEmits<{
  (e: 'enter', value: string): void;
  (e: 'input', value: string): void;
}>();

/**
 * Во время фокуса, показывает результат поиска
 */
const setFocusSearch = () => {
  state.isShowResult = true;
};

/**
 * Во время нефокуса, скрывает результат поиска
 */
const setBlurSearch = () => {
  state.isShowResult = false;
};

/**
 * высчитывает классы для выпадающего списка запросов
 */
const classesDropdown = computed(() => ({
  'search-ui-kit__icon-wrapper': true
}));

/**
 *скрывает историю поиска
 */
const hidehistory = () => {
  state.isShowList = false;
  state.isShowResult = false;
  state.isShowButtonHistory = false;
};

/**
 * Показывает историю поиска
 */
const showhistory = () => {
  state.isShowButtonHistory = true;
  state.isShowResult = true;
  if (!state.isShowButtonHistory) state.isShowList = true;
};

/**
 * отправляет родителю значение поисковой строки, если это передан пропс, чтобы показывать историю поиска, то заносит значение в хранилище
 */
const changeSearch = () => {
  emit('enter', state.searchValue);
  if (props.showHistory) searchStore.addHistorySearch(state.searchValue.trim());
};

/**
 * отправляет родителю значение поисковой строки
 */
const changeSearchValue = () => {
  emit('input', state.searchValue);
};

/**
 * если есть пропс с дефолтным значением, то записывает его в строку поиска
 */
onMounted(() => {
  if (props.defaultValue) state.searchValue = props.defaultValue;
});
</script>

<style lang="scss" scoped>
.search-ui-kit {
  position: relative;
  width: 100%;

  &:hover .history {
    display: grid;
  }

  &__input {
    width: inherit;
    color: $GREY-9A9B9D;
    padding: 12px 11px 12px 35px;
    border: 1px solid TRANSPARENT;
    border-radius: 5px;
    transition: 0.3s ease-in-out;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background-color: $BLUE-F8F9FD;

    &:hover,
    &:focus,
    &:focus-visible,
    &:active {
      border: 1px solid $BLUE-9CBEFF;
      outline: none;
    }

    &:focus,
    &:focus-visible,
    &:active {
      color: $BLUE-9CBEFF;
    }

    &:focus + svg,
    &:focus-visible + svg,
    &:active + svg {
      color: $BLUE-9CBEFF;
    }

    &__input {
      &:focus,
      &:focus-visible,
      &:active {
        background-color: $WHITE;
        & + svg {
          display: none;
        }
        padding-left: 10px;
      }
    }
  }

  &__icon-wrapper {
    color: $GREY-9A9B9D;
    position: relative;
    min-height: 49px;
    display: flex;
    align-items: center;
    width: inherit;

    svg {
      position: absolute;
      left: 10px;
      top: 8px;
    }
  }
}
</style>
