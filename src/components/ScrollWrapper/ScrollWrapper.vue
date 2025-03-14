<template>
  <div
    ref="scrollWrapper"
    class="scroll-wrapper"
    :data-testId="`ScrollWrapper`"
  >
    <div
      ref="scrollSlot"
      class="scroll-wrapper__slot"
      :data-testId="`ScrollWrapper-Slot`"
    >
      <slot></slot>
    </div>

    <div
      v-if="isVerticalScroll || isShowVerticalScroll"
      class="scroll-wrapper__track"
      :class="trackClass"
      :data-testId="`ScrollWrapper-Track`"
      @click.prevent="onTrackClick"
    >
      <div
        ref="scrollBar"
        class="scroll-wrapper__bar"
        :data-testId="`ScrollWrapper-Track-Bar`"
        @mousedown.prevent="startDrag"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  IScrollWrapperProps,
  TScrollWrapperStyle
} from '@/components/ScrollWrapper/interface/interface';
import changeStyleProperties from '@/helpers/change-style-properties';
import { computed, inject, onMounted, Ref, ref, watchEffect } from 'vue';

defineOptions({
  name: 'ScrollWrapper'
});

withDefaults(defineProps<IScrollWrapperProps>(), {
  isShowVerticalScroll: false
});

const emit = defineEmits<{
  (e: 'unmountScroll', event: Event): void;
  (e: 'onMounted'): void;
}>();

const scrollWrapper = ref<HTMLElement | null>(null);
const scrollSlot = ref<HTMLElement | null>(null);
const scrollBar = ref<HTMLElement | null>(null);
const scrolledElement = inject<Ref<HTMLElement | null> | null>(
  'scrolledElement'
);
const scrollHeightProcent = ref<number>(100);
const isDragging = ref<boolean>(false);
const isVerticalScroll = computed(() => scrollHeightProcent.value !== 100);
let startY = 0;
let startScrollTop = 0;

const trackClass = computed(() => [
  {
    'scroll-wrapper__track_hide': scrollHeightProcent.value === 100,
    'scroll-wrapper__track_drag': isDragging.value
  }
]);

watchEffect(() => {
  if (scrolledElement && scrolledElement.value) {
    setScrollStyle();
  }
});

watchEffect(() => {
  if (scrollHeightProcent.value === 100 && scrollWrapper.value) {
    changeStyle(
      {
        '--scroll-bar-top-postion': '0%'
      },
      scrollWrapper.value
    );
  }
});

//Обертка для удобства с типизацией
const changeStyle = (
  ...args: Parameters<typeof changeStyleProperties<TScrollWrapperStyle>>
) => {
  changeStyleProperties<TScrollWrapperStyle>(...args);
};

const setScrollStyle = (): void => {
  if (scrollWrapper.value) {
    const heightBar = getProcentView();
    scrollHeightProcent.value = heightBar;

    requestAnimationFrame(() => {
      if (scrollWrapper.value) {
        changeStyle(
          {
            '--scroll-bar-height': `${heightBar}%`
          },
          scrollWrapper.value
        );
      }
    });
  }
};

const getProcentView = (): number => {
  if (scrolledElement && scrolledElement.value) {
    const clientHeight: number = scrolledElement.value.clientHeight;
    const scrollHeight: number = scrolledElement.value.scrollHeight;

    if (clientHeight >= scrollHeight) return 100;

    if (clientHeight < scrollHeight) {
      return (clientHeight / scrollHeight) * 100;
    }
  }
  return 100;
};

const handleScroll = (e: Event): void => {
  changeBarPosition();
  emit('unmountScroll', e);
};

const changeBarPosition = (): void => {
  if (scrolledElement && scrolledElement.value && scrollBar.value) {
    const { scrollTop, scrollHeight, clientHeight } = scrolledElement.value;

    // Доступная область прокрутки
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll <= 0) return;

    // Процент прокрутки
    const scrollPercent = scrollTop / maxScroll;

    // Доступное пространство для бара
    const trackHeight = scrolledElement.value.clientHeight;
    const barHeight = scrollBar.value.clientHeight;
    const maxBarPosition = trackHeight - barHeight;

    // Рассчитываем позицию бара
    const barTop = scrollPercent * maxBarPosition;

    requestAnimationFrame(() => {
      if (scrollWrapper.value) {
        changeStyle(
          { '--scroll-bar-top-postion': `${barTop}px` },
          scrollWrapper.value
        );
      }
    });
  }
};

// Начало перетаскивания
const startDrag = (event: MouseEvent) => {
  if (scrolledElement && scrolledElement.value) {
    isDragging.value = true;
    startY = event.clientY;
    startScrollTop = scrolledElement.value.scrollTop;

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);
  }
};

// Обработка движения мыши
const onDrag = (event: MouseEvent) => {
  if (
    isDragging.value &&
    scrolledElement &&
    scrolledElement.value &&
    scrollBar.value
  ) {
    const deltaY = event.clientY - startY;
    const scrollRatio =
      (scrolledElement.value.scrollHeight -
        scrolledElement.value.clientHeight) /
      (scrolledElement.value.clientHeight - scrollBar.value.clientHeight);

    scrolledElement.value.scrollTop = startScrollTop + deltaY * scrollRatio;
    changeBarPosition();
  }
};

// Остановка перетаскивания
const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
};

const onTrackClick = (event: MouseEvent) => {
  if (scrolledElement && scrolledElement.value && scrollBar.value) {
    const trackRect = (
      event.currentTarget as HTMLElement
    ).getBoundingClientRect();
    const clickPosition = event.clientY - trackRect.top;

    const barHeight = scrollBar.value.clientHeight;
    const trackHeight = trackRect.height;

    let newScrollTop =
      (clickPosition - barHeight / 2) *
      ((scrolledElement.value.scrollHeight -
        scrolledElement.value.clientHeight) /
        (trackHeight - barHeight));

    newScrollTop = Math.max(
      0,
      Math.min(
        newScrollTop,
        scrolledElement.value.scrollHeight - scrolledElement.value.clientHeight
      )
    );

    scrolledElement.value.scrollTop = newScrollTop;
    changeBarPosition();
  }
};

const reseizeObserver = new MutationObserver(() => {
  requestAnimationFrame(() => {
    setScrollStyle();
  });
});

const setResizeElement = (value: HTMLElement) => {
  reseizeObserver.observe(value, {
    childList: true,
    subtree: true
  });
};

defineExpose({
  isVerticalScroll,
  handleScroll,
  setResizeElement,
  setScrollStyle
});

onMounted(() => {
  emit('onMounted');
});
</script>
<style scoped>
:root {
  --scroll-track-margin: 0;
}
.scroll-wrapper {
  --scroll-wrapper-gap: 3px;
  --scroll-border-radius: 15px;
  --scroll-bar-height: 100%;
  --scroll-bar-top-postion: 0%;
  --scroll-bar-top-max-position: max(
    min(var(--scroll-bar-top-postion), calc(100% - var(--scroll-bar-height)))
  );
  --scroll-slot-height: auto;
  --scroll-slot-bottom-right-radius: 0;
  --scroll-slot-bottom-left-radius: 0;
  --scroll-slot-top-right-radius: 0;
  --scroll-slot-top-left-radius: 0;
  --scroll-slot-border: initial;
  --scroll-slot-border-top: revert;
  --scroll-slot-border-left: revert;
  --scroll-slot-border-right: revert;
  --scroll-slot-border-bottom: revert;

  position: relative;
  display: flex;
  gap: var(--scroll-wrapper-gap, 3px);
}

.scroll-wrapper__slot {
  scrollbar-width: none;
  overflow: auto;
  width: 100%;
  height: var(--scroll-slot-height);

  border-bottom-right-radius: var(--scroll-slot-bottom-right-radius);
  border-bottom-left-radius: var(--scroll-slot-bottom-left-radius);
  border-top-right-radius: var(--scroll-slot-top-right-radius);
  border-top-left-radius: var(--scroll-slot-top-left-radius);

  border: var(--scroll-slot-border);
  border-top: var(--scroll-slot-border-top);
  border-left: var(--scroll-slot-border-left);
  border-bottom: var(--scroll-slot-border-bottom);
  border-right: var(--scroll-slot-border-right);
}

.scroll-wrapper__slot::-webkit-scrollbar {
  display: none;
}

.scroll-wrapper__track {
  position: sticky;
  top: 0;
  width: 6px;
  margin: var(--scroll-track-margin);
  /* height: 100%; */

  opacity: 0;
  background-color: var(--scrollbar-bg-color);
  border-radius: var(--scroll-border-radius);

  transition: all 0.2s ease;
}
.scroll-wrapper:hover .scroll-wrapper__track {
  opacity: 1;
}
.scroll-wrapper__track_drag {
  opacity: 1;
}
.scroll-wrapper .scroll-wrapper__track_hide,
.scroll-wrapper:hover .scroll-wrapper__track_hide {
  opacity: 0;
}

.scroll-wrapper__bar {
  position: absolute;
  width: 100%;
  height: var(--scroll-bar-height, 100%);
  top: var(--scroll-bar-top-max-position);

  background-color: var(--scrollbar-thumb-color-base);
  border-radius: var(--scroll-border-radius);

  transition: top 0.1s ease;
}

.scroll-wrapper__bar:hover {
  background-color: var(--scrollbar-thumb-color-hovered);
}
</style>
