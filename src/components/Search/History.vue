<template>
  <div class="search__history history" v-if="props.showHistory">
    <button
      type="button"
      v-if="state.getHistorySearch.length > 0"
      @click="showHistoryClickHandler"
      :class="'history__button-text'"
    >
      Просмотреть историю запросов
    </button>

    <ul :class="classes">
      <li
        class="history__item"
        v-for="item in state.getHistorySearch"
        :key="item"
      >
        <span @click="handleChoosePost(item)"> {{ trimText(item) }}</span
        ><button type="button" @click="removeItem(item)">
          <Icon :name="IconNameEnum.exitSmall" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { ISearchProps } from './interface/interface';
import { IconNameEnum } from '../Icon/enum/enum';
import Icon from './../Icon/Icon.vue';
import { useSearchStore } from '../../stores/search';
import { trimText } from './../../helpers/trimText';

const searchStore = useSearchStore();

const props = defineProps<ISearchProps>();

const state = reactive({
  getHistorySearch: computed(() => {
    return searchStore.getHistorySearch;
  }),
  isShowList: props.isShowList,
  isShowButtonHistory: props.isShowButtonHistory
});

const emit = defineEmits<{
  (e: 'choosePost', value: string): void;
}>();

const classes = computed(() => ({
  history__list: true,
  'history__list--opened': state.isShowList,
  'history__list--scroll':
    state.getHistorySearch.length >= 5 && state.isShowList
}));

const showHistoryClickHandler = () => {
  state.isShowList = !state.isShowList;
  state.isShowButtonHistory = !state.isShowButtonHistory;
};

/**
 * @param item: string
 * @returns
 */

const removeItem = (item: string) => {
  searchStore.removeHistorySearch(item);
};

/**
 * @param item: string
 * @returns
 */

const handleChoosePost = (item: string) => {
  emit('choosePost', item);
};
</script>

<style lang="scss" scoped>
.search {
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

  &__history {
    display: grid;
    gap: 5px;
    list-style: none;
    width: inherit;
  }

  &__dropdown {
    width: 100%;
  }
}

.history {
  color: $GREY-282828;
  outline: none;
  background-color: $WHITE;
  border-radius: 5px;
  display: none;

  &__button-text {
    position: absolute;
    z-index: 100000;
    margin: 0;
    min-height: 56px;
    display: flex;
    align-items: center;
    padding: 8px 10px;
    color: $GREY-282828;
    border: 1px solid TRANSPARENT;
    outline: none;
    background-color: $WHITE;
    border-radius: 5px;
    width: inherit;

    &:hover {
      cursor: pointer;
    }

    &--closed {
      display: none;
    }
  }

  &__list {
    display: grid;
    width: inherit;
    list-style-type: none;
    height: 0;
    opacity: 0;
    transition: 0.3s ease-in-out;
    padding: 0;
    margin: 0;
    background-color: $WHITE;

    &--opened {
      opacity: 1;
      height: fit-content;
      transition: 0.3s ease-in-out;
      position: absolute;
      z-index: 2222222;
      align-content: flex-start;
    }

    &--scroll {
      height: 100px;
      overflow-y: scroll;
    }
  }

  &__item {
    background: $WHITE;
    overflow: hidden;
    border-bottom: 1px solid $WHITE-E7E7E7;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    position: relative;
    height: 24px;
    padding-bottom: 3px;

    span {
      display: flex;
      height: 100%;
      flex-grow: 1;
      align-items: center;
      padding: 5px 50px 5px 5px;
      height: inherit;

      &:hover {
        background-color: $BLUE-F2F7FF;
      }
    }

    button {
      display: none;
      width: 24px;
      height: 24px;
      position: absolute;
      right: 10px;

      svg {
        width: 24px;
        height: 24px;
      }
    }

    &:hover {
      cursor: pointer;

      button {
        background: none;
        border: 1px solid $TRANSPARENT;
        outline: none;
        color: $GREY-757D8A;
        display: block;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
