<template>
  <ScrollWrapperNew
    ref="scrollWrapperRef"
    class="table"
    @unmount-scroll="unmountScroll"
    :is-show-vertical-scroll="props.isShowVerticalScroll"
    :is-show-horizontal-scroll="props.isShowHorizontalScroll"
    :data-testid="`${props.dataTestid}-ScrollWrapper`"
  >
    <table
      ref="tableRef"
      class="table__table"
      :data-testid="`${props.dataTestid}`"
    >
      <slot>
        <slot name="colspan"></slot>

        <thead
          v-if="$slots['head']"
          ref="theadRef"
          class="table__head"
          :data-testid="`${props.dataTestid}-Thead`"
        >
          <slot name="head"></slot>

          <HeadTableRowNew
            v-if="$slots['search']"
            class="table__search-tr"
            ref="searchRowRef"
            :data-testid="`${props.dataTestid}-Search-Row`"
          >
            <TableTh
              :colspan="countColumn"
              class="table__search-th"
              :data-testid="`${props.dataTestid}-SearchRow-Search`"
            >
              <slot name="search"></slot>
            </TableTh>
          </HeadTableRowNew>
        </thead>

        <slot name="body-group">
          <tbody
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
  </ScrollWrapperNew>
</template>

<script setup lang="ts">
import ScrollWrapperNew from '@/components/ScrollWrapper/ScrollWrapperNew.vue';
import HeadTableRowNew from '@/components/Table/HeadTableRowNew.vue';
import TableTh from '@/components/Table/TableTh.vue';
import changeStyleProperties from '@/helpers/change-style-properties';
import { computed, onMounted, reactive, ref } from 'vue';
import type {
  ITableEmit,
  ITableProps
} from '@/components/Table/interface/interface';

defineOptions({
  name: 'TableNew'
});

const props = withDefaults(defineProps<ITableProps>(), {
  dataTestid: 'Table',
  isShowHorizontalScroll: false,
  isShowVerticalScroll: false
});

const emit = defineEmits<ITableEmit>();

const state = reactive<{
  headHeight: number;
}>({
  headHeight: 0
});

const tableRef = ref<HTMLElement | null>(null);
const theadRef = ref<HTMLElement | null>(null);
const tbodyRef = ref<HTMLElement | null>(null);
const searchRowRef = ref<InstanceType<typeof HeadTableRowNew> | null>(null);
const scrollWrapperRef = ref<InstanceType<typeof ScrollWrapperNew> | null>(
  null
);

const countColumn = computed(() => {
  let maxCountColumn = 1;
  if (theadRef.value) {
    for (let idx = 0; idx < theadRef.value.children.length; idx++) {
      maxCountColumn = Math.max(
        theadRef.value.children[idx].children.length,
        maxCountColumn
      );
    }
  }

  return maxCountColumn;
});

const unmountScroll = (e: Event) => {
  emit('unmount-scroll', e);
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

const resizeObserver = new ResizeObserver(() => {
  setHeadHeight();
});

defineExpose({
  scrollToTop,
  setHeightSlot: scrollWrapperRef.value?.setHeightSlot,

  tbodyRef,
  tableRef,
  theadRef
});

onMounted(() => {
  setHeadHeight();
  window.addEventListener('resize', setHeadHeight);
  if (tableRef.value) {
    resizeObserver.observe(tableRef.value);
  }

  setSearchMinHeight();
});
</script>

<style scoped lang="scss">
.table {
  --td-vertical-padding: 11.5px;
  --td-horizontal-padding: 8px;
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

  &__search-th {
    --th-horizontal-padding: 5px;
    --th-vertical-padding: 5px;
    border-bottom: 1px solid var(--border-grey);
    background-color: var(--table-background-color, var(--white));
  }

  & .scroll-wrapper__slot {
    background-color: var(--table-background-color, var(--white));
  }
}
</style>
