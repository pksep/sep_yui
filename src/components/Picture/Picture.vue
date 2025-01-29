<template>
  <figure class="picture-yui-kit">
    <template v-if="props.type == PictureEnum.img">
      <picture class="picture-yui-kit__picture">
        <img
          class="picture-yui-kit__picture__image"
          :src="props.url"
          :alt="props.alt"
        />
      </picture>
      <figcaption class="picture-yui-kit__picture__caption">
        {{ props.caption }}
      </figcaption>
    </template>
    <div class="picture-yui-kit__caption" v-else>
      <h4 class="picture-yui-kit__caption__title">{{ props.caption }}</h4>
    </div>
  </figure>
</template>

<script setup lang="ts">
import { PictureEnum } from './enums/enums';
import type { IPictureProps } from './interface/interface';

const props = withDefaults(defineProps<IPictureProps>(), {});
</script>

<style scoped>
.picture-yui-kit {
  background: var(--white);
}

.picture-yui-kit__caption {
  display: grid;
  place-content: center;
  border-radius: 15px;
  background-color: var(--blue9);
  & .picture-yui-kit__caption__title {
    font-weight: bold;
    font-size: 54px;
    color: var(--text-blue);
  }
}

.picture-yui-kit__picture__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: var(--blue9);
  border-radius: 15px;
}
</style>
