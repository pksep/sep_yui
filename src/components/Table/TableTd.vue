<template>
  <td :rowspan :colspan class="table-td" :data-testid="props.dataTestid">
    <slot />
  </td>
</template>

<script setup lang="ts">
import { ITableTd } from '@/components/Table/interface/interface';

defineOptions({
  name: 'TableTd'
});

const props = withDefaults(defineProps<ITableTd>(), {
  colspan: 1,
  rowspan: 1,
  dataTestid: 'DataCell'
});
</script>

<style>
.table-td {
  hyphens: auto;
  overflow-wrap: anywhere;
  padding: var(--td-vertical-padding, 0) var(--td-horizontal-padding, 0);

  border: none;
  border-left: 0.5px solid var(--border-color);
  border-top: 0.5px solid var(--border-color);
  border-bottom: 0.5px solid transparent;
  font-size: var(--td-font-size, 14px);
}

.table-td:first-child {
  border-left: none;
}
</style>
