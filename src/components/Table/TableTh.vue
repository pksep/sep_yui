<template>
  <th :colspan :rowspan class="table-th">
    <slot />
  </th>
</template>

<script setup lang="ts">
import { ITableTd } from '@/components/Table/interface/interface';

defineOptions({
  name: 'TableTh'
});
withDefaults(defineProps<ITableTd>(), {
  colspan: 1,
  rowspan: 1
});
</script>

<style scoped>
.table-th {
  padding: var(--th-vertical-padding) var(--th-horizontal-padding);
  font-weight: 700;
  font-size: var(--th-font-size, 14px);
  text-align: center;
  line-height: 28px;

  border: none;
  border-left: 1px solid var(--border-grey);
  border-top: 1px solid var(--border-grey);

  background-color: var(--blue9);
}

.table-th:first-child {
  border-left: none;
  /* border-top-left-radius: var(--border-radius); */
}

.table-th:last-child {
  border-right: none;
  /* border-top-right-radius: var(--border-radius); */
}
</style>
