<template>
  <svg
    class="icon"
    :width="props.width"
    :height="props.height"
    :style="props.color"
  >
    <use :href="`#${props.name}`"></use>
  </svg>
</template>

<script lang="ts" setup>
import { IIconPorps } from './interface';

const props = withDefaults(defineProps<IIconPorps>(), {
  width: 24,
  height: 24
});
</script>
