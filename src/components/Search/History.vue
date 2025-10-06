<template>
  <div
    class="search-yui-kit__history history-yui-kit"
    v-if="props.showHistory"
    :data-testid="props.dataTestid"
  >
    <Button
      :type="ButtonTypeEnum.outline"
      v-if="state.isShowButtonHistory"
      @click="showHistoryClickHandler"
      :class="'history-yui-kit__button-text show-result'"
      :data-testid="`${props.dataTestid}-ShowResult`"
    >
      <span :data-testid="`${props.dataTestid}-ShowResult-Title`">
        Просмотреть историю запросов
      </span>
    </Button>

    <ul
      :class="classes"
      v-if="state.getHistorySearch?.length"
      :data-testid="`${props.dataTestid}-ShowResult-List`"
    >
      <li
        class="history-yui-kit__item"
        v-for="(item, inx) in state.getHistorySearch"
        :key="item"
        :data-testid="`${props.dataTestid}-ShowResult-Title${inx}`"
      >
        <span
          @click="handleChoosePost(item)"
          :data-testid="`${props.dataTestid}-HandleChoosePost-Title${inx}`"
        >
          {{ trimText(item) }}</span
        ><Button
          :type="ButtonTypeEnum.ghost"
          @click="removeItem(item)"
          :data-testid="`${props.dataTestid}-ButtonItem-Remove${inx}`"
        >
          <Icon
            :name="IconNameEnum.exitSmall"
            :width="16"
            :data-testid="`${props.dataTestid}-ButtonItem-RemoveIcon${inx}`"
          />
        </Button>
      </li>
    </ul>
    <Button
      v-else-if="!state.isShowButtonHistory"
      :type="ButtonTypeEnum.outline"
      :class="'history-yui-kit__button-text'"
      :data-testid="`${props.dataTestid}-ButtonTypeEnum-RemoveButton`"
    >
      <span
        :data-testid="`${props.dataTestid}-ButtonTypeEnum-EmptyContent`"
        class="empty-content"
        >По вашему запросу ничего не найдено</span
      >
    </Button>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { ISearchProps } from './interface/interface';
import { IconNameEnum } from '../Icon/enum/enum';
import Icon from './../Icon/Icon.vue';
import { trimText } from './../../helpers/trimText';
import Button from '../Button/Button.vue';
import { ButtonTypeEnum } from '../Button/enum/enum.ts';
import { useSearch } from '@/extenstions/search';

const { getHistorySearch, removeHistorySearch } = useSearch();

const props = withDefaults(defineProps<Partial<ISearchProps>>(), {
  dataTestid: 'History'
});

const state = reactive({
  getHistorySearch,
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
  removeHistorySearch(item);
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
    color: #9a9b9d;
    padding: 12px 11px 12px 35px;
    border: 1px solid TRANSPARENT;
    border-radius: 5px;
    transition: 0.3s ease-in-out;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background-color: var(--blue15);

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
      color: var(--border-blue);
    }

    &:focus + svg,
    &:focus-visible + svg,
    &:active + svg {
      color: var(--border-blue);
    }
  }

  &__icon-wrapper {
    color: #9a9b9d;
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
  color: #282828;
  outline: none;
  background-color: var(--white);
  border-radius: 5px;
  display: none;

  & button.history-yui-kit__button-text {
    margin-top: 5px;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: inherit;
    box-shadow: 0 4px 9.8px 0 #0000000d;
    top: 45px;
    padding: 5px;
    &:not(.show-result) {
      pointer-events: none;
    }

    & span {
      font-size: 14px;
      font-weight: normal;
      color: #282828;
      width: 100%;
      height: 100%;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;

      &.empty-content {
        color: var(--grey6);
      }
    }

    &.show-result:hover {
      & span {
        background-color: var(--blue15);
      }
    }

    &.show-result:active {
      background-color: var(--white) !important;
      & span {
        background-color: var(--blue10);
        color: var(--blue1);
      }
    }
  }

  &__list {
    display: none;
    width: inherit;
    list-style-type: none;
    height: 0;
    transition: 0.3s ease-in-out;
    padding: 5px;
    margin: 0;
    background-color: var(--white);
    box-shadow: 0 4px 9.8px 0 #0000000d;
    border: 0.5px solid var(--border-blue);
    border-radius: 5px;

    &--opened {
      display: grid;
      gap: 5px;
      height: fit-content;
      transition: 0.3s ease-in-out;
      position: absolute;
      z-index: 2222222;
      align-content: flex-start;
      margin-top: 5px;
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
    justify-content: space-between;
    position: relative;
    height: 30px;
    border-radius: 5px;

    span {
      display: flex;
      flex-grow: 1;
      align-items: center;
      font-weight: normal;
      padding: 5px 50px 5px 10px;
      height: 24px;
      border-radius: 5px;
    }

    button {
      display: none;
      position: absolute;
      right: 5px;
    }

    &:hover {
      cursor: pointer;
      background-color: var(--blue9);

      button {
        width: 16px;
        height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        color: var(--grey4);

        &:hover {
          background-color: transparent;
        }
      }
    }

    &:active {
      background-color: var(--blue10);
    }
  }
}

.search-yui-kit__history {
  position: absolute;
  top: 100%;
  width: inherit;
  height: 45px;
  z-index: 100000;
}
</style>
