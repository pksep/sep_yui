<template>
  <Transition :name="transitionName" @after-leave="unmountLeaveAnimation">
    <Modal
      ref="modalRef"
      v-if="props.open"
      :open="props.open"
      :width="props.width"
      :height="props.height"
      :data-testid="props.dataTestid"
      @close="close"
    >
      <slot />
    </Modal>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Modal from './Modal.vue';
import type { IModalProps } from './interface/interface';
import { ModalAnimateEnum } from '@/components/Modal/enum';

const props = withDefaults(defineProps<IModalProps>(), {
  dataTestid: 'Modal',
  animateType: ModalAnimateEnum.right
});

const emits = defineEmits<{
  (e: 'close'): void;
}>();

const transitionName = computed(() => {
  switch (props.animateType) {
    case ModalAnimateEnum.fade:
      return 'fade';

    case ModalAnimateEnum.right:
      return 'modal';

    default:
      return 'modal';
  }
});

const modalRef = ref<InstanceType<typeof Modal> | null>(null);

const close = () => {
  emits('close');
};

const unmountLeaveAnimation = (): void => {
  modalRef.value?.closeDialog();
};
</script>

<style lang="scss" scoped>
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

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
