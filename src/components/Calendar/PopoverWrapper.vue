<template>
  <div class="popover-wrapper" ref="popoverWrapper">
    <div class="popover-trigger" ref="popoverTrigger">
      <slot name="trigger"></slot>
    </div>
    <Teleport :to="teleportTarget" :disabled="!teleportTarget">
      <div
        v-if="props.open"
        ref="popoverContent"
        class="popover-content"
        :class="[`popover-${placement}`, { 'popover-show': props.open }]"
        :style="floatingStyles"
      >
        <slot />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted, computed } from 'vue';
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

/**
 * Находим ближайший <dialog> элемент-предок.
 * Если компонент рендерится внутри dialog (модальное окно),
 * телепортируем поповер туда, чтобы он вышел из overflow-контейнеров,
 * но остался внутри top-layer диалога.
 */
const dialogTarget = ref<HTMLElement | null>(null);

const teleportTarget = computed(() => dialogTarget.value);

const { floatingStyles } = useFloating(popoverTrigger, popoverContent, {
  middleware: [
    offset(10),
    autoPlacement({
      crossAxis: true,
      allowedPlacements: ['top-start', 'bottom-start']
    })
  ],
  strategy: teleportTarget.value ? 'fixed' : 'absolute',
  placement: props.placement,
  whileElementsMounted: autoUpdate
});

const closePopover = (): void => {
  emits('unmount-close');
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    popoverWrapper.value &&
    !popoverWrapper.value.contains(event.target as Node) &&
    popoverContent.value &&
    !popoverContent.value.contains(event.target as Node)
  ) {
    closePopover();
  }
};

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

onMounted(() => {
  document.addEventListener('click', handleClickOutside);

  // Ищем ближайший dialog-предок для телепорта
  if (popoverWrapper.value) {
    const closestDialog = popoverWrapper.value.closest('dialog');
    if (closestDialog) {
      dialogTarget.value = closestDialog;
    }
  }
});
</script>

<style scoped>
.popover-wrapper {
  position: relative;
}

.popover-trigger {
  cursor: pointer;
}
</style>

<style>
.popover-content {
  overflow: hidden;
  position: absolute;
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0px 4px 9.8px 0px #0000000d;
  z-index: 100;
  opacity: 0;
  top: 0;
  left: 0;
  transition: opacity 0.15s ease-in-out;
}

.popover-content.popover-show {
  opacity: 1;
}
</style>
