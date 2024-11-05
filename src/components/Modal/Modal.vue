<template>
  <dialog ref="dialog" v-bind="attrs" class="modal-yui-kit">
    <div class="modal-yui-kit__modal-content" :style="stylesContent">
      <slot />
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useAttrs, watchEffect } from 'vue';
import { useEventListener } from '@vueuse/core';
import type { IDialogProps } from './interface/interface';

const props = defineProps<IDialogProps>();
const dialog = ref<HTMLDialogElement | null>(null);
const attrs = useAttrs();
const visible = ref(false);

const stylesContent = computed(() => ({
  width: props.width,
  height: props.height
}));

const showDialog = () =>
  props.open ? dialog.value?.showModal() : dialog.value?.close();

useEventListener(dialog, 'click', e => {
  if (e.target === dialog.value) {
    dialog.value?.close();
  }
});

onMounted(() => {
  watchEffect(() => {
    if (props.open !== visible.value) {
      showDialog();
      visible.value = props.open;
    }
  });
});
</script>

<style lang="scss" scoped>
.modal-yui-kit {
  --animation-slide-in: slide-in-left 0.5s cubic-bezier(0.25, 0, 0.3, 1);
  --animation-slide-out: slide-out-left 0.5s cubic-bezier(0.25, 0, 0.3, 1);
  border: none;
  margin-right: 0;
  inset: 0;
  overflow-y: hidden;
  max-block-size: 100vh;
  padding: 0px;
  &:focus-visible {
    outline: none;
  }
  &[open]::backdrop {
    background-color: var(--black);
    opacity: 0.4;
  }

  .modal-yui-kit__dialog-content {
    padding: 16px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .modal-yui-kit {
    animation: var(--animation-slide-out) forwards;
    &[open] {
      animation: var(--animation-slide-in) forwards;
    }
  }
}

@keyframes slide-out-left {
  to {
    transform: translateX(-100%);
  }
}

@keyframes slide-in-left {
  from {
    transform: translateX(100%);
  }
}
</style>
