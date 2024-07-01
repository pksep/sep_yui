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
          <img
            src="./../../assets/images/slider/camera.svg"
            alt=""
            width="111px"
            height="111px"
          />
          <p>Контент отсутствует</p>
        </div>
        <div class="placeholder" v-if="showPlaceholderExtension()">
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
import { onMounted, reactive, ref, Ref } from 'vue';
import { ISliderProps, ISlider } from './interface/interface';
import Icon from './../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import {
  ImageExtensionsEnum,
  VideoExtensionsEnum
} from './../../common/extentions';

const props = withDefaults(defineProps<ISliderProps>(), {});

const state = reactive<ISlider>({
  files: props.items.length ? props.items : [],
  file: null,
  currentIndex: 0,
  defaultIndex: props.defaultIndex ? props.defaultIndex : 0,
  disabledPrev: true,
  disabledNext: false,
  extension: null
});

const sliderWrapperRef: Ref<HTMLElement | null> = ref(null);
const fullsizeImageRef: Ref<HTMLImageElement | null> = ref(null);

const CLASS_FULL_SIZE = 'slider__full-size';

/**
 * @param str:  string | null
 * @returns
 */

/**
 * проверяет путь файла и получает расширение
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

/**
 * проверяет файл на расширение растровой графики
 */
const isImage = (path: string | null): boolean => {
  const extension: any = checkPath(path);
  return extension
    ? Object.values(ImageExtensionsEnum).includes(extension)
    : false;
};

/**
 * @param path:  string | null
 * @returns
 */

/**
 * проверяет файл на расширение видео
 */
const isVideo = (path: string | null): boolean => {
  const extension: any = checkPath(path);
  return extension
    ? Object.values(VideoExtensionsEnum).includes(extension)
    : false;
};

/**
 * @event e:  KeyboardEvent (Escape)
 * @returns
 */

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
 * @event e:  MouseEvent (click)
 * @returns
 */

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
  if (state.currentIndex > 0) {
    state.currentIndex--;
    state.disabledNext = false;
    if (state.currentIndex === 0) {
      state.disabledPrev = true;
    }
  }
  state.file = state.files[state.currentIndex];
};

/**
 * Перелистывает к следующему слайду
 */
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
 * Проверяет на наличие файлов, устанавливает их в стейты, далее устаналвивает слайд по дефолту если пропс есть, либо показывает действующий слайд.
 */
onMounted(() => {
  if (!props.items) return 0;
  state.files = props.items;

  if (state.files.length === 0) state.disabledNext = true;

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
  border: 1px solid $WHITE-E0E0E0;
  border-radius: 10px;
  transition: 0.3s ease-in-out;
  &:hover {
    border: 1px solid $BLUE-9CBEFF;
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
      background-color: $BLUE-F2F7FF;
      border-radius: 10px;
    }
  }

  &__slides {
    background-color: $WHITE;
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
  background-color: $WHITE-F0F0F0;

  img {
    height: auto;
  }

  p {
    color: $GREY-A6A3AD;
  }
}
</style>
