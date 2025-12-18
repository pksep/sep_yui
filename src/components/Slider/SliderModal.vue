<template>
  <ModalAnimated
    position="center"
    class="slider-modal"
    :open
    :height
    :width
    :animate-type="ModalAnimateEnum.fade"
    @close="$emit('close')"
    @end-animation="$emit('end-animation')"
    @unmounted="$emit('unmounted')"
  >
    <div class="slider-modal__content">
      <!-- pdf -->
      <template v-if="true">
        <div ref="sideBarRef" class="slider-modal__side-bar">
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
                class="slider-modal__mini-preview"
                :src="file"
                :page="idx + 1"
                :cache-key-pdf-document="state.file?.path"
              />
            </div>

            <div class="slider-modal__side-bar-count">{{ idx + 1 }}</div>
          </div>
        </div>

        <div
          class="slider-modal__item"
          @click.self="$emit('close')"
          @wheel="handleWheelOnItem"
        >
          <PdfPreview
            class="slider-modal__pdf"
            :src="state.file?.path"
            :page="state.sideBarIndex + 1"
            :cache-key-pdf-document="state.file?.path"
          />
        </div>
      </template>
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
import { nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue';
import checkPath from '@/helpers/file/check-path';
import { getDocument } from 'pdfjs-dist';
import cachePdf from '@/helpers/file/cache-pdf';
import { throttle } from 'lodash';

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
}>({
  defaultIndex: props.defaultIndex ?? 0,
  file: props.items[props.defaultIndex ?? 0],
  sideBarItems: [],
  sideBarIndex: 0,
  sideBarLength: 0
});

const miniItemsRef = ref<HTMLElement[] | null>(null);
const sideBarRef = ref<HTMLElement | null>(null);

watch([() => props.items, () => props.defaultIndex], () => {
  state.file = props.items[props.defaultIndex ?? 0];
  state.defaultIndex = props.defaultIndex ?? 0;
});

watch([() => state.file, () => props.open], () => {
  if (!props.open) return;
  initFile();
});

watch(
  () => state.sideBarIndex,
  () => {
    nextTick(() => {
      if (!miniItemsRef.value || !sideBarRef.value) return;

      const el = miniItemsRef.value[state.sideBarIndex];
      scrollToElementIfNotVisible(el, sideBarRef.value);
    });
  }
);

const handleClickOnMiniPreview = (idx: number): void => {
  state.sideBarIndex = idx;
};

const handleWheelOnItem = (event: WheelEvent): void => {
  updateIndexByWheel(event.deltaY);
};

const updateIndexByWheel = throttle((deltaY: number) => {
  let newIndex = state.sideBarIndex;
  if (deltaY > 0) {
    newIndex = state.sideBarIndex + 1;
    newIndex = Math.min(state.sideBarLength - 1, newIndex);
  } else {
    newIndex = state.sideBarIndex - 1;
    newIndex = Math.max(0, newIndex);
  }
  state.sideBarIndex = newIndex;
}, 500);

const initFile = (): void => {
  if (!state.file) return;

  const extension = checkPath(state.file.path);

  if (extension === 'pdf') {
    initPdf();
  }
};

const isElementVisible = (
  el: HTMLElement,
  container: HTMLElement | Window = window
): boolean => {
  const rect = el.getBoundingClientRect();

  if (container instanceof Window) {
    return rect.top < window.innerHeight && rect.bottom > 0;
  } else {
    const containerRect = container.getBoundingClientRect();
    return rect.top < containerRect.bottom && rect.bottom > containerRect.top;
  }
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

const initPdf = async (): Promise<void> => {
  try {
    if (state.file === null) return;
    const pdf = await getDocument(state.file?.path).promise;
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

onBeforeUnmount(() => {
  updateIndexByWheel.cancel();
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
  width: 300px;
  height: 100vh;
  overflow: auto;

  padding: 60px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  background-color: var(--background-color-80);
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

.slider-modal__item {
  display: flex;
  justify-content: center;

  padding: 60px;
  height: 100vh;
  width: 100%;
}

.slider-modal__pdf {
  /* width: 100%; */
  height: 100%;
}
</style>
