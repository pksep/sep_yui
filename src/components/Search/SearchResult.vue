<template>
  <div
    class="search-yui-kit__result result-yui-kit"
    :data-testid="props.dataTestid"
  >
    <ul
      class="result-yui-kit__list"
      v-if="props.globalResultsFunction.length > 0"
      :data-testid="`${props.dataTestid}-List`"
      @scroll="handleScroll"
      ref="resultContentRef"
    >
      <li
        class="result-yui-kit__list__item"
        v-for="(item, inx) in props.globalResultsFunction"
        :key="inx"
        :data-testid="`${props.dataTestid}-List-Items${inx}`"
        @click="handleChooseResult(item)"
      >
        <Icon
          :name="item.icon || IconNameEnum.document"
          :data-testid="`${props.dataTestid}-Items-Icon${inx}`"
          :width="16"
          :height="16"
          class="result-yui-kit__list__item__icon"
        />
        <span :data-testid="`${props.dataTestid}-Result-NameArea${inx}`">
          {{ item.nameArea }}</span
        >
        <span
          class="blue-yui-kit"
          :data-testid="`${props.dataTestid}-Result-Slash${inx}`"
          >/</span
        >
        <span
          class="blue-yui-kit"
          :data-testid="`${props.dataTestid}-Result-SearchResult${inx}`"
        >
          {{ item.searchResult }}</span
        >
      </li>
    </ul>
    <ul
      v-else-if="!!props.searchValue"
      class="result-yui-kit__list result-yui-kit__empty"
      :data-testid="`${props.dataTestid}-Nothing-List`"
    >
      <li
        class="result-yui-kit__empty__item"
        :data-testid="`${props.dataTestid}-Nothing-Items`"
      >
        <p :data-testid="`${props.dataTestid}-Nothing-Text`">
          По вашему запросу ничего не найдено
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ISearchProps, ResultSearchType } from './interface/interface';
import { IconNameEnum } from '../Icon/enum/enum';
import Icon from './../Icon/Icon.vue';
import { ref, watch } from 'vue';

const props = withDefaults(defineProps<Partial<ISearchProps>>(), {
  dataTestid: 'SearchResult',
  globalResultsFunction: () => [],
  searchValue: ''
});

const emit = defineEmits<{
  (e: 'choose-result', result: ResultSearchType): void;
  (e: 'scroll-paginate'): void;
}>();

/**
 * @param item:  {
      icon: IconNameEnum;
      nameArea: string;
      searchResult: string;
    };
 * @returns
 */

const resultContentRef = ref<HTMLElement | null>(null);

/**
 * получает выбранный элемент списка и отправляет его родителю
 */
const handleChooseResult = (item: ResultSearchType) => {
  emit('choose-result', item);
};

const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement;
  const { scrollTop, scrollHeight, clientHeight } = target;

  if (scrollHeight - scrollTop - clientHeight < 5) {
    emit('scroll-paginate');
  }
};

// Watch for searchValue changes and scroll to top
watch(
  () => props.searchValue,
  () => {
    if (!resultContentRef.value) return;
    resultContentRef.value.scrollTop = 0;
  }
);
</script>

<style lang="scss" scoped>
.result-yui-kit {
  width: 100%;
  color: var(--grey14);
  outline: none;
  border-radius: 5px;
  margin-top: 5px;

  &__list {
    padding: 10px 5px;
    display: grid;
    width: inherit;
    list-style-type: none;
    transition: 0.3s ease-in-out;
    margin: 0;
    background-color: var(--white);
    border: 1px solid var(--border-primary-color);
    gap: 5px;
    border-radius: 5px;
    cursor: pointer;
    max-height: 300px;
    overflow: auto;

    &__item {
      background: var(--white);
      overflow: hidden;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 3px;
      border-radius: 5px;
      position: relative;
      height: 24px;
      padding: 4px 5px;

      &:hover {
        background-color: var(--primary-hover-light-color);
      }

      & span {
        font-weight: 400;
        font-size: 12px;
        line-height: 100%;
        letter-spacing: 0;
        color: var(--grey14);
        flex-shrink: 0;
      }

      & .blue-yui-kit {
        color: var(--primary-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-shrink: 1;
      }

      &__icon {
        margin-right: 2px;
        flex-shrink: 0;
      }
    }
  }

  &__empty {
    padding: 10px;

    &__item {
      display: flex;
      justify-content: center;

      & p {
        margin: 0;
        font-weight: 400;
        font-size: 12px;
        line-height: 100%;
        letter-spacing: 0;
        color: var(--text-neutral-color);
      }
    }
  }
}
</style>
