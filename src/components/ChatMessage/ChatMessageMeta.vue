<template>
  <time class="chat-message-meta" :datetime="props.datetime">
    <span>{{ props.time }}</span>
    <Icon
      v-if="props.outgoing"
      :name="props.isRead ? IconNameEnum.read : IconNameEnum.checked"
      :width="16"
      :height="16"
      color="var(--text-link)"
      role="img"
      :aria-label="props.isRead ? 'Прочитано' : 'Отправлено'"
    />
  </time>
</template>

<script setup lang="ts">
import Icon from '../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import type { IChatMessageMetaProps } from './interfaces';

const props = defineProps<IChatMessageMetaProps>();
</script>

<style scoped>
.chat-message-meta {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  color: var(--text-secondary, #757d8a);
  white-space: nowrap;
}
.chat-message-meta svg {
  flex-shrink: 0;
}
</style>
