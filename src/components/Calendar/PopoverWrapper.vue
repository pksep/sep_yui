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
import { useFloating, offset, shift, autoPlacement } from '@floating-ui/vue';

import type { IPopoverWrapperProps } from './interfaces/interfaces';

const props = withDefaults(defineProps<IPopoverWrapperProps>(), {
  placement: 'bottom',
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
      allowedPlacements: ['top', 'bottom'],
      rootBoundary: 'document'
    }),
    shift()
  ],
  placement: props.placement
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
  display: inline-block;
}

.popover-trigger {
  cursor: pointer;
}

.popover-content {
  position: absolute;
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0px 4px 9.8px 0px #0000000d;
  z-index: 1000;
  transform: scale(0.95);
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.popover-content.popover-show {
  opacity: 1;
  transform: scale(1);
}
</style>
