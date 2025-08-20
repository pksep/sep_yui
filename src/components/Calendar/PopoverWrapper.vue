<template>
  <div class="popover-wrapper" ref="popoverWrapper">
    <div class="popover-trigger" ref="popoverTrigger">
      <slot name="trigger"></slot>
    </div>
    <div
      v-if="props.open"
      ref="popoverContent"
      class="popover-content"
      :class="[`popover-${placement}`, { 'popover-show': props.open }]"
      :style="floatingStyles"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue';
import {
  useFloating,
  offset,
  autoPlacement,
  autoUpdate
} from '@floating-ui/vue';

import type { IPopoverWrapperProps } from './interfaces/interfaces';

const props = withDefaults(defineProps<IPopoverWrapperProps>(), {
  placement: 'bottom-start',
  open: false
});

const emits = defineEmits<{ (e: 'unmount-close'): void }>();

const popoverWrapper = ref<HTMLElement | null>(null);
const popoverTrigger = ref<HTMLElement | null>(null);
const popoverContent = ref<HTMLElement | null>(null);

const { floatingStyles } = useFloating(popoverTrigger, popoverContent, {
  middleware: [
    offset(10),
    autoPlacement({
      crossAxis: true,
      allowedPlacements: ['top-start', 'bottom-start']
    })
  ],
  placement: props.placement,
  whileElementsMounted: autoUpdate
});

const closePopover = (): void => {
  emits('unmount-close');
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    popoverWrapper.value &&
    !popoverWrapper.value.contains(event.target as Node)
  ) {
    closePopover();
  }
};

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.popover-wrapper {
  position: relative;
}

.popover-trigger {
  cursor: pointer;
}

.popover-content {
  overflow: hidden;
  position: absolute;
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0px 4px 9.8px 0px #0000000d;
  z-index: 3;
  opacity: 0;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
}

.popover-content.popover-show {
  opacity: 1;
}
</style>
