<template>
  <div class="slider">
    <div class="slider__wrapper">
      <button
        class="slider__button slider__button--prev"
        @click="prevSlide"
        :disabled="state.disabledPrev"
      >
        <Icon :name="IconNameEnum.leftBig" />
      </button>
      <div class="slider__slides">
        <div
          class="placeholder"
          v-if="
            (!isImage(state.file.path) && !isVideo(state.file.path)) ||
            state.files.length == 0
          "
        >
          <Icon name="bgNotContent" width="110" height="110" />
          <p>Контент отсутствует</p>
        </div>
        <img
          v-if="isImage(state.file?.path ?? '')"
          @click="e => toFullsizeImage(e)"
          :src="state.file?.path ?? ''"
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
import { onMounted, reactive } from 'vue';
import { ISliderProps } from './interface';
import Icon from './../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum';

interface IFile {
  path: string;
}

const props = withDefaults(defineProps<ISliderProps>(), {});

const state = reactive<{
  files: IFile[];
  file: IFile | null;
  currentIndex: number;
  defaultIndex: number;
  disabledPrev: boolean;
  disabledNext: boolean;
  typeImages: string[];
  typeVideos: string[];
}>({
  files: props.items.length ? props.items : [],
  file: null,
  currentIndex: 0,
  defaultIndex: props.defaultIndex ? props.defaultIndex : 0,
  disabledPrev: true,
  disabledNext: false,
  typeImages: ['.jpg', '.png', '.jpeg'],
  typeVideos: ['.mp4', '.mp3']
});

const checkPath = (str: string | null) => {
  if (!str) {
    return null;
  }
  const regex = /\.\w+$/;
  const match = str.match(regex);
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
    const fullSizeElement = document.querySelector('.slider__full-size');
    if (fullSizeElement) {
      fullSizeElement.classList.remove('slider__full-size');
      document.body.style.overflow = 'auto';
      const img = fullSizeElement.querySelector('.slider__slide-full-size');
      if (img) {
        img.classList.remove('slider__slide-full-size');
      }
    }
  }
};

const toFullsizeImage = (e: MouseEvent): void => {
  if (e.type === 'click') {
    const imageElement = e.target as HTMLElement;
    imageElement.classList.toggle('slider__full-size');
    if (imageElement.classList.contains('slider__full-size')) {
      window.addEventListener('keydown', closeFullSize);
      const sliderWrapper = document.querySelector(
        '.slider__wrapper'
      ) as HTMLElement;
      if (sliderWrapper) {
        sliderWrapper.style.cursor = 'zoom-out';
      }
    } else {
      window.removeEventListener('keydown', closeFullSize);
      const sliderWrapper = document.querySelector(
        '.slider__wrapper'
      ) as HTMLElement;
      if (sliderWrapper) {
        sliderWrapper.style.cursor = 'zoom-in';
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
.placeholder {
  background-color: $white-F0F0F0;
  border-radius: 15px;
  display: grid;
  align-items: center;
  justify-content: center;
  align-content: center;
  justify-items: center;
  width: inherit;
  height: 100%;
  color: $grey-A6A3AD;
  position: absolute;
  top: 0;
  left: 0;

  p {
    font-size: 14px;
    line-height: 17px;
    font-weight: bold;
    font-family: 'Inter', sans-serif;
  }
}

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
    width: inherit;
    position: relative;

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
</style>
