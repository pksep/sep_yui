<template>
  <div
    class="search-yui-kit__history history-yui-kit"
    :data-testid="props.dataTestid"
  >
    <ul
      :class="classes"
      v-if="state.globalResultsFunction"
      :data-testid="`${props.dataTestid}-List`"
    >
      <li
        class="history-yui-kit__item"
        v-for="(item, inx) in state.globalResultsFunction"
        :key="item.nameArea + item.searchResult"
        :data-testid="`${props.dataTestid}-List-Items${inx}`"
      >
        <Icon
          :name="IconNameEnum.document"
          :data-testid="`${props.dataTestid}-Items-Icon${inx}`"
        />
        <p
          class="history-yui-kit__text"
          @click="handleChoosePost(item)"
          :data-testid="`${props.dataTestid}-Items-History${inx}`"
        >
          <span
            class="result-yui-kit"
            :data-testid="`${props.dataTestid}-Result-NameArea${inx}`"
          >
            {{ trimText(item.nameArea) }}</span
          >
          <span
            class="result-yui-kit blue-yui-kit"
            :data-testid="`${props.dataTestid}-Result-Slash${inx}`"
            >/</span
          >
          <span
            class="result-yui-kit blue-yui-kit"
            :data-testid="`${props.dataTestid}-Result-SearchResult${inx}`"
          >
            {{ trimText(item.searchResult) }}</span
          >
        </p>
      </li>
    </ul>
    <ul
      :class="classes"
      v-if="!state.globalResultsFunction.length"
      :data-testid="`${props.dataTestid}-Nothing-List`"
    >
      <li
        class="history-yui-kit__item history-yui-kit__item--notfound"
        :data-testid="`${props.dataTestid}-Nothing-Items`"
      >
        <p
          class="history-yui-kit__text"
          :data-testid="`${props.dataTestid}-Nothing-Text`"
        >
          По вашему запросу ничего не найдено
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { ISearchProps, ResultSearchType } from './interface/interface';
import { IconNameEnum } from '../Icon/enum/enum';
import Icon from './../Icon/Icon.vue';
import { trimText } from './../../helpers/trimText';

const props = defineProps<Partial<ISearchProps>>();

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
  (e: 'choosePost', post: ResultSearchType): void;
}>();

/**
 * высчитывает и устанавливает классы для списка
 */
const classes = computed(() => ({
  'history-yui-kit__list': true,
  'history-yui-kit__list--opened': state.isShowResult,
  'history-yui-kit__list--scroll':
    state.globalResultsFunction.length >= 5 && state.isShowResult
}));

/**
 * @param item:  {
      icon: IconNameEnum;
      nameArea: string;
      searchResult: string;
    };
 * @returns
 */

/**
 * получает выбранный элемент списка и отправляет его родителю
 */
const handleChoosePost = (item: ResultSearchType) => {
  emit('choosePost', item);
};
</script>

<style lang="scss" scoped>
.history-yui-kit {
  color: var(--grey14);
  outline: none;
  background-color: var(--white);
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
    color: var(--grey14);
    border: 1px solid transparent;
    outline: none;
    background-color: var(--white);
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
    background-color: var(--white);
    border: 1px solid $BLUE-9CBEFF;
    border-radius: 5px;

    &--opened {
      opacity: 1;
      height: fit-content;
      transition: 0.3s ease-in-out;
      position: absolute;
      z-index: 15;
      align-content: flex-start;
    }

    &--scroll {
      height: 100px;
      overflow-y: scroll;
    }
  }

  &__item {
    background: var(--white);
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
      background-color: var(--blue9);
    }

    span {
      display: flex;
      height: 100%;
      flex-grow: 1;
      align-items: center;
      padding: 5px 50px 5px 5px;
      height: inherit;

      &:hover {
        background-color: var(--blue9);
      }

      &.result {
        padding: 0;
      }
    }

    &--notfound {
      justify-content: center;
      height: 34px;

      .history__text {
        color: var(--grey6);
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
        border: 1px solid transparent;
        outline: none;
        color: var(--grey6);
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

.blue-yui-kit {
  color: var(--blue1);
}
</style>
