<template>
  <figure class="picture-yui-kit" :data-testid="props.dataTestid">
    <template v-if="props.type == PictureEnum.img">
      <picture
        class="picture-yui-kit__picture"
        :data-testid="`${props.dataTestid}-Picture`"
      >
        <img
          class="picture-yui-kit__picture_image"
          :src="props.url"
          :alt="props.alt"
          :data-testid="`${props.dataTestid}-Picture-Img`"
          @load="handleLoad"
        />
      </picture>
      <figcaption
        class="picture-yui-kit__picture__caption"
        :data-testid="`${props.dataTestid}-Caption`"
      >
        {{ props.caption }}
      </figcaption>
    </template>

    <template v-else-if="isPdfFile(props.url)">
      <PdfPreview
        class="picture-yui-kit__picture_image"
        :src="props.url"
        :page="1"
        :dataTestid="`${props.dataTestid}-PdfPreview`"
        @load="handleLoad"
      />
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

    <Loader
      v-if="!state.isLoad && isRequiredLoad"
      class="picture-yui-kit__loader"
    />
  </figure>
</template>

<script setup lang="ts">
import { isPdfFile } from 'pdfjs-dist';
import { PictureEnum } from './enums/enums';
import type { IPictureProps } from './interface/interface';
import PdfPreview from '@/components/Preview/PdfPreview.vue';
import { computed, reactive, watch } from 'vue';
import Loader from '@/components/Loader/Loader.vue';

const props = withDefaults(defineProps<IPictureProps>(), {
  dataTestid: 'Picture'
});

const state = reactive<{
  isLoad: boolean;
}>({
  isLoad: false
});

const isRequiredLoad = computed(() => {
  if (props.type == PictureEnum.img) {
    return true;
  }
  return isPdfFile(props.url);
});

const handleLoad = () => {
  state.isLoad = true;
};

const reset = () => {
  state.isLoad = false;
};

watch(
  () => props.url,
  () => {
    reset();
  }
);
</script>

<style scoped>
.picture-yui-kit {
  position: relative;
  background: var(--white);
}

.picture-yui-kit__loader {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--primary-hover-light-color);
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

.picture-yui-kit__picture_image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: var(--primary-hover-light-color);
  border-radius: 15px;
}
</style>
