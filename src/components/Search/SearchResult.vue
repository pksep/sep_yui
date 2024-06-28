<template>
  <div class="search__history history history">
    <ul :class="classes" v-if="state.globalResultsFunction">
      <li
        class="history__item"
        v-for="item in state.globalResultsFunction"
        :key="item.nameArea + item.searchResult"
      >
        <Icon :name="IconNameEnum.document" />
        <p class="history__text" @click="handleChoosePost(item)">
          <span class="result"> {{ trimText(item.nameArea) }}</span>
          <span class="result blue">/</span>
          <span class="result blue"> {{ trimText(item.searchResult) }}</span>
        </p>
      </li>
    </ul>
    <ul :class="classes" v-if="!state.globalResultsFunction.length">
      <li class="history__item history__item--notfound">
        <p class="history__text">По вашему запросу ничего не найдено</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { ISearchProps, resultSearchType } from './interface/interface';
import { IconNameEnum } from '../Icon/enum/enum';
import Icon from './../Icon/Icon.vue';
import { trimText } from './../../helpers/trimText';

const props = defineProps<ISearchProps>();

const state = reactive({
  isShowList: props.isShowList,
  globalResultsFunction: computed(() =>
    typeof props.globalResultsFunction === 'function'
      ? props.globalResultsFunction()
      : []
  ),
  isShowResult: props.isShowResult,
  searchValue: props.searchValue
});

const emit = defineEmits<{
  (e: 'choosePost', post: resultSearchType): void;
}>();

const classes = computed(() => ({
  history__list: true,
  'history__list--opened': state.isShowResult,
  'history__list--scroll':
    state.globalResultsFunction.length >= 5 && state.isShowResult
}));

const handleChoosePost = (item: resultSearchType) => {
  emit('choosePost', item);
};
</script>

<style lang="scss" scoped>
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
    transition: 0.3s ease-in-out;
    padding: 0;
    margin: 0;
    background-color: $WHITE;
    border: 1px solid $BLUE-9CBEFF;
    border-radius: 5px;

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
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 5px;
    position: relative;
    height: 24px;
    padding-bottom: 3px;

    &:hover {
      background-color: $BLUE-F2F7FF;
    }

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

      &.result {
        padding: 0;
      }
    }

    &--notfound {
      justify-content: center;
      height: 34px;

      .history__text {
        color: $GREY-757D8A;
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

  &__text {
    display: flex;
    justify-content: flex-start;
    gap: 5px;
    text-wrap: nowrap;
  }
}

.blue {
  color: $BLUE-77A6FF;
}
</style>
