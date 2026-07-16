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
  background-color: var(--action-disabled-bg);
  border-radius: 5px;
  animation: infinite skeleton-animation 1.5s ease-in-out;
}

@keyframes skeleton-animation {
  0% {
    background-color: var(--border-table);
  }

  50% {
    background-color: var(--action-disabled-bg);
  }

  100% {
    background-color: var(--border-table);
  }
}
</style>
