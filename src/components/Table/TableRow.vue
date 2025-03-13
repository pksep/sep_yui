<template>
  <tr class="table-row" :class="classRow">
    <slot />
  </tr>
</template>

<script setup lang="ts">
import { ITableRow } from '@/components/Table/interface/interface';
import { computed } from 'vue';

defineOptions({
  name: 'TableRow'
});

const props = withDefaults(defineProps<ITableRow>(), {
  type: 'default',
  colspan: 1
});

const classRow = computed(() => [
  { 'table-row_selected': props.type === 'selected' }
]);
</script>

<style scoped>
.table-row {
  display: table;
  width: 100%;
  transition: all 0.2s ease;
}

.table-row:first-child > * {
  border-top: none;
}

.table-row_selected {
  background-color: var(--blue11);
}

/* .table-row:last-child > *:first-child {
  border-bottom-left-radius: var(--border-radius);
}

.table-row:last-child > *:last-child {
  border-bottom-right-radius: var(--border-radius);
} */
</style>
