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
          @keydown.enter="changeSearch"
          @input="changeSearchValue"
          @focus="setFocusSearch"
          :data-testid="`${props.dataTestid}-Dropdown-Input`"
        />
        <Icon :name="IconNameEnum.searchNormal" />
      </div>
    </div>
    <History
      :show-history="props.showHistory"
      :is-show-button-history="state.isShowButtonHistory"
      :is-show-list="state.isShowList"
      v-if="props.showHistory"
      @choosePost="choosenPost"
      :data-testid="`${props.dataTestid}-Dropdown-History`"
    />
    <SearchResult
      :is-show-list="state.isShowList"
      v-if="props.global"
      :global-results-function="state.globalResultsFunction"
      :is-show-result="state.isShowResult"
      :key="state.generateUniqueId()"
      :search-value="state.searchValue"
      :data-testid="`${props.dataTestid}-Dropdown-SearchResult`"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, computed, CSSProperties, watch } from 'vue';
import { ISearchProps } from './interface/interface';
import { useSearchStore } from '../../stores/search';
import { IconNameEnum } from '../Icon/enum/enum';
import Icon from './../Icon/Icon.vue';
import History from './History.vue';
import SearchResult from './SearchResult.vue';
import { generateUniqueId } from './../../helpers/genarate-unic-id';

const searchStore = useSearchStore();

const props = withDefaults(defineProps<ISearchProps>(), {
  placeholder: 'Поиск',
  height: '42px',
  modelValue: '',
  dataTestid: 'Search'
});

const emit = defineEmits<{
  (e: 'enter', value: string): void;
  (e: 'input', value: string): void;
  (e: 'update:modelValue', value: string): void;
}>();

const state = reactive({
  isShowList: false,
  isShowButtonHistory: props.showHistory ?? false,
  globalResultsFunction: computed(() => {
    return props.globalResultsFunction;
  }),
  isShowResult: false,
  searchValue: props.modelValue,
  generateUniqueId: generateUniqueId,
  placeholder: props.placeholder ?? ''
});

const searchStyles: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: props.height
};

const choosenPost = (value: string) => {
  state.searchValue = value;
  state.isShowList = false;
  emit('input', value);
  emit('update:modelValue', state.searchValue);
};

/**
 * высчитывает классы для выпадающего списка запросов
 */
const classesDropdown = computed(() => ({
  'search-yui-kit__icon-wrapper': true
}));

/**
 * Во время фокуса, показывает результат поиска
 */
const setFocusSearch = () => {
  state.isShowResult = true;
};

/**
 * Скрывает историю поиска
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
  emit('update:modelValue', state.searchValue);
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
      svg {
        display: none;
      }

      input {
        padding-left: 12px;
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

    &__input {
      &:focus,
      &:focus-visible,
      &:active {
        background-color: var(--white);
        padding-left: 12px;
        & + svg {
          display: none;
        }
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

    svg {
      position: absolute;
      left: 12px;
      top: 11px;
    }
  }
}
</style>
