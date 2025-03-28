<template>
  <dialog ref="dialog" v-bind="attrs" class="dialog-yui-kit">
    <div class="dialog-yui-kit__dialog-content" :style="stylesContent">
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
const emit = defineEmits(['close']);

const hideDialog = () => {
  dialog.value?.close();
  emit('close');
};

const showDialog = () =>
  props.open ? dialog.value?.showModal() : hideDialog();

useEventListener(dialog, 'mousedown', e => {
  if (!props.noClose && e.target === dialog.value) {
    hideDialog();
  }
});

useEventListener(dialog, 'keydown', e => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    props.noClose && e.preventDefault();
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
.dialog-yui-kit {
  background: var(--background, var(--blue9));
  border: none;
  border-radius: 15px;
  padding: 0px;
  &:focus-visible {
    outline: none;
  }
  &[open]::backdrop {
    background-color: $BLACK;
    opacity: 0.4;
  }

  .dialog-yui-kit__dialog-content {
    padding: 16px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
