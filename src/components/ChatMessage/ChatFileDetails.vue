<template>
  <div :data-testid="`${props.dataTestid}-FileInfo`">
    <div :data-testid="`${props.dataTestid}-FileDetails`">
      <p
        class="message-content__file__name"
        :data-testid="`${props.dataTestid}-FileName`"
      >
        {{ props.name }}
      </p>
      <p
        class="message-content__file__size"
        :data-testid="`${props.dataTestid}-FileSize`"
      >
        <slot name="size">{{ props.size }}</slot>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IChatFileDetailsProps } from './interfaces';
const props = withDefaults(defineProps<IChatFileDetailsProps>(), {
  dataTestid: 'ChatFile'
});
</script>
