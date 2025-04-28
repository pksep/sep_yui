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

<style scoped lang="scss">
.table-row {
  width: 100%;
  transition: all 0.2s ease;

  &:first-child > * {
    border-top: none;
  }

  &_selected {
    background-color: var(--blue11);
  }

  &:last-child > * {
    border-bottom: 1px solid var(--border-grey);
  }
}
</style>
