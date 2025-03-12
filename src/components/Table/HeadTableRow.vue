<template>
  <tr class="head-table-row">
    <slot />
  </tr>
</template>

<script setup lang="ts">
defineOptions({
  name: 'HeadTableRow'
});
</script>

<style scoped>
.head-table-row {
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
}

.head-table-row:last-child > * {
  border-bottom: 1px solid var(--border-grey);
}

.head-table-row:first-child > *:first-child {
  border-top-left-radius: var(--border-radius);
}

.head-table-row:first-child > *:last-child {
  border-top-right-radius: var(--border-radius);
}
</style>
