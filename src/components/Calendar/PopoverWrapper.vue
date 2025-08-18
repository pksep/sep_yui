<template>
  <div class="popover-wrapper" ref="popoverWrapper">
    <div class="popover-trigger" @click="togglePopover">
      <slot name="trigger"></slot>
    </div>
    <div
      v-if="props.open"
      ref="popoverContent"
      class="popover-content"
      :class="[`popover-${placement}`, { 'popover-show': props.open }]"
      :style="state.popoverStyle"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, nextTick, ref, onBeforeUnmount, onMounted } from 'vue';
import type { IPopoverWrapperProps } from './interfaces/interfaces';

const props = withDefaults(defineProps<IPopoverWrapperProps>(), {
  placement: 'bottom',
  open: false
});

const emits = defineEmits<{ (e: 'unmount-close'): void }>();

const state = reactive({
  popoverStyle: {
    top: '0px',
    left: '0px'
  }
});

const popoverWrapper = ref<HTMLElement | null>(null);
const popoverContent = ref<HTMLElement | null>(null);

const togglePopover = () => {
  nextTick(updatePopoverPosition);
};

const updatePopoverPosition = () => {
  if (!popoverWrapper.value || !popoverContent.value) return;

  const triggerRect = popoverWrapper.value.getBoundingClientRect();
  const popoverRect = popoverContent.value.getBoundingClientRect();
  const arrowSize = 0;
  const offset = 10;

  switch (props.placement) {
    case 'top':
      state.popoverStyle.top = `${triggerRect.top - popoverRect.height - arrowSize}px`;
      state.popoverStyle.left = `${triggerRect.left + (triggerRect.width - popoverRect.width) / 2}px`;
      break;
    case 'bottom':
      state.popoverStyle.top = `${triggerRect.bottom - offset}px`;
      state.popoverStyle.left = '1px';
      break;
    case 'left':
      state.popoverStyle.top = `${triggerRect.top + (triggerRect.height - popoverRect.height) / 2}px`;
      state.popoverStyle.left = `${triggerRect.left - popoverRect.width - arrowSize}px`;
      break;
    case 'right':
      state.popoverStyle.top = `${triggerRect.top + (triggerRect.height - popoverRect.height) / 2}px`;
      state.popoverStyle.left = `${triggerRect.right + arrowSize}px`;
      break;
  }

  const { top } = state.popoverStyle;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

  state.popoverStyle.top = `${Math.max(scrollTop, parseFloat(top))}px`;
  state.popoverStyle.left = `${Math.max(scrollLeft)}px`;
};

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
  background: white;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 150px;
  opacity: 0;
  transform: scale(0.95);
  transform-origin: top center;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.popover-content.popover-show {
  opacity: 1;
  transform: scale(1);
}

.popover-content.popover-top {
  transform-origin: bottom center;
}

.popover-content.popover-left {
  transform-origin: right center;
}

.popover-content.popover-right {
  transform-origin: left center;
}

/* Arrow styles */
.popover-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border: 8px solid transparent;
}

.popover-top .popover-arrow {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-top-color: white;
}

.popover-bottom .popover-arrow {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-bottom-color: white;
}

.popover-left .popover-arrow {
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  border-left-color: white;
}

.popover-right .popover-arrow {
  top: 50%;
  right: 100%;
  transform: translateY(-50%);
  border-right-color: white;
}
</style>
