<template>
  <div
    class="search-yui-kit"
    :style="searchStyles"
    @mousemove="showhistory"
    @mouseleave="hidehistory"
    :data-testid="props.dataTestid"
  >
    <div
      :class="classesDropdown"
      :data-testid="`${props.dataTestid}-Dropdown-Wrapper`"
    >
      <div
        class="search-yui-kit__dropdown"
        :data-testid="`${props.dataTestid}-Dropdown`"
      >
        <input
          type="text"
          class="search-yui-kit__input"
          v-model="state.searchValue"
          :placeholder="props.placeholder"
          @keydown.enter="unmountEnter"
          @input="changeSearchValue"
          @focus="handleFocus"
          @blur="handleBlur"
          :data-testid="`${props.dataTestid}-Dropdown-Input`"
        />
        <Icon class="search-icon" :name="IconNameEnum.searchNormal" />
        <Button
          v-if="state.searchValue"
          class="clear-button"
          :type="ButtonTypeEnum.ghost"
          @click="clearSearchValue"
          :data-testid="`${props.dataTestid}-Clear-Button`"
        >
          <Icon
            :name="IconNameEnum.exitSmall"
            color="var(--grey4)"
            :data-testid="`${props.dataTestid}-Clear-Button-Icon`"
          />
        </Button>
      </div>
    </div>
    <History
      v-if="!props.global && props.showHistory"
      :show-history="props.showHistory"
      :is-show-button-history="state.isShowButtonHistory"
      :is-show-list="state.isShowList"
      @choose-post="chosenPost"
      :data-testid="`${props.dataTestid}-Dropdown-History`"
    />
    <SearchResult
      v-if="props.global && state.focused"
      :global-results-function="props.globalResultsFunction"
      :search-value="state.searchValue"
      :data-testid="`${props.dataTestid}-Dropdown-SearchResult`"
      @choose-result="chosenResult"
      @scroll-paginate="handlePaginateResult"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, computed, CSSProperties, watch } from 'vue';
import { ISearchProps, ResultSearchType } from './interface/interface';
import { useSearchStore } from '../../stores/search';
import { IconNameEnum } from '../Icon/enum/enum';
import Icon from './../Icon/Icon.vue';
import History from './History.vue';
import SearchResult from './SearchResult.vue';
import { ButtonTypeEnum } from '@/components/Button/enum/enum.ts';
import Button from '../Button/Button.vue';

const searchStore = useSearchStore();

const props = withDefaults(defineProps<ISearchProps>(), {
  placeholder: 'Поиск',
  height: '42px',
  modelValue: '',
  dataTestid: 'Search',
  global: false,
  globalResultsFunction: () => []
});

const emit = defineEmits<{
  (e: 'enter', value: string): void;
  (e: 'input', value: string): void;
  (e: 'update:modelValue', value: string): void;
  (e: 'choose-result', value: ResultSearchType): void;
  (e: 'scroll-paginate'): void;
}>();

const state = reactive({
  isShowList: false,
  isShowButtonHistory: props.showHistory ?? false,
  searchValue: props.modelValue,
  placeholder: props.placeholder ?? '',
  focused: false
});

const searchStyles: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: props.height
};

const chosenPost = (value: string) => {
  state.searchValue = value;
  state.isShowList = false;
  emit('input', value);
  emit('update:modelValue', state.searchValue);
};

const chosenResult = (value: ResultSearchType) => {
  state.isShowList = false;
  emit('choose-result', value);
};

const handlePaginateResult = () => {
  emit('scroll-paginate');
};

/**
 * высчитывает классы для выпадающего списка запросов
 */
const classesDropdown = computed(() => ({
  'search-yui-kit__icon-wrapper': true
}));

const handleFocus = () => {
  state.focused = true;
};

const handleBlur = () => {
  setTimeout(() => {
    state.focused = false;
  }, 100);
};

const hidehistory = () => {
  state.isShowList = false;
  state.isShowButtonHistory = false;
};

/**
 * Показывает историю поиска
 */
const showhistory = () => {
  state.isShowButtonHistory = true;
  if (!state.isShowButtonHistory) state.isShowList = true;
};

/**
 * отправляет родителю значение поисковой строки, если это передан пропс, чтобы показывать историю поиска, то заносит значение в хранилище
 */
const unmountEnter = () => {
  emit('enter', state.searchValue);

  if (props.showHistory && state.searchValue)
    searchStore.addHistorySearch(state.searchValue.trim());
};

/**
 * отправляет родителю значение поисковой строки
 */
const changeSearchValue = () => {
  emit('input', state.searchValue);
  emit('update:modelValue', state.searchValue);
};

const clearSearchValue = () => {
  if (state.searchValue) {
    state.searchValue = '';
    changeSearchValue();
    unmountEnter();
  }
};

/**
 * если есть пропс с дефолтным значением, то записывает его в строку поиска
 */

onMounted(() => {
  if (props.defaultValue) state.searchValue = props.defaultValue;
});

watch(
  () => props.modelValue,
  newValue => {
    state.searchValue = newValue;
  }
);
</script>

<style lang="scss" scoped>
.search-yui-kit {
  position: relative;

  &:hover .history {
    display: grid;
  }

  &__dropdown {
    width: 100%;
    height: inherit;

    &:active,
    &:focus-within {
      .search-icon {
        display: none;
      }

      input {
        padding-left: 12px;
        padding-right: 36px;
        color: var(--black);
        caret-color: var(--border-blue);
        background-color: var(--white);

        &::placeholder {
          color: var(--white);
        }
      }
    }
  }

  &__input {
    width: 100%;
    color: #9a9b9d;
    height: inherit;
    border: 1px solid transparent;
    border-radius: 5px;
    transition: 0.3s ease-in-out;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background-color: var(--blue15);

    font-size: 14px;
    line-height: 16px;
    padding-left: 44px;

    &:hover,
    &:focus,
    &:focus-visible,
    &:active {
      border: 1px solid var(--border-blue);
      outline: none;
    }

    &:focus,
    &:focus-visible,
    &:active {
      & ~ .clear-button {
        opacity: 1;
      }
    }
  }

  &__icon-wrapper {
    height: inherit;
    color: #9a9b9d;
    position: relative;
    display: flex;
    align-items: center;
    width: inherit;

    .search-icon {
      position: absolute;
      left: 12px;
      top: 11px;
    }

    .clear-button {
      position: absolute;
      top: 8px;
      right: 7px;
      width: 24px;
      height: 24px;
      min-height: max-content;
      padding: 0;
      opacity: 0;
    }
  }
}
</style>
