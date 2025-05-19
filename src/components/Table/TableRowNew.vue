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
  background-color: var(--background);
  cursor: var(--cursor, pointer);

  &:first-child > * {
    border-top: none;
  }

  &:last-child > * {
    border-bottom: 0.5px solid var(--border-grey);
  }
  &.passive {
    --background: #f8f8f9;
  }
  &:hover,
  &.active {
    --background: var(--blue11);
    color: inherit;
  }
  &.ava {
    --background: var(--orange10);
    &:hover,
    &.active {
      --background: #ffebc1;
    }
  }
  &.ban {
    --background: #ffefee;
    &:hover,
    &.active {
      --background: #ffd3ca;
    }
  }
}
</style>
