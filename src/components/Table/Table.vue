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
      </thead>
    </table>

    <div class="table__table-wrapper" :class="wrapperClass">
      <div ref="scrollRef" class="table__scroll-wrapper">
        <table
          class="table__table table__table_body"
          data-testid="BaseTable-Body"
        >
          <slot name="colgroup"></slot>

          <tbody class="table__body" data-testid="BaseTable-Body">
            <TableRow
              v-if="$slots['search']"
              data-testid="BaseTable-Body-SearchRow"
            >
              <TableTd
                :colspan="state.countColumn"
                class="table__search-td"
                data-testid="BaseTable-Body-SearchRow-Search"
              >
                <slot name="search"></slot>
              </TableTd>
            </TableRow>

            <slot name="body" v-bind="state"></slot>
          </tbody>
        </table>

        <div
          class="table__border-bottom"
          data-testid="BaseTable-Body-Bottom"
        ></div>

        <div class="table__border-mask" data-testid="BaseTable-Body-Mask"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TableRow from '@/components/Table/TableRow.vue';
import TableTd from '@/components/Table/TableTd.vue';
import { computed, ComputedRef, reactive, ref } from 'vue';

defineOptions({
  name: 'BaseTable'
});

const refThead = ref<HTMLElement | null>(null);
const scrollRef = ref<HTMLElement | null>(null);
const state = reactive<{ countColumn: ComputedRef<number> }>({
  // Получаем количество столбцов
  countColumn: computed(() => {
    if (refThead.value && refThead.value.children[0]) {
      const tr = refThead.value.children[0];
      // Проверяем что передана строка с столбцами

      if (tr.nodeName === 'TR') return tr.children.length;
    }

    return 1;
  })
});

const isScroll = computed(() => {
  if (scrollRef.value) {
    return scrollRef.value.clientHeight < scrollRef?.value.scrollHeight;
  }
  return false;
});
const wrapperClass = computed(() => [
  {
    'table__table-wrapper_scroll': isScroll.value
  }
]);
</script>

<style scoped>
.table {
  --border-radius: 15px;
  --font-size: 14px;
  --td-font-size: var(--font-size);
  --th-font-size: var(--font-size);
  --scroll-wrapper-padding: 3px;
  --scrollbar-width: 6px;

  --table-background-color: var(--white);
  --table-body-max-height: auto;

  --td-vertical-padding: 11.5px;
  --td-horizontal-padding: 8px;

  padding: 15px 10px 15px 15px;

  background-color: var(--table-background-color);

  overflow: hidden;
}

.table__scroll-wrapper,
.table__table-wrapper,
.table,
.table__table {
  width: 100%;
}
.table__table-wrapper {
  position: relative;
  padding-right: var(--scrollbar-width);
}
.table__table-wrapper_scroll {
  padding-right: 0;
}

.table__scroll-wrapper,
.table__border-bottom,
.table__table_body {
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  overflow: hidden;
}

.table__scroll-wrapper {
  max-height: var(--table-body-max-height);
  overflow: auto;
  padding-right: var(--scroll-wrapper-padding);
}

.table__scroll-wrapper::-webkit-scrollbar {
  opacity: 0;
}

.table__border-bottom {
  position: absolute;
  height: calc(var(--border-radius) * 3);
  bottom: -1px;
  left: 0;
  right: calc(var(--scroll-wrapper-padding) + var(--scrollbar-width));

  border-bottom: 1px solid var(--border-grey);
  border-right: 1px solid var(--border-grey);
  border-left: 1px solid var(--border-grey);
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
    calc(var(--border-radius) - 1px) 100%,
    100% 100%
  );
}

.table__table {
  position: relative;
  z-index: 1;
  border: none;
  border-collapse: separate;
  border-spacing: 0;
}

.table__table_head {
  padding-right: 9px;
}
.table__table_body {
}

.table__header {
  border-radius: var(--border-radius);
  overflow: hidden;
}

.table__search-td {
  --td-horizontal-padding: 5px;
  --td-vertical-padding: 5px;
}

@supports (-moz-appearance: none) {
  .table__border-mask {
    display: none;
  }
  .table__scroll-wrapper {
    padding-right: 0;
  }
  .table__table-wrapper {
    padding-right: 0;
  }
  .table__border-bottom {
    right: 0;
  }

  .table {
    padding-right: 10px;
  }
  .table__table_head {
    padding-right: 0px;
  }
}
</style>
