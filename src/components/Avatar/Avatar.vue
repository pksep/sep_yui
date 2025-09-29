<template>
  <div :data-testid="props.dataTestid" class="avatar-yui-kit">
    <template v-if="props.url && !imgError">
      <img
        :src="props.url"
        :alt="props.alt"
        class="avatar-yui-kit__image"
        @error="imgError = true"
      />
    </template>

    <Icon v-else-if="props.isIcon" :name="IconNameEnum.profile" />

    <div v-else class="avatar-yui-kit__text">
      {{ useFirstSymbol() }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Icon from '../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import type { IAvatar } from './interfaces/interfaces';

const props = defineProps<IAvatar>();
const imgError = ref(false);

const useFirstSymbol = (): string => {
  if (!props.initials) return '';
  return props.initials.charAt(0);
};
</script>

<style scoped>
.avatar-yui-kit {
  --size-avatar: 100px;

  display: grid;
  place-content: center;
  border-radius: 50%;
  color: var(--color, var(--white));
  background-color: var(--background-color);
  &:has(svg.icon-yui-kit) {
    height: var(--size-avatar);
    width: var(--size-avatar);
    --background-color: var(--blue9);
    --color: var(--grey8);
  }
  &:has(.avatar-yui-kit__text) {
    --background-color: var(--red4);
    width: max-content;
  }
}

.avatar-yui-kit__text {
  padding-inline: 9px;
  line-height: 30px;
  font-size: 16px;
}
img.avatar-yui-kit__image {
  font-size: var(--size-avatar);
  object-fit: cover;
  border-radius: 50%;
  height: 100%;
  width: 100%;
}
</style>
