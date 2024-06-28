<template>
  <svg
    class="icon"
    :width="props.width"
    :height="props.height"
    :style="props.color"
  >
    <use :href="`#${props.name}`" />
  </svg>
</template>

<script lang="ts" setup>
import { ColorsEnum } from '@/common/colors';
import { IIconPorps } from './interface/interface';

const props = withDefaults(defineProps<IIconPorps>(), {
  width: 24,
  height: 24,
  color: ColorsEnum.black
});
</script>
