<template>
  <img :src="props.src" alt="" />
</template>

<script lang="ts" setup>
import { IIcon } from '@/interface';

const props = withDefaults(defineProps<IIcon>(), {
  src: ''
});
</script>
