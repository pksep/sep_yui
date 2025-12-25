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
  position: relative;
  background-color: var(--background-color-40);
}

.base-slide::after {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: var(--primary-color);

  /* маска с отверстием */
  -webkit-mask: linear-gradient(#000 0 0), linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;

  mask: linear-gradient(#000 0 0), linear-gradient(#000 0 0);
  mask-composite: exclude;
  mask-position: center;
  mask-repeat: no-repeat;
  mask-size: 100% 100%;

  transition: all 0.2s ease;
}

.base-slide__content {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;

  clip-path: inset(0 0 0 0);
  transition: all 0.2s ease;
}

.base-slide_active.base-slide::after {
  mask-size:
    100% 100%,
    calc(100% - 10px) calc(100% - 10px);
}

.base-slide_active .base-slide__content {
  clip-path: inset(5px 5px 5px 5px);
}
</style>
