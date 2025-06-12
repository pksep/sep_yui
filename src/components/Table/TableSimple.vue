<template>
  <table
    ref="tableRef"
    class="simple-table-yui-kit"
    :data-testid="`${props.dataTestid}`"
  >
    <slot>
      <slot name="colspan"></slot>

      <thead
        v-if="$slots['head']"
        ref="theadRef"
        class="simple-table-yui-kit__head"
        :data-testid="`${props.dataTestid}-Thead`"
      >
        <slot name="head"></slot>

        <HeadTableRowNew
          v-if="$slots['search']"
          class="table-new-yui-kit__search"
          ref="searchRowRef"
          :data-testid="`${props.dataTestid}-Search-Row`"
        >
          <TableTh
            :colspan="countColumn"
            class="table-new-yui-kit__th"
            :data-testid="`${props.dataTestid}-SearchRow-Search`"
          >
            <slot name="search"></slot>
          </TableTh>
        </HeadTableRowNew>
      </thead>

      <slot name="body-group">
        <tbody
          ref="tbodyRef"
          class="simple-table-yui-kit__body"
          v-if="$slots['body']"
          :data-testid="`${props.dataTestid}-Tbody`"
        >
          <slot name="body"></slot>
        </tbody>
      </slot>
    </slot>
  </table>
</template>

<script setup lang="ts">
import HeadTableRowNew from '@/components/Table/HeadTableRowNew.vue';
import TableTh from '@/components/Table/TableTh.vue';
import { computed, ref } from 'vue';
import type { ITableSimpleProps } from '@/components/Table/interface/interface';

defineOptions({
  name: 'TableSimple'
});

const props = withDefaults(defineProps<ITableSimpleProps>(), {
  dataTestid: 'TableSimple'
});

const tableRef = ref<HTMLElement | null>(null);
const theadRef = ref<HTMLElement | null>(null);
const tbodyRef = ref<HTMLElement | null>(null);
const searchRowRef = ref<InstanceType<typeof HeadTableRowNew> | null>(null);

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

defineExpose({
  tbodyRef,
  tableRef,
  theadRef
});
</script>

<style scoped>
table.simple-table-yui-kit {
  --td-vertical-padding: 11.5px;
  --td-horizontal-padding: 8px;

  position: relative;
  width: 100%;
  border: 0.5px solid var(--grey13);
  outline: none;
  border-collapse: separate;
  border-radius: 15px;
  font-size: 14px;
  border-spacing: 0;
  table-layout: fixed;

  background-color: var(--table-background-color, var(--white));

  &.simple-table-yui-kit__head {
    position: sticky;
    top: 0;
    z-index: 2;
  }

  &.simple-table-yui-kit__search-row {
    --th-horizontal-padding: 5px;
    --th-vertical-padding: 5px;
    border-bottom: 1px solid var(--border-grey);
    background-color: var(--table-background-color, var(--white));
  }
}
</style>
