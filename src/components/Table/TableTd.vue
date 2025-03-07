<template>
  <td :rowspan :colspan class="table-td">
    <slot />
  </td>
</template>

<script setup lang="ts">
import { ITableCell } from '@/components/Table/interface/interface';

defineOptions({
  name: 'TableTd'
});

withDefaults(defineProps<ITableCell>(), {
  colspan: 1,
  rowspan: 1
});
</script>

<style>
.table-td {
  padding: var(--td-vertical-padding) var(--td-horizontal-padding);

  border-left: 1px solid var(--border-grey);
  border-top: 1px solid var(--border-grey);
  font-size: var(--td-font-size, 14px);
}

.table-td:last-child {
  border-right: 1px solid var(--border-grey);
}
</style>
