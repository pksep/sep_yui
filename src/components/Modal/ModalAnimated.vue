<template>
  <Transition name="modal" @after-leave="unmountLeaveAnimation">
    <Modal
      ref="modalRef"
      v-if="props.open"
      :open="props.open"
      :width="props.width"
      :height="props.height"
      @close="close"
    >
      <slot />
    </Modal>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue';
import type { IDialogProps } from './interface/interface';
const props = defineProps<IDialogProps>();

const emits = defineEmits<{
  (e: 'close'): void;
}>();

const modalRef = ref<InstanceType<typeof Modal> | null>(null);

const close = () => {

  emits('close');
};

const unmountLeaveAnimation = (): void => {

  modalRef.value?.closeDialog();
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
