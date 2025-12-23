<template>
  <div class="slider-yui-kit" :data-testid="props.dataTestid">
    <div
      class="slider-yui-kit__wrapper"
      ref="slider-yui-kitWrapperRef"
      :data-testid="`${props.dataTestid}-Wrapper`"
    >
      <button
        class="slider-yui-kit__button slider-yui-kit__button--prev"
        @click="prevSlide"
        :disabled="state.currentIndex === 0"
        :data-testid="`${props.dataTestid}-Prev-Button`"
      >
        <Icon
          :name="IconNameEnum.leftBig"
          :data-testid="`${props.dataTestid}-Prev-Icon`"
        />
      </button>

      <div
        class="slider-yui-kit__slides"
        :data-testid="`${props.dataTestid}-Slides-Container`"
      >
        <div
          class="placeholder-yui-kit no-content"
          v-if="showPlaceholder()"
          :data-testid="`${props.dataTestid}-NoContent-Placeholder`"
        >
          <img
            :src="closedCamera"
            alt=""
            width="111px"
            height="111px"
            :data-testid="`${props.dataTestid}-NoContent-Image`"
          />

          <p :data-testid="`${props.dataTestid}-NoContent-Paragrpah`">
            Контент отсутствует
          </p>
        </div>

        <div
          class="placeholder-yui-kit"
          v-else-if="showPlaceholderExtension()"
          :data-testid="`${props.dataTestid}-Invalid-Extension-Placeholder`"
        >
          <img :src="closedCamera" alt="" width="111px" height="111px" />

          <p>.{{ state.extension }}</p>
        </div>

        <template v-else>
          <img
            v-if="isImage(state.file?.path ?? '')"
            class="slider__item"
            :src="state.filePath ?? ''"
            :data-testid="`${props.dataTestid}-Image`"
            @click="handleClickOnItem(state.file)"
            @error="handleErrorImage"
          />

          <VideoPreview
            v-else-if="isVideo(state.file?.path ?? '')"
            class="slider__item"
            :src="state.file?.path ?? ''"
            @click="handleClickOnItem(state.file)"
          />

          <PdfPreview
            v-else-if="isPdf(state.file?.path ?? '')"
            class="slider-yui-kit__pdf-preview slider__item"
            :src="state.file?.path"
            @click="handleClickOnItem(state.file)"
          />
        </template>
      </div>

      <button
        class="slider-yui-kit__button slider-yui-kit__button--next"
        @click="nextSlide"
        :disabled="rigthIndex()"
        :data-testid="`${props.dataTestid}-Next-Button`"
      >
        <Icon
          :name="IconNameEnum.rightBig"
          :data-testid="`${props.dataTestid}-Next-Icon`"
        />
      </button>
    </div>

    <Teleport to="body">
      <SliderModal
        :open="state.isShowSliderModal"
        :items="state.files"
        :default-index="state.indexModal"
        @close="unmountCloseModal"
      />
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue';
import { ISliderProps, ISlider, IFile } from './interface/interface';
import Icon from './../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import {
  ImageExtensionsEnum,
  VideoExtensionsEnum
} from '@/common/extentions.ts';
import closedCamera from './../../assets/images/slider/closed-camera.svg';
import PdfPreview from '@/components/Preview/PdfPreview.vue';
import SliderModal from '@/components/Slider/SliderModal.vue';
import VideoPreview from '@/components/Preview/VideoPreview.vue';

const props = withDefaults(defineProps<ISliderProps>(), {
  dataTestid: 'Slider'
});

const state = reactive<ISlider>({
  files: props.items.length ? props.items : [],
  file: null,
  currentIndex: props.defaultIndex || 0,
  extension: null,
  filePath: null,
  isShowSliderModal: false,
  indexModal: 0
});

watch(
  () => state.file,
  () => {
    state.filePath = state.file?.path ?? null;
  },
  {
    immediate: true
  }
);

watch(
  () => props.items,
  () => {
    state.files = props.items.length ? props.items : [];
  }
);

const handleErrorImage = (): void => {
  state.filePath = closedCamera;
};

const handleClickOnItem = (file: IFile | null): void => {
  if (!file) return;
  const index = state.files.findIndex(
    (arrFile: IFile) => file.path === arrFile.path
  );

  if (index === -1) return;

  state.indexModal = index;
  state.isShowSliderModal = true;
};

const unmountCloseModal = (): void => {
  state.isShowSliderModal = false;
};

const rigthIndex = (): boolean =>
  props.items?.length ? state.currentIndex === props.items.length - 1 : true;

/**
 * @param str:  string | null
 * @returns
 */
const checkPath = (str: string | null): string | null => {
  if (!str) return null;
  const path = str.split('?')[0];
  const regexExtension = /\.\w+$/;
  const match = path.match(regexExtension);

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

const isPdf = (path: string | null): boolean => {
  const extension = checkPath(path);

  return extension === 'pdf';
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
const showPlaceholderExtension = () => {
  return (
    isImage(state.file?.path ?? null) == false &&
    isVideo(state.file?.path ?? null) == false &&
    isPdf(state.file?.path ?? null) == false &&
    state.files.length > 0
  );
};

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
  border: 0.5px solid var(--border-color);
  border-radius: 10px;
  transition: 0.3s ease-in-out;

  &:hover {
    border-color: var(--border-primary-color);
  }

  &__wrapper {
    width: inherit;
    height: 100%;
    padding: 10px;
    transition: 0.3s ease-in-out;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    background-color: var(--primary-hover-light-color);
  }

  &__slides {
    background-color: var(--white);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;

    img,
    video,
    .slider-yui-kit__pdf-preview {
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
    background-color: var(--white);
    border: 1px solid transparent;
    outline: none;
    border-radius: 5px;
    padding: 0 20px;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
      color: var(--primary-color);
    }

    &:active {
      background-color: var(--background-primary-color);
      color: var(--primary-color);
    }

    &:disabled {
      background-color: var(--border-color);
      color: var(--text-light-color);
      cursor: default;
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

  &:has(.no-content):hover {
    border-color: var(--border-color);
  }

  &__wrapper:has(.no-content) {
    background-color: var(--button-neutral-color);
  }

  .no-content {
    background-color: var(--button-neutral-color);

    & p {
      margin: 0;
      font-size: 14px;
      font-weight: 700;
    }

    & * {
      cursor: default;
    }
  }
}

.placeholder-yui-kit {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  gap: 9px;
  border-radius: 5px;
  background-color: var(--button-neutral-color);

  img {
    height: auto;
  }

  p {
    color: var(--text-light-color);
  }
}

.slider__item {
  height: 100%;
}
</style>
