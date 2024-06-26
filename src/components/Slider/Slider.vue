<template>
  <div class="slider">
    <div class="slider__wrapper" ref="sliderWrapperRef">
      <button
        class="slider__button slider__button--prev"
        @click="prevSlide"
        :disabled="state.disabledPrev"
      >
        <Icon :name="IconNameEnum.leftBig" />
      </button>
      <div class="slider__slides">
        <div class="placeholder" v-if="showPlaceholder()">
          <img src="./camera.svg" alt="" width="111px" height="111px" />
          <p>Контент отсутствует</p>
        </div>
        <div class="placeholder" v-if="showPlaceholderExtension()">
          <img src="./closed-camera.svg" alt="" width="111px" height="111px" />
          <p>{{ state.extension }}</p>
        </div>
        <img
          v-if="isImage(state.file?.path ?? '')"
          @click="e => toFullsizeImage(e)"
          :src="state.file?.path ?? ''"
          ref="fullsizeImageRef"
        />
        <video
          v-if="isVideo(state.file?.path ?? '')"
          @click="e => toFullsizeImage(e)"
          controls
        >
          <source :src="state.file?.path ?? ''" />
        </video>
      </div>
      <button
        class="slider__button slider__button--next"
        @click="nextSlide"
        :disabled="state.disabledNext"
      >
        <Icon :name="IconNameEnum.rightBig" />
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { ISliderProps, ISlider } from './interface/interface';
import Icon from './../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import { typeImages, typeVideos } from './../../common/extentions';

const props = withDefaults(defineProps<ISliderProps>(), {});

const state = reactive<ISlider>({
  files: props.items.length ? props.items : [],
  file: null,
  currentIndex: 0,
  defaultIndex: props.defaultIndex ? props.defaultIndex : 0,
  disabledPrev: true,
  disabledNext: false,
  typeImages: typeImages,
  typeVideos: typeVideos
});

const sliderWrapperRef: Ref<HTMLElement | null> = ref(null);
const fullsizeImageRef: Ref<HTMLImageElement | null> = ref(null);

const CLASS_FULL_SIZE = 'slider__full-size';

const checkPath = (str: string | null) => {
  if (!str) {
    return null;
  }
  const regex = /\.\w+$/;
  const match = str.match(regex);

  state.extension = match[0];

  console.log(match, 'match');
  return match ? match[0] : null;
};

const isImage = (path: string | null): boolean => {
  const extension = checkPath(path);
  return extension ? state.typeImages.includes(extension) : false;
};

const isVideo = (path: string | null): boolean => {
  const extension = checkPath(path);
  return extension ? state.typeVideos.includes(extension) : false;
};

const closeFullSize = (e: KeyboardEvent) => {
  if (e instanceof KeyboardEvent && e.key === 'Escape') {
    if (fullsizeImageRef.value.classList.contains(CLASS_FULL_SIZE)) {
      fullsizeImageRef.value.classList.remove(CLASS_FULL_SIZE);
      document.body.style.overflow = 'auto';
    }
  }
};

const toFullsizeImage = (e: MouseEvent): void => {
  if (e.type === 'click') {
    const imageElement = e.target as HTMLElement;
    imageElement.classList.toggle(CLASS_FULL_SIZE);

    if (imageElement.classList.contains(CLASS_FULL_SIZE)) {
      window.addEventListener('keydown', closeFullSize);

      if (sliderWrapperRef.value) {
        sliderWrapperRef.value.style.cursor = 'zoom-out';
      }
    } else {
      window.removeEventListener('keydown', closeFullSize);
      if (sliderWrapperRef.value) {
        sliderWrapperRef.value.style.cursor = 'zoom-in';
      }
    }
  }
};

const prevSlide = () => {
  if (state.currentIndex > 0) {
    state.currentIndex--;
    state.disabledNext = false;
    if (state.currentIndex === 0) {
      state.disabledPrev = true;
    }
  }
  state.file = state.files[state.currentIndex];
};

const nextSlide = () => {
  if (state.currentIndex < state.files.length - 1) {
    state.currentIndex++;
    state.disabledPrev = false;
    if (state.currentIndex === state.files.length - 1) {
      state.disabledNext = true;
    }
  }
  state.file = state.files[state.currentIndex];
};

const showPlaceholder = () => state.files.length === 0;
const showPlaceholderExtension = () =>
  !isImage(state.file?.path ?? '') && !isVideo(state.file?.path ?? '');

onMounted(() => {
  if (!props.items) return 0;
  state.files = props.items;
  if (props.defaultIndex) {
    state.file = state.files[state.defaultIndex];
  }
  state.file = state.files[state.currentIndex];
});
</script>

<style lang="scss" scoped>
.slider {
  width: 100%;
  height: 260px;
  border: 1px solid $white-E0E0E0;
  border-radius: 10px;
  transition: 0.3s ease-in-out;
  &:hover {
    border: 1px solid $blue-9CBEFF;
  }

  &__wrapper {
    width: inherit;
    height: inherit;
    padding: 20px 18px;
    transition: 0.3s ease-in-out;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    cursor: zoom-in;

    &:hover {
      background-color: $blue-F2F7FF;
      border-radius: 10px;
    }
  }

  &__slides {
    background-color: $white;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;

    img,
    video {
      object-fit: contain;
      max-width: 100%;
      height: 100%;
    }

    img.slider__slide-full-size,
    video.slider__slide-full-size {
      width: auto;
      height: 100%;
    }
  }

  &__button {
    width: 64px;
    background-color: $white;
    border: 1px solid $transparent;
    outline: none;
    border-radius: 10px;
    padding: 0 20px;
    transition: 0.3s ease-in-out;
    cursor: pointer;

    &:active {
      background-color: $blue-D6E4FF;
      color: $blue-77A6FF;
    }

    &:disabled {
      background-color: $white-F5F5F5;
      color: $grey-A6A3AD;
    }
  }

  &__full-size {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    background-color: black;
    z-index: 6;
  }

  &__slide-full-size {
    height: 100%;
  }
}

.placeholder {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  gap: 20px;
  border-radius: 15px;
  background-color: $white-F0F0F0;

  img {
    height: auto;
  }

  p {
    color: $grey-A6A3AD;
  }
}
</style>
