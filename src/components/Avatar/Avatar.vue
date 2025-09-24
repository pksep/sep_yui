<template>
  <img v-if="props.url" :src="props.url" :alt="props.alt" class="user__image" />
  <div v-else class="user__avatar">O</div>
</template>

<script lang="ts" setup>
import { IAvatar } from './interfaces/interfaces';

const props = defineProps<IAvatar>();
</script>

<style scoped>
.user__avatar {
  --background-color: var(--red4);
  display: grid;
  width: max-content;
  justify-self: start;
  align-self: center;
  place-content: center;
  padding-inline: 9px;
  font-size: 16px;
  line-height: 30px;
  border-radius: 50%;
  color: var(--white);
  background-color: var(--background-color);
}

.user__image {
  font-size: var(--size-avatar);
  border-radius: 50%;
  height: 1em;
  width: 1em;
}
</style>
