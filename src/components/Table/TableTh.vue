<template>
  <th :colspan :rowspan :data-testid="props.dataTestid" class="table-th">
    <slot />
  </th>
</template>

<script setup lang="ts">
import { ITableTd } from '@/components/Table/interface/interface';

defineOptions({
  name: 'TableTh'
});

const props = withDefaults(defineProps<ITableTd>(), {
  colspan: 1,
  rowspan: 1,
  dataTestid: 'DataHeader'
});
</script>

<style scoped>
.table-th {
  padding: var(--th-vertical-padding, 0) var(--th-horizontal-padding, 0);
  font-weight: 700;
  font-size: var(--th-font-size, 14px);
  text-align: center;
  line-height: 28px;

  border: none;
  border-left: 0.5px solid var(--border-color);
  border-top: 0.5px solid var(--border-color);

  background-color: var(--primary-hover-light-color);
}

.table-th:first-child {
  border-left: none;
}

.table-th:last-child {
  border-right: none;
}
</style>
