<template>
  <Transition
    :name="transitionName"
    @after-leave="unmountLeaveAnimation"
    @before-leave="unmountBeforeLeave"
    @after-enter="unmountEnterAnimation"
  >
    <Modal
      ref="modalRef"
      v-if="props.open"
      :open="props.open"
      :position="props.position"
      :width="props.width"
      :height="props.height"
      :data-testid="props.dataTestid"
      @close="close"
      @unmounted="unmounted"
    >
      <slot />
    </Modal>
  </Transition>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import Modal from './Modal.vue';
import type { IModalEmit, IModalProps } from './interface/interface';
import { ModalAnimateEnum } from '@/components/Modal/enum';

const props = withDefaults(defineProps<IModalProps>(), {
  dataTestid: 'Modal',
  position: 'right'
});

const emits = defineEmits<IModalEmit>();

const transitionName = computed(() => {
  if (props.animateType === ModalAnimateEnum.fade) {
    return 'fade';
  }
  if (props.position === 'bottom') {
    return 'slide-bottom';
  }
  if (props.position === 'right') {
    return 'slide-left';
  }
  return 'fade-and-scale';
});

const modalRef = ref<InstanceType<typeof Modal> | null>(null);
const state = reactive({
  function: () => {}
});

/**
 * Обрабатывает хук afterEnter у анимации
 *
 * Устанавливает функцию закрытия модального окна.
 *
 * Используется при закрытие модального окна из внешнего компонента
 */
const unmountEnterAnimation = (): void => {
  setCloseFunction();
};

const unmounted = (): void => {
  emits('unmounted');
};

/**
 * Обрабатывает хук beforeLeave у анимации
 *
 * устанавливает функцию закрытия модального окна
 *
 * Используется при закрытие модального окна из внешнего компонента
 */
const unmountBeforeLeave = (): void => {
  setCloseFunction();
};

/**
 * Обрабатывает хук afterLeave у анимации
 *
 * вызывает функцию закрытия модального окна
 */
const unmountLeaveAnimation = (): void => {
  state.function();
  emits('end-animation');
};

/**
 * Устанавливает функцию закрытия модального окна
 *
 * Берет из компонента closeDialog и сохраняет функцию для дальнейшего выполнения
 */
const setCloseFunction = (): void => {
  if (modalRef.value) state.function = modalRef.value?.closeDialog;
};

const close = () => {
  setCloseFunction();
  emits('close');
};
</script>

<style scoped>
.slide-left-enter-active {
  animation: slide-in-left 0.5s var(--ease) forwards;
}

.slide-left-leave-active {
  animation: slide-out-left 0.5s var(--ease) forwards;
}

.slide-bottom-enter-active {
  animation: slide-in-top 0.5s var(--ease) forwards;
}

.slide-bottom-leave-active {
  animation: slide-out-bottom 0.5s var(--ease) forwards;
}

@keyframes slide-out-left {
  to {
    transform: translateX(100%);
  }
}

@keyframes slide-in-top {
  from {
    transform: translateY(100%);
  }
}

@keyframes slide-out-bottom {
  to {
    transform: translateY(100%);
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

.fade-and-scale-enter-active,
.fade-and-scale-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-and-scale-enter-from,
.fade-and-scale-modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-and-scale-modal-enter-to,
.fade-and-scale-modal-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
