<template>
  <Transition name="modal">
    <Modal
      v-if="state.open"
      :open="state.open"
      :width="props.width"
      :height="props.height"
      @close="close"
    >
      <slot />
    </Modal>
  </Transition>
</template>

<script setup lang="ts">
import Modal from './Modal.vue';
import { reactive, watchEffect } from 'vue';
import type { IDialogProps } from './interface/interface';
const props = defineProps<IDialogProps>();

const emits = defineEmits<{
  (e: 'close'): void;
}>();

const state = reactive({
  open: false
});

watchEffect(() => {
  state.open = props.open;
});

const close = (): void => {
  state.open = false;
  emits('close');
};
</script>

<style scoped>
.modal-enter-active {
  animation: slide-in-left 0.5s var(--ease) forwards;
}

.modal-leave-active {
  animation: slide-out-left 0.5s var(--ease) forwards;
}

@keyframes slide-out-left {
  to {
    transform: translateX(100%);
  }
}

@keyframes slide-in-left {
  from {
    transform: translateX(100%);
  }
}
</style>
