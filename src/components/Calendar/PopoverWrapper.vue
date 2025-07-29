<template>
  <div class="popover-wrapper" ref="popoverWrapper">
    <div class="popover-trigger" @click="togglePopover">
      <slot name="trigger"></slot>
    </div>
    <div
      v-if="isVisible"
      ref="popoverContent"
      class="popover-content"
      :class="[`popover-${placement}`, { 'popover-show': isVisible }]"
      :style="popoverStyle"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue';

const props = defineProps({
  placement: {
    type: String,
    default: 'bottom',
    validator: (value: string) =>
      ['top', 'bottom', 'left', 'right'].includes(value)
  }
});

const isVisible = ref(false);
const popoverWrapper = ref<HTMLElement | null>(null);
const popoverContent = ref<HTMLElement | null>(null);
const popoverStyle = reactive({
  top: '0px',
  left: '0px'
});

const togglePopover = () => {
  isVisible.value = !isVisible.value;
  if (isVisible.value) {
    nextTick(() => {
      updatePopoverPosition();
    });
  }
};

const updatePopoverPosition = () => {
  if (!popoverWrapper.value || !popoverContent.value) return;

  const triggerRect = popoverWrapper.value.getBoundingClientRect();
  const popoverRect = popoverContent.value.getBoundingClientRect();
  const arrowSize = 0;
  const offset = 10;

  switch (props.placement) {
    case 'top':
      popoverStyle.top = `${triggerRect.top - popoverRect.height - arrowSize}px`;
      popoverStyle.left = `${triggerRect.left + (triggerRect.width - popoverRect.width) / 2}px`;
      break;
    case 'bottom':
      popoverStyle.top = `${triggerRect.bottom - offset}px`;
      popoverStyle.left = `1px`;
      break;
    case 'left':
      popoverStyle.top = `${triggerRect.top + (triggerRect.height - popoverRect.height) / 2}px`;
      popoverStyle.left = `${triggerRect.left - popoverRect.width - arrowSize}px`;
      break;
    case 'right':
      popoverStyle.top = `${triggerRect.top + (triggerRect.height - popoverRect.height) / 2}px`;
      popoverStyle.left = `${triggerRect.right + arrowSize}px`;
      break;
  }

  const { top } = popoverStyle;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

  popoverStyle.top = `${Math.max(scrollTop, parseFloat(top))}px`;
  popoverStyle.left = `${Math.max(scrollLeft)}px`;
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    popoverWrapper.value &&
    !popoverWrapper.value.contains(event.target as Node)
  ) {
    isVisible.value = false;
  }
};

document.addEventListener('click', handleClickOutside);
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
