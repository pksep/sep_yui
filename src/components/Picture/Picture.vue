<template>
  <figure class="picture-yui-kit" :data-testid="props.dataTestid">
    <template v-if="props.type == PictureEnum.img">
      <picture
        class="picture-yui-kit__picture"
        :data-testid="`${props.dataTestid}-Picture`"
      >
        <img
          class="picture-yui-kit__picture__image"
          :src="props.url"
          :alt="props.alt"
          :data-testid="`${props.dataTestid}-Picture-Img`"
        />
      </picture>
      <figcaption
        class="picture-yui-kit__picture__caption"
        :data-testid="`${props.dataTestid}-Caption`"
      >
        {{ props.caption }}
      </figcaption>
    </template>
    <div
      class="picture-yui-kit__caption"
      :data-testid="`${props.dataTestid}-Caption-Box`"
      v-else
    >
      <h4
        class="picture-yui-kit__caption__title"
        :data-testid="`${props.dataTestid}-Caption-Title`"
      >
        {{ props.caption }}
      </h4>
    </div>
  </figure>
</template>

<script setup lang="ts">
import { PictureEnum } from './enums/enums';
import type { IPictureProps } from './interface/interface';

const props = withDefaults(defineProps<IPictureProps>(), {
  dataTestid: 'Picture'
});
</script>

<style scoped>
.picture-yui-kit {
  background: var(--white);
}

.picture-yui-kit__caption {
  display: grid;
  place-content: center;
  border-radius: 15px;
  background-color: var(--primary-hover-light-color);
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
  background-color: var(--primary-hover-light-color);
  border-radius: 15px;
}
</style>
