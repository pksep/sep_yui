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
          v-else-if="showError()"
          :data-testid="`${props.dataTestid}-Error-Placeholder`"
        >
          <img :src="closedCamera" alt="" width="111px" height="111px" />

          <p
            class="slider-yui-kit__error-text"
            :data-testid="`${props.dataTestid}-Error-Paragrpah`"
          >
            {{ state.errorText }}
          </p>
        </div>

        <div
          class="slider-yui-kit__extension"
          v-else-if="showPlaceholderExtension()"
          :data-testid="`${props.dataTestid}-Invalid-Extension-Placeholder`"
          @click="handleClickOnItem(state.file)"
        >
          <p>.{{ currentFileExtension }}</p>
        </div>

        <template v-else>
          <img
            v-if="isImage(currentFilePath)"
            class="slider__item"
            :src="currentFilePath"
            :data-testid="`${props.dataTestid}-Image`"
            @click="handleClickOnItem(state.file)"
            @error="handleError"
            @load="handleLoad"
          />

          <VideoPreview
            v-else-if="isVideo(currentFilePath)"
            class="slider__item slider__item_video"
            :src="currentFilePath"
            @click="handleClickOnItem(state.file)"
            @load="handleLoad"
            @error="handleError"
          />

          <PdfPreview
            v-else-if="isPdf(currentFilePath)"
            class="slider-yui-kit__pdf-preview slider__item"
            :src="currentFilePath"
            @click="handleClickOnItem(state.file)"
            @load="handleLoad"
            @error="handleError"
          />

          <div
            class="placeholder-yui-kit no-content"
            v-else
            :data-testid="`${props.dataTestid}-NoContent-Placeholder`"
          >
            <p :data-testid="`${props.dataTestid}-NoContent-Paragrpah`">
              Ошибка загрузки файла
            </p>
          </div>
        </template>

        <Loader
          v-if="!state.isLoad && isRequiredLoad && !state.isError"
          class="slider-yui-kit__loader"
        />
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
        :items="modalItems"
        :default-index="state.indexModal"
        @close="unmountCloseModal"
      />
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, watch } from 'vue';
import {
  ISliderProps,
  ISlider,
  IFile,
  SliderItem
} from './interface/interface';
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
import Loader from '@/components/Loader/Loader.vue';

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
  indexModal: 0,
  isLoad: false,
  isError: false,
  errorText: null
});

const DEFAULT_ERROR_TEXT = 'Ошибка загрузки файла';
const MAX_ERROR_TEXT_LENGTH = 500;

const currentFilePath = computed(() => getFilePath(state.file) ?? '');

const currentFileExtension = computed(() =>
  getPathExtension(currentFilePath.value)
);

const modalItems = computed<IFile[]>(() =>
  state.files.reduce<IFile[]>((items, item) => {
    const path = getFilePath(item);

    if (path) {
      items.push({
        path,
        name: item.name,
        file: item.file
      });
    }

    return items;
  }, [])
);

const isRequiredLoad = computed(() => {
  if (!state.files.length || state.isError) return false;

  return (
    isImage(currentFilePath.value) ||
    isVideo(currentFilePath.value) ||
    isPdf(currentFilePath.value)
  );
});

const reset = () => {
  state.isError = false;
  state.isLoad = false;
  state.errorText = null;
};

const handleLoad = (): void => {
  state.isLoad = true;
};

const handleError = async (error?: unknown): Promise<void> => {
  const filePath = currentFilePath.value;

  state.isError = true;
  state.isLoad = true;
  state.errorText =
    getErrorText(error) ??
    getPathErrorText(state.file?.path) ??
    DEFAULT_ERROR_TEXT;

  const responseErrorText = await getResponseErrorText(filePath);

  if (filePath === currentFilePath.value && responseErrorText) {
    state.errorText = responseErrorText;
  }
};

const handleClickOnItem = (file: SliderItem | null): void => {
  if (!file) return;

  const path = getFilePath(file);
  if (!path) return;

  const index = modalItems.value.findIndex(
    (arrFile: IFile) => path === arrFile.path
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

const getTextFromUnknown = (value: unknown): string | null => {
  if (typeof value !== 'string') return null;

  const text = value.trim();
  return text ? text.slice(0, MAX_ERROR_TEXT_LENGTH) : null;
};

const getErrorText = (error: unknown): string | null => {
  const text = getTextFromUnknown(error);
  if (text) return text;

  if (error instanceof Error) {
    return getTextFromUnknown(error.message);
  }

  if (!error || typeof error !== 'object') return null;

  const errorObject = error as { error?: unknown; message?: unknown };

  return (
    getTextFromUnknown(errorObject.error) ??
    getTextFromUnknown(errorObject.message)
  );
};

const getPathErrorText = (
  path: SliderItem['path'] | undefined
): string | null => {
  const text = getTextFromUnknown(path);

  if (text) {
    if (text.toLowerCase() === 'error') return DEFAULT_ERROR_TEXT;

    if (text.toLowerCase().startsWith('error:')) {
      return text.replace(/^error:\s*/i, '') || DEFAULT_ERROR_TEXT;
    }

    return null;
  }

  return getErrorText(path);
};

const getFilePath = (file: SliderItem | null): string | null => {
  if (typeof file?.path !== 'string') return null;
  if (getPathErrorText(file.path)) return null;

  return file.path;
};

const getTextFromResponseBody = (text: string): string | null => {
  const normalizedText = getTextFromUnknown(text);
  if (!normalizedText) return null;

  try {
    const parsedText = JSON.parse(normalizedText);
    return getErrorText(parsedText) ?? normalizedText;
  } catch {
    return normalizedText;
  }
};

const getResponseErrorText = async (path: string): Promise<string | null> => {
  if (!path) return null;

  try {
    const response = await fetch(path);
    const contentType = response.headers.get('content-type') ?? '';
    const isTextResponse =
      contentType.includes('application/json') ||
      contentType.startsWith('text/');

    if (response.ok && !isTextResponse) return null;

    const text = await response.text();
    return (
      getTextFromResponseBody(text) ??
      (!response.ok ? `${DEFAULT_ERROR_TEXT} (${response.status})` : null)
    );
  } catch {
    return null;
  }
};

const getPathExtension = (str: string | null): string | null => {
  if (!str) return null;

  const path = str.split('?')[0];
  const regexExtension = /\.\w+$/;
  const match = path.match(regexExtension);

  return match ? match[0].replace('.', '') : null;
};

/**
 * @param str:  string | null
 * @returns
 */
const checkPath = (str: string | null): string | null => {
  state.extension = getPathExtension(str);

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

const showError = (): boolean => state.isError && !!state.errorText;

/**
 * Показывает заглушку на контент, когда файл есть, но не принадлежит к картинкам и видео
 */
const showPlaceholderExtension = (): boolean => {
  return (
    !!currentFilePath.value &&
    !!currentFileExtension.value &&
    isImage(currentFilePath.value) == false &&
    isVideo(currentFilePath.value) == false &&
    isPdf(currentFilePath.value) == false &&
    state.files.length > 0 &&
    !state.isError
  );
};

watch(
  () => props.items,
  () => {
    state.files = props.items;
    reset();
  },
  { deep: true }
);

watch(
  () => state.file,
  () => {
    state.filePath = currentFilePath.value || null;
    reset();

    const pathErrorText = getPathErrorText(state.file?.path);

    if (!pathErrorText) return;

    state.isError = true;
    state.isLoad = true;
    state.errorText = pathErrorText;
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

  &__error-text {
    max-width: min(100%, 360px);
    padding: 0 12px;
    overflow: hidden;
    display: -webkit-box;
    text-align: center;
    word-break: break-word;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
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

.slider__item_video {
  width: 100%;
  object-fit: contain;
}

.slider-yui-kit__slides {
  position: relative;
}

.slider-yui-kit__loader {
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

.slider-yui-kit__extension {
  color: var(--primary-color);
  font-size: 54px;
  font-weight: 800;
}
</style>
