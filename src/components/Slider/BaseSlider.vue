<template>
  <div class="base-slider">
    <div ref="contentRef" class="base-slider__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

defineOptions({
  name: 'BaseSlider'
});

const state = reactive<{
  children: HTMLCollection | null;
  activeIndex: number;
}>({
  children: null,
  activeIndex: 0
});

const contentRef = ref<HTMLElement | null>(null);

const shiftPosition = (): void => {};

onMounted(() => {
  if (!contentRef.value) return;
  console.dir(contentRef.value);

  state.children = contentRef.value.children;
});

defineExpose({
  shiftPosition
});
</script>

<style>
.base-slider {
  width: 100%;
  overflow: hidden;
}
.base-slider__content {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
