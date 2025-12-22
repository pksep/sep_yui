<template>
  <div class="base-slide" :class="slideClass">
    <div class="base-slide__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'BaseSlide'
});

const props = defineProps<{
  isActive?: boolean;
}>();

const slideClass = computed(() => [
  {
    'base-slide_active': props.isActive
  }
]);
</script>

<style>
.base-slide {
  background-color: var(--primary-color);
}

.base-slide__content {
  width: 100%;
  height: 100%;
  clip-path: inset(0 0 0 0);
  transition: all 0.2s ease;
}

.base-slide_active .base-slide__content {
  clip-path: inset(3px 3px 3px 3px);
}
</style>
