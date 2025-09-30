<template>
  <div :data-testid="props.dataTestid" class="avatar-yui-kit">
    <picture v-if="state.isValid">
      <img :src="props.url" :alt="props.alt" class="avatar-yui-kit__image" />
    </picture>
    <Icon v-else-if="props.isIcon" :name="IconNameEnum.profile" />
    <div v-else-if="!props.isIcon" class="avatar-yui-kit__text">
      {{ useFirstSymbol() }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import Icon from '../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import type { IAvatar } from './interfaces/interfaces';
import { onMounted } from 'vue';
import { watch } from 'vue';

const props = defineProps<IAvatar>();

const state = reactive<{ isValid: boolean }>({
  isValid: false
});

const checkImageUrl = async (): Promise<boolean> => {
  if (props.url) {
    const getImage = await fetch(props.url, { method: 'HEAD' });
    if (getImage.ok) {
      return true;
    }
    return false;
  }
  return false;
};

const useFirstSymbol = (): string => {
  if (!props.initials) return '';
  return props.initials.charAt(0);
};

watch(
  () => props.url,
  () => {
    checkImageUrl().then(result => {
      state.isValid = result;
    });
  }
);

onMounted(() => {
  checkImageUrl().then(result => {
    state.isValid = result;
  });
});
</script>

<style scoped>
.avatar-yui-kit {
  display: grid;
  place-content: center;
  border-radius: 50%;
  color: var(--color, var(--white));
  background-color: var(--background-color);

  &:has(svg.icon-yui-kit) {
    height: 40px;
    width: 40px;
    --background-color: var(--blue9);
    --color: var(--grey8);
  }

  &:has(.avatar-yui-kit__text) {
    --background-color: var(--red4);
    width: max-content;
    padding-inline: 9px;
    line-height: 30px;
  }

  .avatar-yui-kit__text {
    font-size: 16px;
  }
}

img.avatar-yui-kit__image {
  font-size: var(--size-avatar, 100px);
  object-fit: cover;
  border-radius: 50%;
  height: 1em;
  width: 1em;
}

picture {
  height: var(--size-avatar, 100px);
}
</style>
