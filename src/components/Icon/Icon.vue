<template>
  <svg
    class="icon-yui-kit"
    :width="props.width"
    :height="props.height"
    :style="props.color"
    :viewBox="`0 0 24 24`"
  >
    <g v-html="icon()" />
  </svg>
</template>

<script lang="ts" setup>
import { ColorsEnum } from '@/common/colors';
import { IIconPorps } from './interface/interface';
import Icons from '@/assets/icons/index.ts';

const props = withDefaults(defineProps<IIconPorps>(), {
  width: 24,
  height: 24,
  color: ColorsEnum.black
});
type IconName = keyof typeof Icons;

const icon = () => {
  return Icons[props.name as IconName]?.path;
};
</script>
