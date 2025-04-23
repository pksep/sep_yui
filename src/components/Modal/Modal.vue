<template>
  <dialog ref="dialog" v-bind="attrs" class="modal-yui-kit">
    <div class="modal-yui-kit__modal-content" :style="stylesContent">
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
import { useEventListener } from '@vueuse/core';
import type { IDialogProps } from './interface/interface';
import changeStyleProperties from '@/helpers/change-style-properties';

const props = defineProps<IDialogProps>();
const dialog = ref<HTMLDialogElement | null>(null);
const attrs = useAttrs();
const visible = ref(false);
const stylesContent = computed(() => ({
  width: props.width,
  height: props.height
}));

const emit = defineEmits(['close']);

let lastShowTime = 0;

const showDialog = (): void => {
  lastShowTime = Date.now();
  props.open ? dialog.value?.showModal() : hideDialog();
};

const hideDialog = (): void => {
  const now = Date.now();

  if (now - lastShowTime < 300) {
    return;
  }

  dialog.value?.close();

  emit('close');
  document.documentElement.focus();
};

const handleKeyPressed = (event: KeyboardEvent): void => {
  const key = event.key;

  if (key === 'Escape') {
    hideDialog();
  }
};

const getScrollbarWidth = (): number => {
  return window.innerWidth - document.documentElement.clientWidth;
};

useEventListener(dialog, 'mousedown', e => {
  if (e.target === dialog.value) {
    hideDialog();
  }
});

onMounted(() => {
  watchEffect(() => {
    if (props.open !== visible.value) {
      showDialog();
      visible.value = props.open;
    }
  });

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
  const dialogs = document.querySelectorAll('.modal-yui-kit');

  if (dialogs.length === 0) {
    changeStyleProperties(
      {
        overflow: '',
        'padding-right': ''
      },
      document.body
    );
  }
  document.removeEventListener('keydown', handleKeyPressed);
});
</script>

<style lang="scss" scoped>
.modal-yui-kit {
  --ease: cubic-bezier(0.25, 0, 0.3, 1);
  border: none;
  border-radius: 10px 0 0 10px;
  margin-right: 0;
  inset: 0;
  display: grid;
  position: fixed;
  z-index: 10;
  max-block-size: 100vh;
  min-height: 100vh;
  padding: 0px;
  &:focus-visible {
    outline: none;
  }
  &[open]::backdrop {
    background-color: var(--black);
    transition: opacity 0.5s ease-in-out;
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
