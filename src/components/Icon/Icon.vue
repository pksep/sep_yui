<template>
  <svg
    class="icon-yui-kit"
    :width="props.width"
    :height="props.height"
    :style="styles"
    :viewBox="Icons[props.name as IconName]?.viewbox || `0 0 24 24`"
  >
    <g v-html="icon" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { IIconPorps } from './interface/interface';
import Icons from './index.ts';

const props = withDefaults(defineProps<IIconPorps>(), {
  width: 24,
  height: 24
});

const styles = computed(() => ({
  color: props.color
}));

type IconName = keyof typeof Icons;

const icon = computed(() => {
  return Icons[props.name as IconName]?.path;
});
</script>
