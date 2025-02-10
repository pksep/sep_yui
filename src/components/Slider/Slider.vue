<template>
  <div class="slider-yui-kit">
    <div class="slider-yui-kit__wrapper" ref="slider-yui-kitWrapperRef">
      <button
        class="slider-yui-kit__button slider-yui-kit__button--prev"
        @click="prevSlide"
        :disabled="state.currentIndex === 0"
      >
        <Icon :name="IconNameEnum.leftBig" />
      </button>
      <div class="slider-yui-kit__slides">
        <div class="placeholder-yui-kit" v-if="showPlaceholder()">
          <img
            src="./../../assets/images/slider/camera.svg"
            alt=""
            width="111px"
            height="111px"
          />
          <p>Контент отсутствует</p>
        </div>
        <div class="placeholder-yui-kit" v-if="showPlaceholderExtension()">
          <img
            src="./../../assets/images/slider/closed-camera.svg"
            alt=""
            width="111px"
            height="111px"
          />
          <p>.{{ state.extension }}</p>
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
        class="slider-yui-kit__button slider-yui-kit__button--next"
        @click="nextSlide"
        :disabled="rigthIndex()"
      >
        <Icon :name="IconNameEnum.rightBig" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, defineExpose, Ref, watch } from 'vue';
import { ISliderProps, ISlider } from './interface/interface';
import Icon from './../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import {
  ImageExtensionsEnum,
  VideoExtensionsEnum
} from '@/common/extentions.ts';

const props = withDefaults(defineProps<ISliderProps>(), {});

const state = reactive<ISlider>({
  files: props.items.length ? props.items : [],
  file: null,
  currentIndex: props.defaultIndex || 0,
  extension: null
});

const sliderWrapperRef: Ref<HTMLElement | null> = ref(null);
const fullsizeImageRef: Ref<HTMLImageElement | null> = ref(null);

const CLASS_FULL_SIZE = 'slider-yui-kit__full-size';

const rigthIndex = (): boolean =>
  props.items?.length ? state.currentIndex === props.items.length - 1 : true;

/**
 * @param str:  string | null
 * @returns
 */
const checkPath = (str: string | null): string | null => {
  if (!str) return null;
  const regexExtension = /\.\w+$/;
  const match = str.match(regexExtension);

  state.extension = match ? match[0].replace('.', '') : null;

  return state.extension;
};

/**
 * @param path:  string | null
 * @returns
 */
const isImage = (path: string | null): boolean => {
  const extension = checkPath(path) as ImageExtensionsEnum;
  return extension
    ? Object.values(ImageExtensionsEnum).includes(
        extension.toLowerCase() as ImageExtensionsEnum
      )
    : false;
};

/**
 * @param path:  string | null
 * @returns
 */
const isVideo = (path: string | null): boolean => {
  const extension = checkPath(path) as VideoExtensionsEnum;
  return extension
    ? Object.values(VideoExtensionsEnum).includes(extension)
    : false;
};

/**
 * Закрывает полноразмерный просмотр слайда
 */
const closeFullSize = (e: KeyboardEvent) => {
  if (e instanceof KeyboardEvent && e.key === 'Escape') {
    if (
      fullsizeImageRef.value &&
      fullsizeImageRef.value.classList.contains(CLASS_FULL_SIZE)
    ) {
      fullsizeImageRef.value.classList.remove(CLASS_FULL_SIZE);
      document.body.style.overflow = 'auto';
    }
  }
};

/**
 * Открывает полноразмерный просмотр слайда
 */
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

/**
 * Перелистывает к предыдущему слайду
 */
const prevSlide = () => {
  state.currentIndex--;
  state.file = state.files[state.currentIndex];
};

/**
 * Перелистывает к следующему слайду
 */
const nextSlide = () => {
  state.currentIndex++;
  state.file = state.files[state.currentIndex];
};

/**
 * Показывает заглушку на контент, если файлов нет
 */
const showPlaceholder = () => state.files.length === 0;

/**
 * Показывает заглушку на контент, когда файл есть, но не принадлежит к картинкам и видео
 */
const showPlaceholderExtension = () =>
  isImage(state.file?.path ?? null) == false &&
  isVideo(state.file?.path ?? null) == false &&
  state.files.length > 0;

/**
 * Проверяет на наличие файлов, устанавливает их в стейты, далее устанавливляет слайд по дефолту если пропс есть, либо показывает действующий слайд.
 */
onMounted(() => {
  if (!props.items) return 0;
  state.files = props.items;

  if (props.defaultIndex) {
    state.file = state.files[state.currentIndex];
  }
  state.file = state.files[state.currentIndex];
});

/**
 * Меняет индекс слайд.
 */

const setSlide = (index: number) => {
  if (index >= 0 && index < state.files.length) {
    state.currentIndex = index;
    state.file = state.files[state.currentIndex];
  } else {
    console.warn('Index out of range');
  }
};

watch(
  () => props.items,
  () => {
    state.files = props.items;
  },
  { deep: true }
);

defineExpose({
  setSlide
});
</script>

<style lang="scss" scoped>
.slider-yui-kit {
  width: 100%;
  height: 260px;
  overflow: hidden;
  border: 0.5px solid $WHITE-E0E0E0;
  border-radius: 15px;
  transition: 0.3s ease-in-out;

  &:hover {
    border-color: $BLUE-9CBEFF;
  }

  &__wrapper {
    width: inherit;
    height: 100%;
    padding: 20px 18px;
    transition: 0.3s ease-in-out;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    background-color: $BLUE-F2F7FF;
  }

  &__slides {
    background-color: $WHITE;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;

    img,
    video {
      object-fit: contain;
      max-width: 100%;
      height: 100%;
      cursor: zoom-in;
    }

    img.slider__slide-full-size,
    video.slider__slide-full-size {
      width: auto;
      height: 100%;
    }
  }

  &__button {
    width: 64px;
    background-color: $WHITE;
    border: 1px solid $TRANSPARENT;
    outline: none;
    border-radius: 10px;
    padding: 0 20px;
    transition: 0.3s ease-in-out;
    cursor: pointer;

    &:active {
      background-color: $BLUE-D6E4FF;
      color: $BLUE-77A6FF;
    }

    &:disabled {
      background-color: $WHITE-F5F5F5;
      color: $GREY-A6A3AD;
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
    cursor: zoom-out !important;
    z-index: 999;
  }

  &__slide-full-size {
    height: 100%;
  }
}

.placeholder-yui-kit {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  gap: 20px;
  border-radius: 10px;
  background-color: $WHITE-F0F0F0;

  img {
    height: auto;
  }

  p {
    color: $GREY-A6A3AD;
  }
}
</style>
