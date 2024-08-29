<template>
  <dialog ref="dialog" v-bind="attrs" class="dialog-yui-kit">
    <slot />
  </dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, useAttrs, watchEffect } from 'vue';
import { onClickOutside } from '@vueuse/core';
import type { IDialogProps } from './interface/interface';

const props = defineProps<IDialogProps>();
const attrs = useAttrs();
const dialog = ref<HTMLDialogElement>();
const visible = ref(false);

const showDialog = () =>
  props.open ? dialog.value.showModal() : dialog.value.close();

defineExpose({
  show: showDialog,
  close: (returnVal?: string): void => dialog.value?.close(returnVal),
  visible
});

onClickOutside(visible, () => {
  dialog.value.close();
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
  padding: 8em;
  border-radius: 5px;
  &:focus-visible {
    outline: none;
  }
  &[open]::backdrop {
    background-color: $BLACK;
    opacity: 0.4;
  }
}
</style>
