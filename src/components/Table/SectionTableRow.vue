<template>
  <TableRow class="section-table-row" :data-testid="props.dataTestid">
    <TableTd
      :colspan
      class="section-table-row__td"
      :data-testid="`${props.dataTestid}-DataCell`"
      ><slot
    /></TableTd>
  </TableRow>
</template>

<script setup lang="ts">
import { ISectionTableRow } from '@/components/Table/interface/interface';
import TableRow from '@/components/Table/TableRow.vue';
import TableTd from '@/components/Table/TableTd.vue';
defineOptions({
  name: 'SectionTableRow'
});

const props = withDefaults(defineProps<ISectionTableRow>(), {
  dataTestid: 'SectionTableRow'
});
</script>

<style scoped>
.section-table-row__td {
  text-align: center;
  padding: 15px 8px;
  color: var(--blue1);
  font-size: 16px;
  font-weight: 700;
}
</style>
