<template>
  <div class="table" data-testid="BaseTable">
    <table
      class="table__table table__table_head"
      :class="tableClass"
      data-testid="BaseTable-Head"
    >
      <slot name="colgroup"></slot>

      <thead
        ref="refThead"
        class="table__header"
        data-testid="BaseTable-Header"
      >
        <slot name="head" v-bind="state"></slot>

        <TableRow
          class="table__search-tr"
          v-if="$slots['search']"
          data-testid="BaseTable-Head-SearchRow"
        >
          <TableTh
            :colspan="state.countColumn"
            class="table__search-th"
            data-testid="BaseTable-Head-SearchRow-Search"
          >
            <slot name="search"></slot>
          </TableTh>
        </TableRow>
      </thead>
    </table>

    <div class="table__table-wrapper">
      <!-- <div ref="scrollRef" class="table__scroll-wrapper"> -->
      <ScrollWrapper
        ref="scrollWrapperRef"
        class="table__scroll-wrapper"
        @unmount-scroll="unmountScroll"
      >
        <table
          class="table__table table__table_body"
          data-testid="BaseTable-Body"
        >
          <slot name="colgroup"></slot>

          <tbody class="table__body" data-testid="BaseTable-Body">
            <slot name="body" v-bind="state"></slot>
          </tbody>
        </table>
      </ScrollWrapper>

      <!-- <div
        class="table__border-bottom"
        data-testid="BaseTable-Body-Bottom"
      ></div>

      <div class="table__border-right" data-testid="BaseTable-Body-Right"></div> -->

      <!-- <div class="table__border-mask" data-testid="BaseTable-Body-Mask"></div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper.vue';
import TableRow from '@/components/Table/TableRow.vue';
import TableTh from '@/components/Table/TableTh.vue';

import { computed, ComputedRef, reactive, ref } from 'vue';

defineOptions({
  name: 'BaseTable'
});

const emit = defineEmits<{
  (e: 'unmountScroll', event: Event): void;
}>();

const refThead = ref<HTMLElement | null>(null);
const scrollWrapperRef = ref<InstanceType<typeof ScrollWrapper> | null>(null);
const state = reactive<{
  countColumn: ComputedRef<number>;
}>({
  // Получаем количество столбцов
  countColumn: computed(() => {
    let maxCountColumn = 1;
    if (refThead.value) {
      for (let idx = 0; idx < refThead.value.children.length; idx++) {
        maxCountColumn = Math.max(
          refThead.value.children[idx].children.length,
          maxCountColumn
        );
      }
    }

    return maxCountColumn;
  })
});
const tableClass = computed(() => [
  {
    'table__table_vertical-scroll': scrollWrapperRef.value?.isVerticalScroll
  }
]);
const unmountScroll = (e: Event) => {
  emit('unmountScroll', e);
};
</script>

<style scoped>
:root {
  --table-body-max-height: auto;
}
.table {
  --border-radius: 15px;
  --font-size: 14px;
  --td-font-size: var(--font-size);
  --th-font-size: var(--font-size);
  --scroll-wrapper-padding: 3px;
  --scrollbar-width: 6px;

  --table-background-color: var(--white);

  --th-vertical-padding: 19px;
  --th-horizontal-padding: 16px;

  --td-vertical-padding: 11.5px;
  --td-horizontal-padding: 8px;

  background-color: var(--table-background-color);

  overflow: hidden;
}

.table,
.table__table {
  width: 100%;
}

.table__table {
  position: relative;
  z-index: 1;
  border: none;
  border-collapse: separate;
  border-spacing: 0;
}
.table__table-wrapper {
  height: var(--table-body-max-height);
}

.table__scroll-wrapper {
  position: relative;
  height: var(--table-body-max-height);
  border-bottom-left-radius: var(--border-radius);

  --scroll-slot-bottom-right-radius: var(--border-radius);
  --scroll-slot-bottom-left-radius: var(--border-radius);
  --scroll-slot-border-bottom: 1px solid var(--border-grey);
  --scroll-slot-border-left: 1px solid var(--border-grey);
  --scroll-slot-border-right: 1px solid var(--border-grey);
}
.table__table_vertical-scroll.table__table_head {
  padding-right: calc(var(--scroll-wrapper-padding) + var(--scrollbar-width));
}

.table__header {
  border-radius: var(--border-radius);
  overflow: hidden;
}
.table__table-wrapper {
  position: relative;
}

.table__search-tr {
  position: sticky;
  z-index: 3;
  top: 0;

  background-color: var(--table-background-color);
}
.table__search-th {
  --th-horizontal-padding: 5px;
  --th-vertical-padding: 5px;
  border-bottom: 1px solid var(--border-grey);
  background-color: var(--table-background-color);
}

.table__table-wrapper:not(:has(tr)) .table__border-bottom,
.table__table-wrapper:not(:has(tr)) .table__border-mask {
  display: none;
}
</style>
