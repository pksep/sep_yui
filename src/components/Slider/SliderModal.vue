<template>
  <ModalAnimated
    position="center"
    class="slider-modal"
    ref="modalRef"
    :open
    :height
    :width
    :animate-type="ModalAnimateEnum.fade"
    @close="unmountClose"
    @end-animation="$emit('end-animation')"
    @unmounted="$emit('unmounted')"
    @pointerup="handlePointerEnd"
    @pointerleave="handlePinterLeave"
    @touchend="handleTouchEnd"
  >
    <div ref="contentRef" class="slider-modal__content">
      <div
        ref="sideBarRef"
        class="slider-modal__side-bar"
        :class="[
          {
            'slider-modal__side-bar_active':
              isPdfFile(state.file?.path) || isPdfFile(state.file?.file)
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

      <div v-if="state.isMobile" class="slider-modal__mobile-header">
        <div class="slider-modal__mobile-header-block">
          <div class="slider-modal__exit-button" @click="$emit('close')">
            <Icon
              class="slider-modal__exit-icon"
              :name="IconNameEnum.leftBig"
              :width="16"
              :height="16"
            />

            <div class="slider-modal__exit-text">Назад</div>
          </div>
        </div>

        <div class="slider-modal__mobile-header-block">
          <div class="slider-modal__counter">
            {{ state.defaultIndex + 1 }} из {{ props.items.length }}
          </div>
        </div>

        <div class="slider-modal__mobile-header-block">
          {{ state.zoomValue }}
        </div>
      </div>

      <div
        ref="mainRef"
        class="slider-modal__main"
        @mousedown.self="handleMouseDownOnExitItem"
        @mouseup.self="handleMouseUpOnExitItem"
      >
        <!-- pdf -->
        <template
          v-if="isPdfFile(state.file?.path) || isPdfFile(state.file?.file)"
        >
          <div
            ref="itemRef"
            class="slider-modal__item"
            @mousedown.self="handleMouseDownOnExitItem"
            @mouseup.self="handleMouseUpOnExitItem"
            @wheel="handleWheelOnItem"
            @scroll="handleScrollItem"
            @pointerdown="handlePointerStart"
            @pointermove="handlePointerMove"
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
          >
            <div
              v-if="!state.isMobile"
              ref="viewportRef"
              class="slider-modal__viewport"
              @mousedown.stop="handleMouseDownOnViewport"
              @mousemove="handleMouseMoveOnViewport"
              @mouseup="handleMouseUpOnViewport"
              @mouseleave="handleMouseUpOnViewport"
            >
              <PdfPreview
                class="slider-modal__pdf"
                ref="pdfRef"
                :src="state?.file?.path"
                :page="state.sideBarIndex + 1"
              />
            </div>

            <template v-else>
              <div
                v-for="(file, idx) in state.sideBarItems"
                :key="idx"
                class="slider-modal__viewport"
              >
                <PdfPreview
                  ref="miniPreviewsRef"
                  class="slider-modal__pdf slider-modal__pdf_mobile"
                  :src="file"
                  :page="idx + 1"
                />
              </div>
            </template>
          </div>
        </template>

        <!-- image -->
        <template v-else-if="isImage(state.file?.path)">
          <div
            ref="itemRef"
            class="slider-modal__item"
            @click.self="unmountClose"
            @pointerdown="handlePointerStart"
            @pointermove="handlePointerMove"
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            @mousedown.self="handleMouseDownOnExitItem"
            @mouseup.self="handleMouseUpOnExitItem"
          >
            <div
              ref="viewportRef"
              class="slider-modal__viewport"
              @mousedown.self="handleMouseDownOnExitItem"
              @mouseup.self="handleMouseUpOnExitItem"
            >
              <img
                ref="imagePreviewRef"
                class="slider-modal__image"
                :src="state.file?.path"
                @error="handleErrorItem($event, true)"
                @load="handleLoadImage"
              />
            </div>
          </div>
        </template>

        <!-- video -->
        <template v-else-if="isVideo(state.file?.path)">
          <div
            class="slider-modal__item"
            @click.self="unmountClose"
            @pointerdown="handlePointerStart"
            @pointermove="handlePointerMove"
            @touchstart.prevent="handleTouchStart"
            @touchmove.prevent="handleTouchMove"
            @mousedown.self="handleMouseDownOnExitItem"
            @mouseup.self="handleMouseUpOnExitItem"
          >
            <video
              controls
              playsinline
              webkit-playsinline
              class="slider-modal__video"
              :key="state.file?.path"
              :data-testid="`${props.dataTestid}-Video`"
              @error="handleErrorItem($event, true)"
            >
              <source :src="state.file?.path ?? ''" />
            </video>
          </div>
        </template>

        <template v-else>
          <div
            class="slider-modal__item"
            @click.self="unmountClose"
            @pointerdown="handlePointerStart"
            @pointermove="handlePointerMove"
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            @mousedown.self="handleMouseDownOnExitItem"
            @mouseup.self="handleMouseUpOnExitItem"
          >
            <img class="slider-modal__image" :src="closedCamer" />
          </div>
        </template>

        <div class="slider-modal__bottom">
          <div class="slider-modal__nav-block">
            <br />
          </div>

          <div class="slider-modal__nav-block">
            <template v-if="props.items.length > 1">
              <button
                class="slider-modal__side-button"
                :disabled="isDisabledPrevButton"
                @click="handleClickOnPrevSlideButton"
              >
                <Icon
                  class="slider-modal__icon"
                  :name="IconNameEnum.leftBig"
                  :width="24"
                  :height="24"
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
                  :class="{
                    'slider-modal__slide_active': idx === state.defaultIndex
                  }"
                  :key="idx"
                  :is-active="idx === state.defaultIndex"
                  @click="handleClickOnItem(idx)"
                >
                  <template v-if="isImage(item.path)">
                    <img
                      class="slider-modal__slide-image"
                      :src="item.path"
                      :alt="item.path"
                      @error="handleErrorItem"
                    />
                  </template>

                  <template
                    v-else-if="
                      isPdfFile(item.path) || isPdfFile(state.file?.file)
                    "
                  >
                    <PdfPreview
                      class="slider-modal__slide-image"
                      :src="item.path"
                      :page="1"
                    />
                  </template>

                  <template v-else-if="isVideo(item.path)">
                    <VideoPreview
                      class="slider-modal__slide-image"
                      :src="item.path"
                    />
                  </template>

                  <template v-else>
                    <img class="slider-modal__slide-image" :src="closedCamer" />
                  </template>
                </BaseSlide>
              </BaseSlider>

              <button
                class="slider-modal__side-button"
                :disabled="isDisabledNextButton"
                @click="handleClickOnNextSlideButton"
              >
                <Icon
                  class="slider-modal__icon"
                  :name="IconNameEnum.rightBig"
                  :width="24"
                  :height="24"
                />
              </button>
            </template>
          </div>

          <div class="slider-modal__nav-block">
            <div class="slider-modal__sub-nav">
              <button
                class="slider-modal__side-button slider-modal__side-button_zoom"
                :disabled="isDisabledZoomButton"
                @click="handleClickOnZoomMinusButton"
              >
                <Icon
                  class="slider-modal__icon"
                  :name="IconNameEnum.zoomMinus"
                  :width="24"
                  :height="24"
                />
              </button>

              <button
                class="slider-modal__side-button slider-modal__side-button_zoom"
                :disabled="isDisabledZoomButton"
                @click="handleClickOnZoomPlusButton"
              >
                <Icon
                  class="slider-modal__icon"
                  :name="IconNameEnum.zoomPlus"
                  :width="24"
                  :height="24"
                />
              </button>

              <button
                class="slider-modal__side-button"
                :disabled="isDisabledRotateButton"
                @click="handleClickOnRotateButton"
              >
                <Icon
                  class="slider-modal__icon"
                  :name="IconNameEnum.reset"
                  :width="24"
                  :height="24"
                />
              </button>
            </div>

            <div class="slider-modal__sub-nav">
              <button
                class="slider-modal__side-button"
                :disabled="isDisabledDownloadButton"
                @click="handleClickOnDownloadButton"
              >
                <Icon
                  class="slider-modal__icon"
                  :name="IconNameEnum.uploadCloud"
                  :width="24"
                  :height="24"
                />
              </button>

              <button
                class="slider-modal__side-button slider-modal__side-button_printer"
                :disabled="isDisabledPrintButton"
                @click="handleClickOnPrintButton"
              >
                <Icon
                  class="slider-modal__icon"
                  :name="IconNameEnum.printer"
                  :width="24"
                  :height="24"
                />
              </button>
            </div>
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
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch
} from 'vue';
import { getDocument } from 'pdfjs-dist';
import cachePdf from '@/helpers/file/cache-pdf';
import BaseSlider from '@/components/Slider/BaseSlider.vue';
import BaseSlide from '@/components/Slider/BaseSlide.vue';
import isImage from '@/helpers/file/is-image';
import closedCamer from '@/assets/images/slider/closed-camera.svg';
import downloadFile from '@/helpers/file/download-file';
import printJs, { PrintTypes } from 'print-js';
import isVideo from '@/helpers/file/is-video';
import VideoPreview from '@/components/Preview/VideoPreview.vue';
import scrollToElementIfNotVisible from '@/helpers/element/scroll-element-if-not-visiable';
import Icon from '../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import changeStyleProperties from '@/helpers/change-style-properties';
import isPdfFile from '@/helpers/file/isPdfFile';
import Panzoom from '@panzoom/panzoom';

defineOptions({
  name: 'SliderModal'
});

const props = withDefaults(defineProps<ISliderModalProps>(), {
  dataTestid: 'SliderModal',
  defaultIndex: 0
});
const emit = defineEmits<ISliderModalEmit>();

const mediaQuery = window.matchMedia('(max-width: 768px)');

const state = reactive<{
  file: IFile | null | undefined;
  // индекс для открытия файлов из переданного списка
  defaultIndex: number;
  // индекс для открытия файла из богового меню
  sideBarIndex: number;
  sideBarItems: string[];
  sideBarLength: number;
  isErrorFile: boolean;
  isDragging: boolean;
  isClickOnExit: boolean;
  isPointerActive: boolean;
  isExistSwipe: boolean;
  isChangeItemSwipe: boolean;
  isSwipeNextSlide: boolean;
  isSwipePrevSlide: boolean;
  isExitScrollActive: boolean;

  isMobile: boolean;
  zoomValue: number;
  offsetX: number;
  offsetY: number;
  startX: number;
  startY: number;
  startXForMobile: number;
  startYForMobile: number;
  endXForMobile: number;
  endYForMobile: number;
  startScrollTop: number;
  overscrollDelta: number;
  rotateValue: number;
}>({
  defaultIndex: props.defaultIndex,
  file: props.items[props.defaultIndex],
  sideBarItems: [],
  sideBarIndex: 0,
  sideBarLength: 0,
  isErrorFile: false,
  isClickOnExit: false,
  isDragging: false,
  isMobile: false,
  isPointerActive: false,
  isExistSwipe: false,
  isChangeItemSwipe: false,
  isSwipeNextSlide: false,
  isSwipePrevSlide: false,
  isExitScrollActive: false,
  zoomValue: 1,
  offsetX: 0,
  offsetY: 0,
  startX: 0,
  startY: 0,
  startXForMobile: 0,
  startYForMobile: 0,
  endXForMobile: 0,
  endYForMobile: 0,
  overscrollDelta: 0,
  startScrollTop: 0,
  rotateValue: 0
});

const SWIPE_EXIT_THRESHOLD = 80;
const SWIPE_DELAY_EXIT_THRESHOLD = 20;
const SWIPE_CHANGE_ITEM_THRESHOLD = 80;
const SWIPE_DELAY_CHANGE_ITEM_THRESHOLD = 20;

const miniItemsRef = ref<HTMLElement[] | null>(null);
const sideBarRef = ref<HTMLElement | null>(null);
const itemRef = ref<HTMLElement | null>(null);
const viewportRef = ref<HTMLElement | null>(null);
const mainRef = ref<HTMLElement | null>(null);

const pdfRef = ref<InstanceType<typeof PdfPreview> | null>(null);
const sliderRef = ref<InstanceType<typeof BaseSlider> | null>(null);
const imagePreviewRef = ref<HTMLImageElement | null>(null);

let panzoomInstance: ReturnType<typeof Panzoom> | null = null;

const isDisabledPrevButton = computed(() => state.defaultIndex === 0);

const isDisabledNextButton = computed(
  () => state.defaultIndex === props.items.length - 1
);

const isDisabledRotateButton = computed(() => {
  let isDisabled = !state.file || state.isErrorFile;
  // Если это видео, то нельзя поворачивать
  isDisabled = isVideo(state.file?.path) || isDisabled;

  isDisabled = (state.isMobile && isPdfFile(state.file?.path)) || isDisabled;
  return isDisabled;
});

const isDisabledPrintButton = computed(() => {
  let isDisabled = !state.file || state.isErrorFile;
  // Если это видео, то нельзя печатать
  isDisabled = isVideo(state.file?.path) || isDisabled;

  return isDisabled;
});

const isDisabledDownloadButton = computed(() => {
  const isDisabled = !state.file || state.isErrorFile;

  return isDisabled;
});

const isDisabledZoomButton = computed(() => {
  let isDisabled = !state.file || state.isErrorFile;
  // Если это видео, то нельзя увеличивать
  isDisabled = isVideo(state.file?.path) || isDisabled;
  return isDisabled;
});

const contentStyle = computed(() => ({
  transform: `
    scale(${state.zoomValue})
  `
}));

const setZoomElement = (): void => {
  if (!imagePreviewRef.value) return;
  resetListenerPanzoom();

  const parent = imagePreviewRef.value.parentElement;

  if (!parent) return;

  const parentRect = parent.getBoundingClientRect();
  const elemRect = imagePreviewRef.value.getBoundingClientRect();

  const x = (parentRect.width - elemRect.width) / 2;
  const y = (parentRect.height - elemRect.height) / 2;

  panzoomInstance = Panzoom(imagePreviewRef.value, {
    maxScale: 3,
    minScale: 1,
    startX: x,
    startY: y,
    panOnlyWhenZoomed: true,
    startScale: 1,
    animate: true,
    cursor: 'default',

    setTransform: (elem, { x, y, scale }) => {
      const parent = elem.parentElement;

      const element = elem as HTMLElement;
      if (!parent) return;
      element;

      if (state.isMobile) {
        scale = Math.max(Math.min(scale, 3), 1);
        state.zoomValue = scale;
      }

      panzoomInstance?.setStyle(
        'transform',
        `translate(${x}px, ${y}px) scale(${scale})`
      );
    }
  });

  panzoomInstance.handleUp = () => {
    if (!panzoomInstance || !imagePreviewRef.value) return;

    const element = imagePreviewRef.value;
    const scale = panzoomInstance.getScale();

    if (scale <= 1) {
      centerPositionPanzoom();
      return;
    }

    if (state.isMobile) return;

    const {
      top: parentTop,
      left: parentLeft,
      bottom: parentBottom,
      right: parentRight
    } = parent.getBoundingClientRect();

    const { x, y } = panzoomInstance.getPan();

    const {
      top: elemTop,
      left: elemLeft,
      right: elemRight,
      bottom: elemBottom,
      width: elementWidth,
      height: elementHeight
    } = element.getBoundingClientRect();

    const normalizedWidth = elementWidth / scale;
    const normalizedHeight = elementHeight / scale;

    let newX = x;
    let newY = y;

    if (parentLeft < elemLeft) {
      newX = (normalizedWidth - normalizedWidth / 2) * (scale - 1);
    }

    if (parentTop < elemTop) {
      newY = (normalizedHeight - normalizedHeight / 2) * (scale - 1);
    }

    if (parentRight > elemRight) {
      newX =
        parentRight -
        parentLeft -
        normalizedWidth * scale +
        (normalizedWidth * (scale - 1)) / 2;
    }

    if (parentBottom > elemBottom) {
      newY = (normalizedHeight - normalizedHeight / 2) * (scale - 1) * -1;
    }

    panzoomInstance.pan(newX, newY, {
      force: true
    });
  };

  document.addEventListener('pointerup', panzoomInstance.handleUp);
};

const resetListenerPanzoom = (): void => {
  if (!panzoomInstance) return;

  document.removeEventListener('pointerup', panzoomInstance.handleUp);
  panzoomInstance.destroy();
};

const centerPositionPanzoom = (): void => {
  if (!panzoomInstance || !imagePreviewRef.value) return;

  const parent = imagePreviewRef.value.parentElement;
  if (!parent) return;
  const parentRect = parent.getBoundingClientRect();

  const elemWidth = imagePreviewRef.value.offsetWidth;
  const elemHeight = imagePreviewRef.value.offsetHeight;

  const x = (parentRect.width - elemWidth) / 2;
  const y = (parentRect.height - elemHeight) / 2;

  panzoomInstance.pan(x, y, {
    force: true
  });
};

// отслеживаем изменение списка
watch([() => props.items, () => props.defaultIndex], () => {
  state.file = props.items[props.defaultIndex ?? 0];
  state.defaultIndex = props.defaultIndex ?? 0;
  resetListenerPanzoom();
});

// Отслеживаем изменение открытого файла
watch([() => state.file, () => props.open], () => {
  if (!props.open) {
    clearPdf();
    state.file = null;
    return;
  }
  //  Обнуляем зум
  state.zoomValue = 1;
  resetRotate();

  if (!state.file) {
    state.file = props.items[props.defaultIndex ?? 0];
  }

  state.isErrorFile = false;

  initFile();
});

watch(
  () => props.open,
  () => {
    if (!props.open) {
      panzoomInstance?.destroy();
      resetListenerPanzoom();

      return;
    }

    nextTick(() => {
      // Скроллим к выбранному элементу
      if (!sliderRef.value) return;
      sliderRef.value.initScroll();
    });

    state.defaultIndex = props.defaultIndex ?? 0;
  }
);

// При изменение индекса бокового меню, скролим к выбранному элементу
watch(
  () => state.sideBarIndex,
  () => {
    initScroll();
  }
);

const unmountClose = (): void => {
  if (state.isClickOnExit) emit('close');
};

/**
 * Обрабатывает клик по элементу
 *
 * Устанавливает конкретный элемент
 * @param idx
 */
const handleClickOnItem = (idx: number): void => {
  setItem(idx);
};

/**
 * Обрабатывает клик элементу бокового меню
 *
 * Устанавливает конкретный элемент
 * @param idx
 */
const handleClickOnMiniPreview = (idx: number): void => {
  state.sideBarIndex = idx;
};

/**
 * Обрабатывает событие средней кнопки мыши при скролле над элементом
 *
 * Меняет индекс для бокового меню
 * @param event
 */
const handleWheelOnItem = (event: WheelEvent): void => {
  if (state.isMobile) return;
  updateIndexByWheel(event.deltaY);
};

const handleClickOnZoomPlusButton = (): void => {
  zoom(true);
};

const handleClickOnZoomMinusButton = (): void => {
  zoom(false);
};

const handleClickOnRotateButton = (): void => {
  if (pdfRef.value) {
    pdfRef.value.rotatePdf(-90);
  }

  if (imagePreviewRef.value) {
    state.rotateValue += -90;

    const scaleImage = getScaleImage();
    const style = {
      transform: ` rotate(${state.rotateValue}deg) scale(${scaleImage})`
    };

    changeStyleProperties(style, imagePreviewRef.value);
  }
};

/**
 * Обрабатывает клик по кнопке печати
 *
 * Открывает окно печати
 */
const handleClickOnPrintButton = (): void => {
  if (!state.file?.path) return;
  let type: PrintTypes = 'pdf';
  let style: string = ``;
  let imageStyle: string = ``;

  if (isImage(state.file?.path)) {
    type = 'image';
    style = `
        @page {
          size: A4 portrait;
          margin: 10mm;
        }
      `;
    imageStyle = 'max-height: 95vh; margin-bottom: 10px; max-width: 100%';
  }

  printJs({
    printable: state.file?.path,
    type,
    style,
    imageStyle
  });
};

/**
 * Обрабатывает клик по кнопке скачать
 *
 * Скачивает файл
 */
const handleClickOnDownloadButton = (): void => {
  if (!state.file?.path) return;
  downloadFile(state.file?.path, state.file?.name);
};

/**
 * Обрабатывает ошибку загрузки изображения
 *
 * Устанавливает заглушку при ошибке загрузке файла
 * @param e
 */
const handleErrorItem = (e: Event, isMainImage: boolean = false): void => {
  const target = e.target as HTMLImageElement;

  if (target) target.src = closedCamer;

  if (isMainImage) state.isErrorFile = true;
};

const handleLoadImage = (): void => {
  setZoomElement();
};

/**
 * Обрабатывает клик по кнопке следующего элемента
 *
 * Переключает на следующий элемент
 */
const handleClickOnNextSlideButton = (): void => {
  if (!sliderRef.value) return;

  setItem(sliderRef.value.nextSlide());
};

/**
 * Обрабатывает клик по кнопке предыдущего элемента
 *
 * Переключает на предыдущий элемент
 */
const handleClickOnPrevSlideButton = (): void => {
  if (!sliderRef.value) return;

  setItem(sliderRef.value.prevSlide());
};

/**
 * Обрабатывает нажатие кнопки мышки на элементе выхода
 *
 * Ставит флаг что кликнули на выход
 */
const handleMouseDownOnExitItem = (e: MouseEvent): void => {
  if (state.isMobile) return;

  const target = e.target as HTMLElement;
  if (
    target === mainRef.value ||
    target === itemRef.value ||
    (target === viewportRef.value && imagePreviewRef.value)
  )
    state.isClickOnExit = true;
};

/**
 * Обрабатывает поднятие кнопки мышки на элементе выхода
 *
 * Отправлят родителю событие о закрытие модального окна
 */
const handleMouseUpOnExitItem = (e: MouseEvent): void => {
  const target = e.target as HTMLElement;

  if (
    target === mainRef.value ||
    target === itemRef.value ||
    target === viewportRef.value
  )
    unmountClose();

  state.isClickOnExit = false;
};

/**
 * Обрабатывает нажатие кнопки мышки на элементе viewport
 *
 * Запускает перетаскивание
 * @param e
 */
const handleMouseDownOnViewport = (e: MouseEvent): void => {
  handleMouseDownOnExitItem(e);
  state.isDragging = true;
  state.startX = e.clientX - state.offsetX;
  state.startY = e.clientY - state.offsetY;
};

/**
 * Обрабатывает движение кнопки мышки на элементе viewport
 *
 * Изменяет положение элемента
 * @param e
 */
const handleMouseMoveOnViewport = (): void => {
  if (!state.isDragging) return;

  // state.offsetX = e.clientX - state.startX;
  // state.offsetY = e.clientY - state.startY;

  // limitPosition();

  requestAnimationFrame(() => {
    if (!viewportRef.value) return;

    changeStyleProperties(contentStyle.value, viewportRef.value);
  });
};

/**
 * Обрабатывает поднятие кнопки мышки на элементе viewport
 *
 * Останавливает перетаскивание
 */
const handleMouseUpOnViewport = (e: MouseEvent): void => {
  handleMouseUpOnExitItem(e);
  state.isDragging = false;
};

const handlePointerStart = (e: PointerEvent): void => {
  if (!state.isMobile) return;

  state.startXForMobile = e.clientX;
  state.startYForMobile = e.clientY;

  state.isPointerActive = true;
};

const handleTouchStart = (e: TouchEvent): void => {
  if (!state.isMobile) return;

  state.startXForMobile = e.touches[0].clientX;
  state.startYForMobile = e.touches[0].clientY;

  state.isPointerActive = true;
};

const handlePinterLeave = (): void => {
  if (!state.isMobile) return;
  resetMobileState();
  resetOpacity();
};

const handlePointerEnd = (e: PointerEvent): void => {
  if (!state.isMobile) return;

  const endX = e.clientX;
  const endY = e.clientY;

  const deltaX = Math.abs(endX - state.startXForMobile);
  const deltaY = endY - state.startYForMobile;

  if (state.isExistSwipe && deltaY > SWIPE_EXIT_THRESHOLD && deltaY > deltaX) {
    // emit('close');
  }

  if (state.isChangeItemSwipe && sliderRef.value) {
    if ((state.isMobile && state.zoomValue === 1) || !state.isMobile) {
      if (state.isSwipeNextSlide) setItem(sliderRef.value?.nextSlide());
      if (state.isSwipePrevSlide) setItem(sliderRef.value?.prevSlide());
    }
  }

  resetMobileState();
  nextTick(() => {
    resetOpacity();
  });
};

const handleTouchEnd = (e: TouchEvent): void => {
  if (!state.isMobile) return;

  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;

  const deltax = Math.abs(endX - state.startXForMobile);
  const deltay = endY - state.startYForMobile;

  if (state.isExistSwipe && deltay > SWIPE_EXIT_THRESHOLD && deltay > deltax) {
    emit('close');
  }

  if (state.isChangeItemSwipe && sliderRef.value) {
    if (state.isSwipeNextSlide) setItem(sliderRef.value?.nextSlide());

    if (state.isSwipePrevSlide) setItem(sliderRef.value?.prevSlide());
  }

  resetMobileState();
  nextTick(() => {
    resetOpacity();
  });
};

const handlePointerMove = (e: PointerEvent): void => {
  if (!state.isMobile || !state.isPointerActive) return;

  const deltaY = e.clientY - state.startYForMobile;
  const deltaX = e.clientX - state.startXForMobile;
  mobileMoveEvent(deltaX, deltaY);
};

const handleTouchMove = (e: TouchEvent): void => {
  if (!state.isMobile) return;

  const currentX = e.touches[0].clientX;
  const currentY = e.touches[0].clientY;
  const deltaX = currentX - state.startXForMobile;
  const deltaY = currentY - state.startYForMobile;

  mobileMoveEvent(deltaX, deltaY);
};

const handleScrollItem = (e: Event): void => {
  const target = e.target as HTMLElement;
  if (!state.isMobile || !target) return;

  if (target.scrollHeight <= target.clientHeight) return;

  // Начало жеста
  if (!state.isExitScrollActive && target.scrollTop === 0) {
    e.preventDefault();
  }
};

/**
 * Возвращает scale для изображения
 */
const getScaleImage = (): number => {
  if (!itemRef.value || !imagePreviewRef.value) return 1;

  const widthViewport = itemRef.value.offsetWidth;
  const heightViewport = itemRef.value.offsetHeight;
  const widthImage = imagePreviewRef.value.offsetWidth;
  const heightImage = imagePreviewRef.value.offsetHeight;

  let scale = 1;
  const absRotate = Math.abs(state.rotateValue);

  const evenRotate = absRotate % 180 === 0;
  // Если не четный поворот, то считаем масштаб по высоте изображения и длине вьюпорта
  if (!evenRotate) {
    if (heightImage > widthViewport) {
      scale = widthViewport / heightImage;
    } else if (widthImage > heightViewport) {
      scale = heightViewport / widthImage;
    }
  }

  return scale;
};

const mobileMoveEvent = (deltaX: number, deltaY: number): void => {
  const absDeltaX = Math.abs(deltaX);

  // Если свайпнули вниз и прошли минимальный порог начала анимация закрытия
  // устанавливаем флаг на событие закрытия свайпом
  if (
    absDeltaX < deltaY &&
    deltaY > SWIPE_DELAY_EXIT_THRESHOLD &&
    !state.isChangeItemSwipe &&
    itemRef.value &&
    itemRef.value.scrollTop === 0
  ) {
    state.isExistSwipe = true;
  }

  if (
    absDeltaX > deltaY &&
    absDeltaX > SWIPE_DELAY_CHANGE_ITEM_THRESHOLD &&
    !state.isExistSwipe
  ) {
    state.isChangeItemSwipe = true;
  }

  // if (state.isExistSwipe) {
  //   const opacity = Math.max(
  //     0,
  //     1 - (deltaY - SWIPE_DELAY_EXIT_THRESHOLD) / SWIPE_EXIT_THRESHOLD
  //   );
  //   requestAnimationFrame(() => {
  //     if (!mainRef.value) return;

  //     changeStyleProperties(
  //       {
  //         opacity: opacity
  //       },
  //       mainRef.value
  //     );
  //   });
  // }

  if (state.isChangeItemSwipe) {
    if (absDeltaX > SWIPE_CHANGE_ITEM_THRESHOLD) {
      const isOverflowArr = state.defaultIndex === props.items.length - 1;
      const isStartIndex = state.defaultIndex === 0;

      if (deltaX > 0) {
        if (isStartIndex) return;

        state.isSwipePrevSlide = true;
      }

      if (deltaX < 0) {
        if (isOverflowArr) return;

        state.isSwipeNextSlide = true;
      }
    }
  }
};

/**
 * Сбрасывает поворот и возвращает в начальное положение
 */
const resetRotate = (): void => {
  const isChanged = state.rotateValue !== 0;

  if (!imagePreviewRef.value) return;

  state.rotateValue = 0;

  if (isChanged)
    changeStyleProperties(
      {
        transform: 'none'
      },
      imagePreviewRef.value
    );
};

const resetOpacity = (): void => {
  requestAnimationFrame(() => {
    if (!mainRef.value) return;

    changeStyleProperties(
      {
        opacity: 1
      },
      mainRef.value
    );
  });
};

const resetMobileState = (): void => {
  // Сброс состояний
  state.isPointerActive = false;
  state.isExistSwipe = false;
  state.isSwipeNextSlide = false;
  state.isSwipePrevSlide = false;
  state.isChangeItemSwipe = false;
};

/**
 * Увеличивает или уменьшает масштаб
 *
 * Если isIncrease - увеличивает, иначе уменьшает
 * @param isIncrease
 */
const zoom = (isIncrease: boolean): void => {
  const prevZoom = state.zoomValue;

  // Изменяем масштаб
  state.zoomValue += isIncrease ? 1 : -1;

  // Ограничиваем масштаб
  state.zoomValue = Math.min(Math.max(1, state.zoomValue), 3);

  const nextZoom = state.zoomValue;
  if (prevZoom === nextZoom) return;

  if (!viewportRef.value) return;

  // Увеличиваем масштаб для изображений
  if (pdfRef.value) {
    changeStyleProperties(contentStyle.value, viewportRef.value);
  }

  if (imagePreviewRef.value) {
    panzoomInstance?.zoom(state.zoomValue, {
      force: true
    });

    if (state.zoomValue === 1) {
      panzoomInstance?.setOptions({
        cursor: 'default'
      });
      nextTick(() => {
        centerPositionPanzoom();
      });
    } else {
      panzoomInstance?.setOptions({
        cursor: 'move'
      });
    }
  }
};

/**
 * Устанавливает основной элемент
 * @param idx
 */
const setItem = (idx: number): void => {
  if (!props.items[idx]) return;
  // Ставим индекс отображаемого элемента
  state.defaultIndex = idx;
  // Очищаем pdf если он был показан
  clearPdf();
  // Устанавливаем данные нового элемента
  state.file = props.items[idx];
};

/**
 * Обновляет индекс бокового меню по прокрутке мышки
 * @param deltaY
 */
const updateIndexByWheel = (deltaY: number) => {
  let newIndex = state.sideBarIndex;
  // В зависимости в какую сторону прокручена мышка, ставим новый индекс
  if (deltaY > 0) {
    newIndex = state.sideBarIndex + 1;
    newIndex = Math.min(state.sideBarLength - 1, newIndex);
  } else {
    newIndex = state.sideBarIndex - 1;
    newIndex = Math.max(0, newIndex);
  }
  state.sideBarIndex = newIndex;
};

/**
 * Инициализация файла
 */
const initFile = (): void => {
  nextTick(() => {
    if (!state.file) return;
    // const extension = checkPath(state.file.path);

    // Если это pdf, то инициализурем pdf
    if (isPdfFile(state.file?.path) || isPdfFile(state.file?.file)) {
      // Устанавливаем ошибку, чтобы блокировать кнопки печати и скачивания, пока не прогрузится pdf
      state.isErrorFile = true;
      initPdf();
    }
  });
};

const initScroll = (): void => {
  nextTick(() => {
    if (!miniItemsRef.value || !sideBarRef.value) return;

    const el = miniItemsRef.value[state.sideBarIndex];
    scrollToElementIfNotVisible(el, sideBarRef.value);
  });
};

/**
 * Инициализируем pdf
 */
const initPdf = async (): Promise<void> => {
  try {
    if (!state.file) return;
    // Получаем из кэша pdf
    const cachedPdf = cachePdf.getCache(state.file.path);
    let pdf;
    // Если pdf есть в кэше, то берем его
    if (cachedPdf) {
      pdf = cachedPdf;
    } else {
      // Подгружаем pdf
      pdf = await getDocument(state.file?.path).promise;
    }

    // Если pdf не существует, то выходим
    if (!pdf) {
      state.isErrorFile = true;
      return;
    }

    // Устанавливаем кол-во страниц pdf
    state.sideBarLength = pdf.numPages;
    // создаем массив страниц
    state.sideBarItems = new Array(pdf.numPages).fill(state.file?.path ?? '');

    // устанавливаем в кэш pdf
    cachePdf.setCache(state.file.path, pdf);

    // Устанавливаем первую страницу
    setPdfPage(0);
    // Снимаем ошибку
    state.isErrorFile = false;
  } catch (error) {
    console.error(error);
    state.isErrorFile = true;
  }
};

/**
 * Устанавливаем страницу для  pdf
 * @param index
 */
const setPdfPage = async (index: number = 0): Promise<void> => {
  state.sideBarIndex = index;
};

/**
 * Очищает данные от данных pdf
 */
const clearPdf = (): void => {
  state.sideBarItems = [];
  state.sideBarIndex = 0;
  state.sideBarLength = 0;
};

/**
 * Обновляет состоняние параметра isMobile
 */
const updateMediaParams = (): void => {
  state.isMobile = mediaQuery.matches;
};

onMounted(() => {
  updateMediaParams();
  mediaQuery.addEventListener('change', updateMediaParams);
});

onUnmounted(() => {
  clearPdf();

  mediaQuery.removeEventListener('change', updateMediaParams);
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
  height: 100svh;
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
  height: 100svh;

  padding: 60px 30px 0 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
}

.slider-modal__item {
  display: flex;

  overflow: hidden;

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
  max-height: 100%;
}

.slider-modal__video,
.slider-modal__pdf {
  height: 100%;
}

.slider-modal__image {
  max-height: 100%;
  height: auto;
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
  gap: 30px;
}

.slider-modal__sub-nav {
  display: flex;
  justify-content: center;
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
  max-width: 100%;
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

.slider-modal__viewport {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-modal__viewport:has(.slider-modal__image) {
  display: block;
}

.slider-modal__pdf_mobile {
  display: none;
  height: calc(100svh - 180px);
}

.slider-modal__counter {
  display: flex;
  justify-content: center;

  text-align: center;
  font-size: 16px;
}

.slider-modal__mobile-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: var(--white);
}

.slider-modal__exit-button {
  padding: 12px 13px;

  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: 10px;

  font-size: 14px;

  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none; /* запрет лупы/меню */
}

.slider-modal__exit-icon,
.slider-modal__exit-text {
  flex-shrink: 0;
}

.slider-modal__mobile-header-block {
  flex: 1 1 0;
}

/* Мобильная версия + планшет */
@media (max-width: 768px) {
  .slider-modal__side-bar,
  .slider-modal__side-button_printer,
  .slider-modal__side-button_zoom {
    display: none;
  }

  .slider-modal__content {
    flex-direction: column;
    padding: 5px 0 0;
    gap: 28px;
  }

  .slider-modal__main {
    position: relative;
    padding: 0;

    height: calc(100svh - 60px - 15px);

    justify-content: space-between;
  }

  .slider-modal__viewport {
    height: 100%;
  }

  .slider-modal__main:has(.slider-modal__bottom)
    .slider-modal__item:is(
      :has(.slider-modal__image),
      :has(.slider-modal__video)
    ) {
    height: calc(100% - 100px);
    justify-content: center;
  }

  .slider-modal__main:has(.slider-modal__bottom)
    .slider-modal__item:is(
      :has(.slider-modal__image),
      :has(.slider-modal__video)
    ),
  .slider-modal__item .slider-modal__pdf {
    padding: 0 10px;
  }

  .slider-modal__item:has(.slider-modal__pdf) {
    overflow-y: auto;
    touch-action: pan-y;

    overscroll-behavior: none;

    scrollbar-width: none;
  }

  .slider-modal__item:has(.slider-modal__video) {
    touch-action: none;
  }

  .slider-modal__item:is(:has(.slider-modal__pdf), :has(.slider-modal__video)) {
    -webkit-overflow-scrolling: touch;
    pointer-events: auto;
  }

  .slider-modal__video {
    pointer-events: auto;
  }

  .slider-modal__item:has(.slider-modal__pdf)::-webkit-scrollbar {
    display: none;
  }

  .slider-modal__main:has(.slider-modal__bottom)
    .slider-modal__item:is(:has(.slider-modal__pdf)) {
    height: 100%;
    padding-bottom: 105px;
  }

  .slider-modal__pdf_mobile {
    display: block;
  }

  .slider-modal__bottom {
    position: absolute;
    bottom: 0;
    z-index: 1;

    padding: 0 10px;
    height: 90px;
    width: 100%;

    background-color: var(--background-color-80);
  }

  .slider-modal__bottom-slider {
    width: 100%;
  }

  .slider-modal__nav-block:first-child {
    display: none;
  }

  .slider-modal__nav-block:nth-child(2) {
    width: 100%;
    justify-content: center;
    overflow-x: auto;
  }

  .slider-modal__nav-block:nth-child(2) .slider-modal__side-button {
    display: none;
  }

  .slider-modal__nav-block:nth-child(3) {
    flex: 0 0 auto;
    gap: 10px;
  }

  .slider-modal__slide-image {
    max-width: none;
  }

  .slider-modal__image {
    /* height: auto; */
  }

  .slider-modal__slide {
    width: 20px;
    height: 40px;

    transition: all 0.2s ease;
  }

  .slider-modal__item {
    flex-direction: column;
    justify-content: initial;
    gap: 10px;
  }

  .slider-modal__slide_active {
    width: 40px;
  }
}
</style>
