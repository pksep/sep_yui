<template>
  <div ref="scrollbar">
    <PerfectSrollbarComponent
      :options="props.options"
      :tag="props.tag"
      :class="props.class"
      :style="props.style"
    >
      <slot />
    </PerfectSrollbarComponent>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { PerfectScrollbar as PerfectSrollbarComponent } from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/style.css';
import { IScrollbarProps } from './interface/scroll';

const props = withDefaults(defineProps<IScrollbarProps>(), {});

const scrollbar = ref<HTMLElement | null>(null);

const config = { attributes: true, attributeFilter: ['style'] };

const createCallback = (targetNode: HTMLElement, value: string) => {
  return (mutationsList: MutationRecord[]) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'style'
      ) {
        const currentRight = targetNode.style.right;

        if (currentRight !== value) {
          targetNode.style.right = value;
        }
      }
    }
  };
};

const updateCSSVariables = () => {
  if (!scrollbar.value) return;

  const thrumbY = scrollbar.value.querySelector('.ps__thumb-y') as HTMLElement;
  const thrumbX = scrollbar.value.querySelector('.ps__thumb-x') as HTMLElement;

  const railY = scrollbar.value.querySelector('.ps__rail-y') as HTMLElement;
  const railX = scrollbar.value.querySelector('.ps__rail-x') as HTMLElement;

  thrumbY.style.background = props.thrumbStyle?.y?.background || '#77a6ff';
  thrumbY.style.width = props.thrumbStyle?.y?.width || '6px';
  thrumbY.style.right = '0px';

  thrumbX.style.background = props.thrumbStyle?.x?.background || '#77a6ff';
  thrumbX.style.width = props.thrumbStyle?.x?.width || '6px';
  thrumbX.style.right = '0px';

  railY.style.background = props.railStyle?.y?.background || '#F5F5F5';
  railY.style.width = props.thrumbStyle?.y?.width || '6px';
  railY.style.right = props.railStyle?.y?.right || '0px';

  railX.style.background = props.railStyle?.x?.background || '#F5F5F5';
  railX.style.width = props.thrumbStyle?.x?.width || '6px';
  railX.style.right = props.railStyle?.x?.right || '0px';

  const observerY = new MutationObserver(
    createCallback(railY, props.railStyle?.y?.right || '0px')
  );

  const observerX = new MutationObserver(
    createCallback(railX, props.railStyle?.x?.right || '0px')
  );

  observerY.observe(railY, config);
  observerX.observe(railX, config);
};

watch(
  () => props,
  () => {
    updateCSSVariables();
  },
  { immediate: true }
);

onMounted(() => {
  updateCSSVariables();
});
</script>
