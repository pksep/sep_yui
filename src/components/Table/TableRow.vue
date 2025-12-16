<template>
  <tr class="table-row" :class="classRow" :data-testid="props.dataTestid">
    <slot />
  </tr>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ITableRow } from '@/components/Table/interface/interface';

defineOptions({
  name: 'TableRow'
});

const props = withDefaults(defineProps<ITableRow>(), {
  type: 'default',
  colspan: 1
});

const classRow = computed(() => [
  { 'table-row_active': props.type === 'selected' }
]);
</script>

<style scoped>
.table-row {
  width: 100%;
  transition: all 0.2s ease;
  cursor: var(--cursor, pointer);
}

.table-row:first-child > * {
  border-top: 0.5px solid transparent;
}

.table-row:last-child > * {
  border-bottom: 0.5px solid var(--border-color);
}

.table-row_active,
.table-row:hover {
  background-color: var(--primary-hover-light-color);
  color: inherit;
}

.table-row.ava {
  background-color: var(--ava-color);
}
.table-row.ava:hover,
.table-row.ava_active {
  background-color: #ffebc1;
}
.table-row.ban {
  background-color: var(--ban-color);
}
.table-row.ban:hover,
.table-row.ban_active {
  background-color: var(--ban-active-color);
}
.table-row.passive {
  background-color: #f8f8f9;
}
</style>
