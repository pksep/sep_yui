<template>
  <article
    ref="element"
    :class="{
      'chat-message-surface': !props.unstyled,
      'chat-message-surface--outgoing': !props.unstyled && props.outgoing
    }"
  >
    <slot />
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { IChatMessageSurfaceProps } from './interfaces';

const props = defineProps<IChatMessageSurfaceProps>();
const element = ref<HTMLElement | null>(null);
// Существующий чат сохраняет измерение DOM для цитат и отложенных медиа.
defineExpose({ element });
</script>

<style scoped>
.chat-message-surface {
  position: relative;
  display: grid;
  gap: 4px;
  min-width: 0;
  padding: 10px 14px;
  border-radius: 20px 20px 20px 4px;
  background: var(--surface-overlay, #fff);
  color: var(--text-primary, #181818);
  font-size: 14px;
  line-height: 20px;
  overflow-wrap: anywhere;
}
.chat-message-surface--outgoing {
  border-radius: 20px 20px 4px 20px;
  background: var(--surface-brand, #d6e4ff);
}
</style>
