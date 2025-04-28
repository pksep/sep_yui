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

<style scoped lang="scss">
.head-table-row {
  &:last-child > * {
    border-bottom: 1px solid var(--border-grey);
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
