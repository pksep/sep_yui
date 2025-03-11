<template>
  <div class="table" data-testid="BaseTable">
    <table class="table__table table__table_head" data-testid="BaseTable-Head">
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

const unmountScroll = (e: Event) => {
  console.log('unom Table');

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
.table__border-right {
  position: absolute;
  z-index: 3;
  height: 100%;
  width: calc(var(--border-radius) * 3);
  top: 0;
  right: calc(var(--scroll-wrapper-padding) + var(--scrollbar-width));

  border-right: 1px solid var(--border-grey);
  border-bottom-right-radius: var(--border-radius);

  clip-path: polygon(
    calc(100% -1px) 0%,
    100% 0%,
    100% 100%,
    calc(100% -1px) 100%
  );
}
.table__border-bottom {
  position: absolute;
  z-index: 3;
  height: calc(var(--border-radius) * 3);
  bottom: 0px;
  left: 0;
  right: calc(var(--scroll-wrapper-padding) + var(--scrollbar-width));

  border-bottom: 1px solid var(--border-grey);
  border-right: 1px solid var(--border-grey);
  border-left: 1px solid var(--border-grey);
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);

  clip-path: polygon(
    1px 0%,
    2px 70%,
    3px 80%,
    6px 90%,
    calc(100% - 6px) 90%,
    calc(100% - 3px) 80%,
    calc(100% - 1px) 70%,
    calc(100% - 1px) 0%,
    calc(100% - 1px) 100%,
    1px 100%
  );
}

.table__border-mask {
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: calc(var(--scroll-wrapper-padding) + var(--scrollbar-width));
  width: var(--border-radius);
  height: var(--border-radius);

  background-color: var(--table-background-color);
  clip-path: polygon(
    100% 4px,
    calc(var(--border-radius) - 1px) 4px,
    50% 100%,

    100% 100%
  );
}

.table__table_head {
  padding-right: 9px;
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
