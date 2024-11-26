<template>
  <div class="search-yui-kit__history history-yui-kit" v-if="props.showHistory">
    <button
      type="button"
      v-if="state.getHistorySearch.length > 0 && state.isShowButtonHistory"
      @click="showHistoryClickHandler"
      :class="'history-yui-kit__button-text'"
    >
      Просмотреть историю запросов
    </button>

    <ul :class="classes">
      <li
        class="history-yui-kit__item"
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

const props = defineProps<Partial<ISearchProps>>();

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
  'history-yui-kit__list': true,
  'history-yui-kit__list--opened': state.isShowList,
  'history-yui-kit__list--scroll':
    state.getHistorySearch.length >= 5 && state.isShowList
}));

const showHistoryClickHandler = () => {
  state.isShowList = true;
  state.isShowButtonHistory = false;
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
.search-yui-kit {
  position: relative;
  width: 100%;

  &:hover .history-yui-kit {
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

.history-yui-kit {
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
    justify-content: center;

    &:hover {
      cursor: pointer;
    }

    &--closed {
      display: none;
    }
  }

  &__list {
    display: none;
    width: inherit;
    list-style-type: none;
    height: 0;
    transition: 0.3s ease-in-out;
    padding: 0;
    margin: 0;
    background-color: $WHITE;
    padding-left: 10px;
    padding-right: 10px;

    &--opened {
      display: grid;
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

    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    height: 30px;

    &:not(:last-child) {
      border-bottom: 1px solid $WHITE-E7E7E7;
    }

    span {
      display: flex;
      height: 100%;
      flex-grow: 1;
      align-items: center;
      padding: 5px 50px 5px 5px;
      height: 24px;
      border-radius: 5px;
    }

    button {
      display: none;
      position: absolute;
      right: 0px;
      svg {
        width: 24px;
        height: 24px;
      }
    }

    &:hover {
      cursor: pointer;
      span {
        background-color: $BLUE-F2F7FF;
      }
      button {
        background: none;
        border: 1px solid $TRANSPARENT;
        outline: none;
        color: $GREY-757D8A;
        height: 20px;

        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
