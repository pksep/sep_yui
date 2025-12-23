<template>
  <ModalAnimated
    position="center"
    class="slider-modal"
    ref="modalRef"
    :open
    :height
    :width
    :animate-type="ModalAnimateEnum.fade"
    @close="$emit('close')"
    @end-animation="$emit('end-animation')"
    @unmounted="$emit('unmounted')"
  >
    <div ref="contentRef" class="slider-modal__content">
      <div
        ref="sideBarRef"
        class="slider-modal__side-bar"
        :class="[
          {
            'slider-modal__side-bar_active': isPdfFile(state.file?.path)
          }
        ]"
      >
        <div
          v-for="(file, idx) in state.sideBarItems"
          ref="miniItemsRef"
          class="slider-modal__side-bar-item"
          :class="{
            'slider-modal__side-bar-item_active': idx === state.sideBarIndex
          }"
          :key="idx"
        >
          <div
            class="slider-modal__mini-prewiew-wrapper"
            @click="handleClickOnMiniPreview(idx)"
          >
            <PdfPreview
              ref="miniPreviewsRef"
              class="slider-modal__mini-preview"
              :src="file"
              :page="idx + 1"
            />
          </div>

          <div class="slider-modal__side-bar-count">{{ idx + 1 }}</div>
        </div>
      </div>

      <div class="slider-modal__main" @click.self="$emit('close')">
        <!-- pdf -->
        <template v-if="isPdfFile(state.file?.path)">
          <div
            class="slider-modal__item"
            @click.self="$emit('close')"
            @wheel="handleWheelOnItem"
          >
            <PdfPreview
              class="slider-modal__pdf"
              ref="pdfRef"
              :src="state?.file?.path"
              :page="state.sideBarIndex + 1"
            />
          </div>
        </template>

        <template v-if="isImage(state.file?.path)">
          <div class="slider-modal__item" @click.self="$emit('close')">
            <img
              :src="state.file?.path"
              :alt="state.file?.path"
              class="slider-modal__image"
              @error="handleErrorImage"
            />
          </div>
        </template>

        <template v-else-if="isVideo(state.file?.path)">
          <div class="slider-modal__item" @click.self="$emit('close')">
            <video
              controls
              class="slider-modal__video"
              :data-testid="`${props.dataTestid}-Video`"
            >
              <source :src="state.file?.path ?? ''" />
            </video>
          </div>
        </template>

        <div class="slider-modal__bottom">
          <div class="slider-modal__nav-block"></div>

          <div class="slider-modal__nav-block">
            <template v-if="props.items.length > 1">
              <button
                class="slider-modal__side-button"
                :disabled="isDisabledPrevButton"
                @click="handleClickOnPrevSlideButton"
              >
                <YIcon
                  class="slider-modal__icon"
                  name="left-big"
                  width="24"
                  height="24"
                />
              </button>

              <BaseSlider
                ref="sliderRef"
                class="slider-modal__bottom-slider"
                :active-index="state.defaultIndex"
              >
                <BaseSlide
                  v-for="(item, idx) in props.items"
                  class="slider-modal__slide"
                  :key="idx"
                  :is-active="idx === state.defaultIndex"
                  @click="handleClickOnItem(idx)"
                >
                  <template v-if="isImage(item.path)">
                    <img
                      class="slider-modal__slide-image"
                      :src="item.path"
                      :alt="item.path"
                      @error="handleErrorImage"
                    />
                  </template>

                  <template v-if="isPdfFile(item.path)">
                    <PdfPreview
                      class="slider-modal__slide-image"
                      :src="item.path"
                      :page="1"
                    />
                  </template>

                  <template v-if="isVideo(item.path)">
                    <VideoPreview
                      class="slider-modal__slide-image"
                      :src="item.path"
                    />
                  </template>
                </BaseSlide>
              </BaseSlider>

              <button
                class="slider-modal__side-button"
                :disabled="isDisabledNextButton"
                @click="handleClickOnNextSlideButton"
              >
                <YIcon
                  class="slider-modal__icon"
                  name="right-big"
                  width="24"
                  height="24"
                />
              </button>
            </template>
          </div>

          <div class="slider-modal__nav-block">
            <button
              class="slider-modal__side-button"
              :disabled="isDisabledRotateButton"
              @click="handleClickOnRotateButton"
            >
              <YIcon
                class="slider-modal__icon"
                name="reset"
                width="24"
                height="24"
              />
            </button>

            <button
              class="slider-modal__side-button"
              :disabled="isDisabledDownloadButton"
              @click="handleClickOnDownloadButton"
            >
              <YIcon
                class="slider-modal__icon"
                name="upload-cloud"
                width="24"
                height="24"
              />
            </button>

            <button
              class="slider-modal__side-button"
              :disabled="isDisabledPrintButton"
              @click="handleClickOnPrintButton"
            >
              <YIcon
                class="slider-modal__icon"
                name="printer"
                width="24"
                height="24"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </ModalAnimated>
</template>

<script setup lang="ts">
import { ModalAnimateEnum } from '@/components/Modal/enum';
import ModalAnimated from '@/components/Modal/ModalAnimated.vue';
import PdfPreview from '@/components/Preview/PdfPreview.vue';
import {
  IFile,
  ISliderModalEmit,
  ISliderModalProps
} from '@/components/Slider/interface/interface';
import { computed, nextTick, onUnmounted, reactive, ref, watch } from 'vue';
import checkPath from '@/helpers/file/check-path';
import { getDocument, isPdfFile } from 'pdfjs-dist';
import cachePdf from '@/helpers/file/cache-pdf';
import BaseSlider from '@/components/Slider/BaseSlider.vue';
import BaseSlide from '@/components/Slider/BaseSlide.vue';
import isImage from '@/helpers/file/is-image';
import closedCamer from '@/assets/images/slider/closed-camera.svg';
import isElementVisible from '@/helpers/element/is-element-visible';
import downloadFile from '@/helpers/file/download-file';
import printJs, { PrintTypes } from 'print-js';
import isVideo from '@/helpers/file/is-video';
import VideoPreview from '@/components/Preview/VideoPreview.vue';

defineOptions({
  name: 'SliderModal'
});

const props = withDefaults(defineProps<ISliderModalProps>(), {
  dataTestid: 'SliderModal'
});
defineEmits<ISliderModalEmit>();

const state = reactive<{
  file: IFile | null;
  // индекс для открытия файлов из переданного списка
  defaultIndex: number;
  // индекс для открытия файла из богового меню
  sideBarIndex: number;
  sideBarItems: string[];
  sideBarLength: number;
  isErrorFile: boolean;
}>({
  defaultIndex: props.defaultIndex ?? 0,
  file: props.items[props.defaultIndex ?? 0],
  sideBarItems: [],
  sideBarIndex: 0,
  sideBarLength: 0,
  isErrorFile: false
});

const miniItemsRef = ref<HTMLElement[] | null>(null);
const sideBarRef = ref<HTMLElement | null>(null);

const sliderRef = ref<InstanceType<typeof BaseSlider> | null>(null);

const isDisabledPrevButton = computed(() => state.defaultIndex === 0);

const isDisabledNextButton = computed(
  () => state.defaultIndex === props.items.length - 1
);

const isDisabledRotateButton = computed(() => {
  let isDisabled = !state.file || state.isErrorFile;
  isDisabled = isVideo(state.file?.path) || isDisabled;
  return isDisabled;
});

const isDisabledPrintButton = computed(() => {
  let isDisabled = !state.file || state.isErrorFile;
  isDisabled = isVideo(state.file?.path) || isDisabled;

  return isDisabled;
});

const isDisabledDownloadButton = computed(() => {
  const isDisabled = !state.file || state.isErrorFile;

  return isDisabled;
});

watch([() => props.items, () => props.defaultIndex], () => {
  state.file = props.items[props.defaultIndex ?? 0];
  state.defaultIndex = props.defaultIndex ?? 0;
});

watch([() => state.file, () => props.open], () => {
  state.isErrorFile = false;
  if (!props.open) {
    clearPdf();
    state.file = null;
    return;
  }

  if (!state.file) {
    state.file = props.items[props.defaultIndex ?? 0];
  }

  initFile();
});

watch(
  () => props.open,
  () => {
    if (!props.open) return;

    nextTick(() => {
      if (!sliderRef.value) return;
      sliderRef.value.initScroll();
    });

    state.defaultIndex = props.defaultIndex ?? 0;
  }
);

watch(
  () => state.sideBarIndex,
  () => {
    initScroll();
  }
);

const handleClickOnItem = (idx: number): void => {
  setItem(idx);
};

const handleClickOnMiniPreview = (idx: number): void => {
  state.sideBarIndex = idx;
};

const handleWheelOnItem = (event: WheelEvent): void => {
  updateIndexByWheel(event.deltaY);
};

const handleClickOnRotateButton = (): void => {};

const handleClickOnPrintButton = (): void => {
  if (!state.file?.path) return;
  let type: PrintTypes = 'pdf';

  if (isImage(state.file?.path)) {
    type = 'image';
  }

  printJs({
    printable: state.file?.path,
    type
  });
};

const handleClickOnDownloadButton = (): void => {
  if (!state.file?.path) return;
  downloadFile(state.file?.path);
};

const handleErrorImage = (e: Event): void => {
  const target = e.target as HTMLImageElement;
  target.src = closedCamer;
  state.isErrorFile = true;
};

const handleClickOnNextSlideButton = (): void => {
  if (!sliderRef.value) return;

  setItem(sliderRef.value.nextSlide());
};

const handleClickOnPrevSlideButton = (): void => {
  if (!sliderRef.value) return;

  setItem(sliderRef.value.prevSlide());
};

const setItem = (idx: number): void => {
  state.defaultIndex = idx;
  clearPdf();
  state.file = props.items[idx];
};

const updateIndexByWheel = (deltaY: number) => {
  let newIndex = state.sideBarIndex;
  if (deltaY > 0) {
    newIndex = state.sideBarIndex + 1;
    newIndex = Math.min(state.sideBarLength - 1, newIndex);
  } else {
    newIndex = state.sideBarIndex - 1;
    newIndex = Math.max(0, newIndex);
  }
  state.sideBarIndex = newIndex;
};

const initFile = (): void => {
  nextTick(() => {
    if (!state.file) return;
    const extension = checkPath(state.file.path);

    if (extension === 'pdf') {
      initPdf();
    }
  });
};

const scrollToElementIfNotVisible = (
  el: HTMLElement,
  container: HTMLElement | null = null
): void => {
  if (!el) return;

  const isVisible = container
    ? isElementVisible(el, container)
    : isElementVisible(el);

  if (!isVisible) {
    el.scrollIntoView({
      behavior: 'smooth', // плавная прокрутка
      block: 'nearest' // минимально необходимое смещение
    });
  }
};

const initScroll = (): void => {
  nextTick(() => {
    if (!miniItemsRef.value || !sideBarRef.value) return;

    const el = miniItemsRef.value[state.sideBarIndex];
    scrollToElementIfNotVisible(el, sideBarRef.value);
  });
};

const initPdf = async (): Promise<void> => {
  try {
    if (state.file === null) return;
    const cachedPdf = cachePdf.getCache(state.file.path);
    let pdf;
    if (cachedPdf) {
      pdf = cachedPdf;
    } else {
      pdf = await getDocument(state.file?.path).promise;
    }

    if (!pdf) return;

    state.sideBarLength = pdf.numPages;
    state.sideBarItems = new Array(pdf.numPages).fill(state.file?.path ?? '');

    cachePdf.setCache(state.file.path, pdf);

    setPdfPage(0);
  } catch (error) {
    console.error(error);
  }
};

const setPdfPage = async (index: number = 0): Promise<void> => {
  state.sideBarIndex = index;
};

const clearPdf = (): void => {
  state.sideBarItems = [];
  state.sideBarIndex = 0;
  state.sideBarLength = 0;
};

onUnmounted(() => {
  clearPdf();
});
</script>

<style scoped>
.modal-yui-kit.slider-modal {
  backdrop-filter: blur(20px);
  max-width: none;
  max-height: none;
  margin: 0;

  width: 100%;
  height: 100%;
  background-color: transparent;
  border-radius: 0;
}

.slider-modal::backdrop {
  background-color: transparent;
}
.slider-modal__content {
  display: flex;

  width: 100%;
  height: 100%;
  background-color: var(--background-color-80);

  transition: all 0.2s ease;
}

.slider-modal__side-bar {
  width: 0;
  height: 100vh;
  overflow: auto;
  overflow-x: hidden;

  padding: 60px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  background-color: var(--background-color-80);

  transition: all 0.2s ease;
}

.slider-modal__side-bar_active {
  width: 300px;
}

.slider-modal__side-bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.slider-modal__side-bar-item_active .slider-modal__mini-prewiew-wrapper {
  background-color: var(--primary-color);
}

.slider-modal__side-bar-item_active .slider-modal__mini-preview {
  clip-path: inset(5px 5px 5px 5px);
}

.slider-modal__mini-prewiew-wrapper {
  width: 150px;
  height: 212px;
  background-color: var(--primary-color-20);

  transition: all 0.2s ease;
}

.slider-modal__mini-preview {
  width: 100%;
  height: 100%;

  clip-path: inset(0 0 0 0);
  transition: all 0.2s ease;
}

.slider-modal__side-bar-count {
  color: var(--white);
}

.slider-modal__main {
  width: 100%;
  height: 100vh;

  padding: 60px 60px 0 60px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.slider-modal__item {
  display: flex;
  justify-content: center;

  height: 100%;
  width: 100%;
}

.slider-modal__main:has(.slider-modal__bottom)
  .slider-modal__item:is(
    :has(.slider-modal__pdf),
    :has(.slider-modal__image),
    :has(.slider-modal__video)
  ) {
  height: calc(100% - 130px);
}

.slider-modal__pdf,
.slider-modal__image,
.slider-modal__video {
  max-width: 100%;
  height: 100%;
}

.slider-modal__bottom {
  padding: 10px 0;
  height: 120px;
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
}

.slider-modal__nav-block {
  flex: 1 1 25%;

  display: flex;
}

.slider-modal__nav-block:nth-child(2) {
  flex: 1 1 50%;
}

.slider-modal__nav-block:nth-child(3) {
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

.slider-modal__bottom-slider {
  width: 45.8vw;
}

.slider-modal__slide {
  --w: 100px;
  width: var(--w);
  height: var(--w);
}

.slider-modal__slide-image {
  width: 100%;
  height: 100%;
  object-fit: fill;
  background-color: var(--white);
}

.slider-modal__icon {
  color: var(--white);
  transition: all 0.2s ease;
}

.slider-modal__side-button {
  width: 60px;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;
  padding: 0;
  border: none;
  user-select: none;
}

.slider-modal__nav-block:nth-child(3) .slider-modal__side-button {
  width: 42px;
  height: 40px;
}

:is(.slider-modal__side-button:hover, .slider-modal__side-button:active)
  .slider-modal__icon {
  color: var(--primary-color);
}

.slider-modal__side-button:disabled .slider-modal__icon {
  color: var(--text-light-color);
}
</style>
