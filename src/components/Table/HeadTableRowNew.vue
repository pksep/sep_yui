<template>
  <tr class="head-table-row" :data-testid="props.dataTestid">
    <slot />
  </tr>
</template>

<script setup lang="ts">
import type { IHeadTableRowProps } from './interface/interface';
defineOptions({
  name: 'HeadTableRow'
});

const props = withDefaults(defineProps<IHeadTableRowProps>(), {
  dataTestid: 'TableRow'
});
</script>

<style scoped>
.head-table-row {
  &:last-child > * {
    border-bottom: 0.5px solid var(--border-grey);
  }

  &:first-child {
    & > * {
      border-top: none;
    }

    & > *:first-child {
      border-top-left-radius: var(--border-radius);
    }

    & > *:last-child {
      border-top-right-radius: var(--border-radius);
    }
  }
}
</style>
