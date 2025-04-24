<template>
  <ScrollWrapperNew
    ref="scrollWrapperRef"
    class="table"
    @unmount-scroll="unmountScroll"
  >
    <table ref="tableRef" class="table__table">
      <slot>
        <slot name="colspan"></slot>

        <thead ref="theadRef" class="table__head">
          <slot name="head"></slot>

          <HeadTableRowNew
            class="table__search-tr"
            v-if="$slots['search']"
            data-testid="BaseTable-Head-SearchRow"
          >
            <TableTh
              :colspan="countColumn"
              class="table__search-th"
              data-testid="BaseTable-Head-SearchRow-Search"
            >
              <slot name="search"></slot>
            </TableTh>
          </HeadTableRowNew>
        </thead>

        <slot name="body-group">
          <tbody>
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
import { computed, onMounted, ref } from 'vue';
import { ITableEmit } from '@/components/Table/interface/interface';

defineOptions({
  name: 'TableNew'
});

const emit = defineEmits<ITableEmit>();

const tableRef = ref<HTMLElement | null>(null);
const theadRef = ref<HTMLElement | null>(null);
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

  changeStyleProperties(
    {
      '--scroll-track-margin-top': `${headHeight}px`
    },
    scrollWrapperRef.value.$el
  );
};

const scrollToTop = () => {
  if (scrollWrapperRef.value) {
    scrollWrapperRef.value.scrollToTop();
  }
};

const resizeObserver = new ResizeObserver(() => {
  setHeadHeight();
});

defineExpose({
  scrollToTop
});

onMounted(() => {
  setHeadHeight();
  window.addEventListener('resize', setHeadHeight);
  if (tableRef.value) {
    resizeObserver.observe(tableRef.value);
  }
});
</script>

<style scoped lang="scss">
.table {
  --table-background-color: var(--white);
  --td-vertical-padding: 11.5px;
  --td-horizontal-padding: 8px;
  &__table {
    position: relative;
    width: 100%;
    border: none;
    border-collapse: separate;
    border-spacing: 0;
    table-layout: fixed;
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
    background-color: var(--table-background-color);
  }
}
</style>
