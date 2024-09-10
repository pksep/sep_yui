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
const attrs = useAttrs();
const dialog = ref<HTMLDialogElement>();
const visible = ref(false);

const stylesContent = computed(() => ({
  width: props.width,
  height: props.height
}));

const showDialog = () =>
  props.open ? dialog.value?.showModal() : dialog.value?.close();

defineExpose({
  show: showDialog,
  close: (returnVal?: string): void => dialog.value?.close(returnVal),
  visible
});

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
.dialog-yui-kit {
  background: $BLUE-F2F7FF;
  border: none;
  border-radius: 5px;
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
