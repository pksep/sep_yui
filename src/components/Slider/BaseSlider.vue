<template>
  <div ref="sliderRef" class="base-slider">
    <div ref="contentRef" class="base-slider__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import scrollToElementIfNotVisible from '@/helpers/element/scroll-element-if-not-visiable';
import { nextTick, onMounted, reactive, ref, watch } from 'vue';

defineOptions({
  name: 'BaseSlider'
});

const props = withDefaults(
  defineProps<{
    activeIndex?: number;
  }>(),
  {
    activeIndex: 0
  }
);

const state = reactive<{
  children: Element[] | null;
  activeIndex: number;
}>({
  children: null,
  activeIndex: props.activeIndex
});

const contentRef = ref<HTMLElement | null>(null);
const sliderRef = ref<HTMLElement | null>(null);

watch(
  () => props.activeIndex,
  () => {
    shiftPosition(props.activeIndex);
  }
);

const shiftPosition = (index: number): void => {
  if (!contentRef.value || !sliderRef.value) return;
  const arr = [...contentRef.value.children];

  if (index > arr.length - 1 || index < 0) return;

  scrollToElementIfNotVisible(
    arr[index] as HTMLElement,
    sliderRef.value as HTMLElement
  );

  state.activeIndex = index;
};

const initScroll = (): void => {
  nextTick(() => {
    if (!state.children || !sliderRef.value) return;

    scrollToElementIfNotVisible(
      state.children[state.activeIndex] as HTMLElement,
      sliderRef.value
    );
  });
};

const nextSlide = (): number => {
  shiftPosition(state.activeIndex + 1);

  return state.activeIndex;
};

const prevSlide = (): number => {
  shiftPosition(state.activeIndex - 1);

  return state.activeIndex;
};

onMounted(() => {
  if (!contentRef.value || !sliderRef.value) return;

  state.children = [...contentRef.value.children];
});

defineExpose({
  shiftPosition,
  nextSlide,
  prevSlide,
  initScroll
});
</script>

<style>
.base-slider {
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  user-select: none;
}
.base-slider__content {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-grow: 1;
}

.base-slider__content > * {
  flex-shrink: 0;
}

/* Мобильная версия + планшет */
@media (max-width: 768px) {
  .base-slider__content {
    gap: 5px;
  }
}
</style>
