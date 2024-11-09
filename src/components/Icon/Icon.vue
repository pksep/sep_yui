<template>
  <svg
    class="icon-yui-kit"
    :width="props.width"
    :height="props.height"
    :style="styles"
    :fill="Icons[camelize(props.name) as IconName]?.fill"
    :viewBox="Icons[camelize(props.name) as IconName]?.viewbox || `0 0 24 24`"
  >
    <g v-html="icon?.path" />
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

const camelize = (s: string) => {
  return s.replace(/-./g, (x: string) => x[1].toUpperCase());
};

const icon = computed(() => {
  return Icons[camelize(props.name) as IconName];
});
</script>
