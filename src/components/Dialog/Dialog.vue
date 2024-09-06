<!-- https://kkuegler.github.io/v-native-dialog/?path=/story/components-native-dialog--demo -->

<template>
  <dialog ref="dialog" class="dialog-yui-kit">
    <slot />
  </dialog>
</template>

<script setup lang="ts">
import { onmounted, ref, useattrs, watcheffect } from 'vue';
import { onclickoutside } from '@vueuse/core';
import type { idialogprops } from './interface/interface';

const props = defineprops<idialogprops>();
const dialog = ref<htmldialogelement | null>(null);
const visible = ref(false);

const showdialog = () =>
  props.open ? dialog.value?.showmodal() : dialog.value?.close();

onclickoutside(dialog, () => {
  dialog.value?.close();
});

onmounted(() => {
  watcheffect(() => {
    if (props.open !== visible.value) {
      showdialog();
      visible.value = props.open;
    }
  });
});
</script>

<style lang="scss" scoped>
.dialog-yui-kit {
  background: $blue-f2f7ff;
  border: none;
  padding: 8em;
  border-radius: 5px;
  &:focus-visible {
    outline: none;
  }
  &[open]::backdrop {
    background-color: $black;
    opacity: 0.4;
  }
}
</style>
