<template>
  <dialog
    ref="dialog"
    v-bind="attrs"
    :class="[`modal-yui-kit`, `modal-yui-kit_${props.position}`]"
    :data-testid="props.dataTestid"
    @click.self.left="handleCloseDialog"
  >
    <div
      class="modal-yui-kit__modal-content"
      :style="stylesContent"
      :data-testid="`${props.dataTestid}-ModalContent`"
    >
      <slot />
    </div>
  </dialog>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  useAttrs,
  watchEffect
} from 'vue';
import type { IDialogProps } from './interface/interface';
import changeStyleProperties from '@/helpers/change-style-properties';
import { useModal } from '../../extenstions/modal';

const { lastOpenedModal, addOpenedModal, reduceOpenedModal } = useModal();

const props = withDefaults(defineProps<IDialogProps>(), {
  dataTestid: 'Modal',
  position: 'right'
});

const dialog = ref<HTMLDialogElement | null>(null);
const attrs = useAttrs();
const visible = ref(false);
const stylesContent = computed(() => ({
  width: props.width,
  height: props.height
}));

const emit = defineEmits(['close', 'unmounted']);

let lastShowTime = 0;

const showDialog = (): void => {
  lastShowTime = Date.now();
  if (dialog.value) {
    if (props.open) {
      dialog.value.showModal();

      addOpenedModal(dialog.value);
    } else {
      hideDialog();
    }
  }
};

const hideDialog = (): void => {
  const now = Date.now();

  if (now - lastShowTime < 300) {
    return;
  }

  reduceOpenedModal();

  emit('close');
};

const closeDialog = (): void => {
  dialog.value?.close();
  document.documentElement.focus();

  resetBlock();
};

const handleKeyPressed = (event: KeyboardEvent): void => {
  const key = event.key;

  if (key === 'Escape' && lastOpenedModal.value === dialog.value) {
    hideDialog();
  }
};

const getScrollbarWidth = (): number => {
  const modals = document.querySelectorAll('.modal-yui-kit');

  if (modals.length === 1) {
    return window.innerWidth - document.documentElement.clientWidth;
  } else {
    const paddingRight = document.body.style.paddingRight;
    const pixel = Number(paddingRight.replace(/\D/g, '')) || 0;

    return pixel;
  }
};

const resetBlock = (): void => {
  const modals = document.querySelectorAll('.modal-yui-kit');

  if (modals.length === 0) {
    changeStyleProperties(
      {
        overflow: '',
        'padding-right': ''
      },
      document.body
    );
  }
};

const handleCloseDialog = (event: Event): void => {
  if (event.target === dialog.value) {
    hideDialog();
  }
};

defineExpose({
  closeDialog
});

onMounted(() => {
  watchEffect(() => {
    if (props.open !== visible.value) {
      showDialog();
      visible.value = props.open;
    }
  });

  if (dialog.value) {
    // отключаем дефолтное закрытие модального окна по esc из-за конфликтов с анимацией
    dialog.value.addEventListener('cancel', event => {
      event.preventDefault();
    });
  }

  const scrollbarWidth = getScrollbarWidth();
  changeStyleProperties(
    {
      overflow: 'hidden',
      'padding-right': `${scrollbarWidth}px`
    },
    document.body
  );

  document.addEventListener('keydown', handleKeyPressed);
});

onUnmounted(() => {
  resetBlock();
  document.removeEventListener('keydown', handleKeyPressed);
  emit('unmounted');
});
</script>

<style scoped>
.modal-yui-kit.modal-yui-kit_right,
.modal-yui-kit.modal-yui-kit_bottom {
  --ease: cubic-bezier(0.25, 0, 0.3, 1);
}

.modal-yui-kit.modal-yui-kit_right {
  max-block-size: 100vh;
  min-height: 100vh;
  margin-right: 0;
  inset: 0;
  border-radius: 10px 0 0 10px;
}

.modal-yui-kit.modal-yui-kit_center {
  border-radius: 10px;
}

.modal-yui-kit.modal-yui-kit_bottom {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin: 0;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.modal-yui-kit {
  border: none;
  display: grid;
  position: fixed;
  z-index: 10;
  padding: 0px;

  &:focus-visible {
    outline: none;
  }

  &::backdrop {
    background-color: var(--text-color);
    transition: opacity 0.5s ease-in-out;
    opacity: 0;
  }

  &[open]::backdrop {
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
</style>
