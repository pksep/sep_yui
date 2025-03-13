<template>
  <div ref="tableDivRef" class="table" data-testid="BaseTable">
    <ScrollWrapper
      ref="scrollWrapperRef"
      class="table__scroll-wrapper table__scroll-wrapper_head"
      :is-show-vertical-scroll
      :element="scrolledElement"
      @unmount-scroll="unmountScroll"
      @on-mounted="setScrollHandlers"
    >
      <table class="table__table" data-testid="BaseTable-Head">
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

        <tbody ref="refTbody" class="table__body" data-testid="BaseTable-Body">
          <slot name="body" v-bind="state"></slot>
        </tbody>
      </table>
    </ScrollWrapper>
  </div>
</template>

<script setup lang="ts">
import ScrollWrapper from '@/components/ScrollWrapper/ScrollWrapper.vue';
import TableRow from '@/components/Table/TableRow.vue';
import TableTh from '@/components/Table/TableTh.vue';
import changeStyleProperties from '@/helpers/change-style-properties';

import {
  computed,
  ComputedRef,
  onMounted,
  provide,
  reactive,
  ref,
  watchEffect
} from 'vue';
import { ITableProps } from '@/components/Table/interface/interface';

defineOptions({
  name: 'BaseTable'
});

withDefaults(defineProps<ITableProps>(), {
  isShowVerticalScroll: false
});

const emit = defineEmits<{
  (e: 'unmountScroll', event: Event): void;
}>();

const tableDivRef = ref<HTMLElement | null>(null);
const scrollWrapperRef = ref<InstanceType<typeof ScrollWrapper> | null>(null);
const refThead = ref<HTMLElement | null>(null);
const refTbody = ref<HTMLElement | null>(null);
const scrolledElement = ref<HTMLElement | null>(null);
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

provide('scrolledElement', refTbody);

watchEffect(() => {
  if (refTbody.value) {
    scrolledElement.value = refTbody.value;
  }
});

const setStyle = () => {
  if (refThead.value && tableDivRef.value) {
    const width = refThead.value.clientWidth;
    const height = refThead.value.clientHeight;

    requestAnimationFrame(() => {
      if (tableDivRef.value) {
        changeStyleProperties(
          {
            '--scroll-track-margin': `${height}px 0 0 0`,
            '--table-width': `${width}px`
          },
          tableDivRef.value
        );
      }
    });
  }
};

const resizeObserver = new ResizeObserver(entries => {
  entries.forEach(() => {
    setStyle();
  });
});

const unmountScroll = (e: Event) => {
  emit('unmountScroll', e);
};

const scrollToTop = () => {
  if (refTbody.value) {
    refTbody.value.scrollTop = 0;
  }
};

const setScrollHandlers = () => {
  if (refTbody.value && scrollWrapperRef.value) {
    refTbody.value.addEventListener(
      'scroll',
      scrollWrapperRef.value.handleScroll
    );
    scrollWrapperRef.value.setResizeElement(refTbody.value);
    scrollWrapperRef.value.setScrollStyle();
  }
};

defineExpose({
  scrollToTop
});

onMounted(() => {
  if (refThead.value && tableDivRef.value) {
    setStyle();

    resizeObserver.observe(refThead.value);
  }
});
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
  --table-width: auto;

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
  height: var(--table-body-max-height);
  z-index: 1;
  border: none;
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;
  table-layout: fixed;
}

.table .table__scroll-wrapper {
  position: relative;
  border-bottom-left-radius: var(--border-radius);

  --scroll-slot-bottom-right-radius: var(--border-radius);
  --scroll-slot-bottom-left-radius: var(--border-radius);
  --scroll-slot-top-left-radius: var(--border-radius);
  --scroll-slot-top-right-radius: var(--border-radius);
  --scroll-slot-border-bottom: 1px solid var(--border-grey);
  --scroll-slot-border-left: 1px solid var(--border-grey);
  --scroll-slot-border-right: 1px solid var(--border-grey);
}

.table__header {
  position: sticky;
  top: 0;
  border-radius: var(--border-radius);
  overflow: hidden;
}

.table__body {
  scrollbar-width: none;
  display: block;
  width: var(--table-width);
  height: var(--table-body-max-height);
  overflow: auto;
}

.table__body::-webkit-scrollbar {
  display: none;
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
