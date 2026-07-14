<template>
  <ScrollWrapper
    ref="scrollWrapperRef"
    class="table"
    @unmount-scroll="unmountScroll"
    @unmount-paginate="unmountPaginate"
    :is-show-vertical-scroll="props.isShowVerticalScroll"
    :is-show-horizontal-scroll="props.isShowHorizontalScroll"
    :data-testid="`${props.dataTestid}-ScrollWrapper`"
  >
    <table
      ref="tableRef"
      :id="props.tableId"
      class="table__table"
      :data-testid="`${props.dataTestid}`"
    >
      <slot>
        <colgroup>
          <slot name="colspan"></slot>
        </colgroup>

        <thead
          v-if="$slots['head']"
          ref="theadRef"
          :id="props.theadId"
          class="table__head"
          :data-testid="`${props.dataTestid}-Thead`"
        >
          <slot name="head"></slot>

          <HeadTableRow
            v-if="$slots['search']"
            class="table__search-tr"
            :id="props.search?.rowId"
            ref="searchRowRef"
            :data-testid="`${props.dataTestid}-Search-Row`"
          >
            <TableTh
              :colspan="props.columnCount || state.maxColumnCount"
              class="table__search-th"
              :id="props.search?.headId"
              :data-testid="`${props.dataTestid}-SearchRow-Search`"
            >
              <slot name="search"></slot>
            </TableTh>
          </HeadTableRow>
        </thead>

        <slot v-if="!isError" name="body-group">
          <tbody
            :id="props.tbodyId"
            ref="tbodyRef"
            v-if="$slots['body']"
            class="table__body"
            :data-testid="`${props.dataTestid}-Tbody`"
          >
            <slot name="body"></slot>
          </tbody>
        </slot>
      </slot>
    </table>

    <div v-if="props.isError" class="table__error-wrapper">
      <div class="table__error-content">
        <Icon
          class="table__error-icon"
          :width="112"
          :height="100"
          :name="IconNameEnum.tableError"
        />

        <div class="table__error-header">Таблица не загрузилась</div>

        <div class="table__error-text">
          Не удалось получить данные. Проверьте соединение с интернетом или
          попробуйте обновить таблицу
        </div>
      </div>

      <slot name="error-button">
        <Button
          v-if="onErrorHandler"
          class="table__error-button"
          :size="SizesEnum.small"
          @click="onErrorHandler"
        >
          <template #left-icon>
            <div class="table__wrapper">
              <Icon :name="IconNameEnum.rearrange" :width="16" :height="16" />
            </div>
          </template>

          <template #default>
            {{ errorLabel }}
          </template>
        </Button>
      </slot>
    </div>
  </ScrollWrapper>
</template>

<script setup lang="ts">
import TableTh from '@/components/Table/TableTh.vue';
import changeStyleProperties from '@/helpers/change-style-properties';
import { onMounted, reactive, ref } from 'vue';
import type {
  ITableEmit,
  ITableProps
} from '@/components/Table/interface/interface';
import HeadTableRow from '@/components/Table/HeadTableRow.vue';
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper.vue';
import Icon from '@/components/Icon/Icon.vue';
import Button from '@/components/Button/Button.vue';
import { IconNameEnum } from '@/components/Icon/enum/enum';
import { SizesEnum } from '@/common/sizes';

defineOptions({
  name: 'TableNew'
});

const props = withDefaults(defineProps<ITableProps>(), {
  dataTestid: 'Table',
  isShowHorizontalScroll: false,
  isShowVerticalScroll: false,
  isError: false,
  errorLabel: 'Обновить таблицу'
});

const emit = defineEmits<ITableEmit>();

const state = reactive<{
  headHeight: number;
  maxColumnCount: number;
}>({
  headHeight: 0,
  maxColumnCount: 0
});

const tableRef = ref<HTMLElement | null>(null);
const theadRef = ref<HTMLElement | null>(null);
const tbodyRef = ref<HTMLElement | null>(null);
const searchRowRef = ref<InstanceType<typeof HeadTableRow> | null>(null);
const scrollWrapperRef = ref<InstanceType<typeof ScrollWrapper> | null>(null);

const unmountScroll = (e: Event) => {
  if (props.isError) return;
  emit('unmount-scroll', e);
};

const unmountPaginate = (isCanPaginate: boolean): void => {
  if (props.isError) return;
  emit('unmount-paginate', isCanPaginate);
};

const setHeadHeight = () => {
  if (!tableRef.value || !scrollWrapperRef.value) return;

  const head = tableRef.value.querySelector('thead');
  if (!head) return;

  const headHeight = head.getBoundingClientRect().height;

  state.headHeight = headHeight;

  changeStyleProperties(
    {
      '--scroll-track-margin-top': `${headHeight}px`
    },
    scrollWrapperRef.value.$el
  );
};

/**
 * Скроллит вначало
 */
const scrollToTop = () => {
  if (scrollWrapperRef.value) {
    scrollWrapperRef.value.scrollToTop();
  }
};

/**
 * устанавливает минимальное значение для таблицы, если в ней есть поиск
 * и не задано минимальное значение
 */
const setSearchMinHeight = () => {
  if (scrollWrapperRef.value && searchRowRef.value) {
    const style = getComputedStyle(scrollWrapperRef.value.$el);
    const minHeight = Number(style.minHeight.replace(/\D/g, ''));

    if (minHeight && minHeight > 0) {
      return;
    }

    changeStyleProperties(
      { 'min-height': `${state.headHeight + 108}px` },
      scrollWrapperRef.value.$el
    );
  }
};

const setMaxCountColumn = (): void => {
  let maxCountColumn = 1;

  if (theadRef.value) {
    for (let idx = 0; idx < theadRef.value.children.length; idx++) {
      maxCountColumn = Math.max(
        theadRef.value.children[idx].children.length,
        maxCountColumn
      );
    }

    state.maxColumnCount = maxCountColumn;
  }
};

const theadMutationObserver = new MutationObserver(() => {
  setMaxCountColumn();
});

const resizeObserver = new ResizeObserver(() => {
  setHeadHeight();
});

defineExpose({
  scrollToTop,
  setHeightSlot: scrollWrapperRef.value?.setHeightSlot,
  scrollWrapperRef,
  tbodyRef,
  tableRef,
  theadRef
});

onMounted(() => {
  setHeadHeight();
  setMaxCountColumn();
  window.addEventListener('resize', setHeadHeight);
  if (tableRef.value) {
    resizeObserver.observe(tableRef.value);
  }

  if (theadRef.value) {
    theadMutationObserver.observe(theadRef.value, {
      childList: true,
      subtree: true
    });
  }

  setSearchMinHeight();
});
</script>

<style scoped lang="scss">
.table {
  --td-vertical-padding: 2px;
  --td-horizontal-padding: 5px;
  --scroll-slot-background-color: var(--table-background-color, var(--white));

  &__table {
    position: relative;
    width: 100%;
    border: none;
    border-collapse: separate;
    border-spacing: 0;
    table-layout: fixed;

    background-color: var(--table-background-color, var(--white));
  }

  &__head {
    position: sticky;
    top: 0;
    z-index: 2;
  }

  &__wrapper {
    display: flex;
    justify-content: center;
  }

  &__search-th {
    --th-horizontal-padding: 8px;
    --th-vertical-padding: 2px;
    border-bottom: 1px solid var(--border-color);
    background-color: var(--table-background-color, var(--white));
  }

  &:has(.table__error-wrapper) :deep(.scroll-wrapper__slot) {
    display: flex;
    flex-direction: column;
  }

  & .scroll-wrapper__slot {
    background-color: var(--table-background-color, var(--white));
  }

  &__error-wrapper {
    position: sticky;
    left: 0;
    top: 0;

    padding: 15px;
    flex: 1 0 223px;
    width: 100%;
    background-color: var(--background-light-color);
  }

  &__error-wrapper,
  &__error-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }

  &__error-content {
    gap: 5px;
  }

  &__error-icon {
  }

  &__error-text,
  &__error-header {
    text-align: center;
  }

  &__error-header {
    color: var(--text-color);
    font-weight: 700;
  }

  &__error-text {
    max-width: 502px;

    color: var(--text-light-color);

    font-size: 14px;
    font-weight: 600;
  }

  &__error-button {
  }
}
</style>
