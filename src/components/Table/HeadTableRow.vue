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
.head-table-row:not(:has(+ *)) > * {
  border-bottom: 1px solid var(--border-grey);
}

.head-table-row:has(+ *) > *:first-child {
  border-top-left-radius: var(--border-radius);
}

.head-table-row:has(+ *) > *:last-child {
  border-top-right-radius: var(--border-radius);
}
</style>
