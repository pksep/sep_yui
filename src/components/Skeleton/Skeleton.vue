<template>
  <div class="skeleton"></div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Skeleton'
});
</script>

<style scoped>
.skeleton {
  background-color: var(--skeleton-color);
  border-radius: 5px;
}
</style>
