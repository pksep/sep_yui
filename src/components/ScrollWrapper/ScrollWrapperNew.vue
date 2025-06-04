<template>
  <div ref="scrollWrapperRef" class="scroll-wrapper">
    <div class="scroll-wrapper__vertical-wrapper">
      <div class="scroll-wrapper__horizont-wrapper">
        <div ref="slotRef" class="scroll-wrapper__slot">
          <slot />
        </div>

        <div
          v-if="isExistHorizontalTrack || isShowHorizontalScroll"
          ref="horizontTrackRef"
          class="scroll-wrapper__track scroll-wrapper__track_horizont"
          :class="horizontalTrackClass"
          @click.prevent.left="onHorizontalTrackClick"
        >
          <div
            ref="horizontBarRef"
            class="scroll-wrapper__bar"
            @mousedown.prevent.left="startHorizontalDrag"
          ></div>
        </div>
      </div>

      <div
        v-if="isExistVerticalTrack || isShowVerticalScroll"
        ref="verticalTrackRef"
        class="scroll-wrapper__track scroll-wrapper__track_vertical"
        :class="verticalTrackClass"
        @click.prevent.left="onTrackClick"
      >
        <div
          ref="verticalBarRef"
          class="scroll-wrapper__bar"
          @mousedown.prevent.left="startDrag"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useHorizontalTrack from '@/components/ScrollWrapper/extension/use-horizont-track';
import useVerticlTrack from '@/components/ScrollWrapper/extension/use-vertical-track';
import {
  IScrollWrapperEmit,
  IScrollWrapperProps
} from '@/components/ScrollWrapper/interface/interface';
import changeStyleProperties from '@/helpers/change-style-properties';
import { onMounted, onUnmounted, ref } from 'vue';

defineOptions({
  name: 'ScrollWrapper'
});

withDefaults(defineProps<IScrollWrapperProps>(), {
  isShowVerticalScroll: false,
  isShowHorizontalScroll: false
});

const emit = defineEmits<IScrollWrapperEmit>();

const slotRef = ref<HTMLElement | null>(null);
const scrollWrapperRef = ref<HTMLElement | null>(null);

const verticalTrackRef = ref<HTMLElement | null>(null);
const verticalBarRef = ref<HTMLElement | null>(null);

const horizontTrackRef = ref<HTMLElement | null>(null);
const horizontBarRef = ref<HTMLElement | null>(null);

const {
  onTrackClick,
  startDrag,
  changeBarPosition,
  setVerticalBarHeight,
  verticalTrackClass,
  isExistVerticalTrack
} = useVerticlTrack(
  slotRef,
  scrollWrapperRef,
  verticalBarRef,
  verticalTrackRef
);

const {
  changeBarPosition: changerHorizontalBarPosition,
  startDrag: startHorizontalDrag,
  onTrackClick: onHorizontalTrackClick,
  setHorizontalBarWidth,
  horizontalTrackClass,
  isExistHorizontalTrack
} = useHorizontalTrack(
  slotRef,
  scrollWrapperRef,
  horizontBarRef,
  horizontTrackRef
);

const handleScroll = (e: Event): void => {
  changeBarPosition();
  changerHorizontalBarPosition();

  emit('unmount-scroll', e);
};

const setScrollStyle = (): void => {
  requestAnimationFrame(() => {
    setHeightSlot();
    setBarStyle();
  });
};

const setHeightSlot = (): void => {
  if (!slotRef.value || !scrollWrapperRef.value) return;

  const style = getComputedStyle(scrollWrapperRef.value);
  const minHeight = scrollWrapperRef.value.style.minHeight || style.minHeight;
  const maxHeight = scrollWrapperRef.value.style.maxHeight || style.maxHeight;
  const height = scrollWrapperRef.value.style.height;

  changeStyleProperties(
    {
      '--scroll-wrapper-height': `${height}`,
      '--scroll-wrapper-max-height': `${maxHeight}`,
      '--scroll-wrapper-min-height': `${minHeight}`
    },
    scrollWrapperRef.value
  );
};

const setBarStyle = (): void => {
  setVerticalBarHeight();
  setHorizontalBarWidth();
  changeBarPosition();
  changerHorizontalBarPosition();
};

const setHandlers = (): void => {
  if (slotRef.value) {
    slotRef.value.addEventListener('scroll', handleScroll);
  }
};

const scrollToTop = () => {
  if (slotRef.value) {
    slotRef.value.scrollTop = 0;
  }
};

const mutatuionObserver = new MutationObserver(() => {
  setScrollStyle();
});

const resizeOvserver = new ResizeObserver(() => {
  setScrollStyle();
});

const setResizeElement = (value: HTMLElement) => {
  mutatuionObserver.observe(value, {
    childList: true,
    subtree: true,
    attributes: true
  });

  resizeOvserver.observe(value);
};

defineExpose({
  scrollToTop,
  setHeightSlot
});

onMounted(() => {
  setScrollStyle();
  setHandlers();
  if (scrollWrapperRef.value) {
    setResizeElement(scrollWrapperRef.value);
  }

  if (verticalTrackRef.value) {
    setResizeElement(verticalTrackRef.value);
  }

  window.addEventListener('resize', setScrollStyle);

  emit('on-mounted');
});

onUnmounted(() => {
  window.removeEventListener('resize', setScrollStyle);
});
</script>

<style scoped lang="scss">
.scroll-wrapper {
  --scroll-wrapper-vertical-gap: 3px;
  --scroll-wrapper-horizontal-gap: 3px;
  --scroll-wrapper-horizontal-track-height: 10px;
  --scroll-wrapper-vertical-track-width: 6px;
  &__horizont-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--scroll-wrapper-horizontal-gap);
  }

  &__vertical-wrapper {
    display: flex;
    gap: var(--scroll-wrapper-vertical-gap);
    height: 100%;
  }

  &__slot {
    width: 100%;
    height: var(--scroll-wrapper-height, 100%);
    max-height: var(--scroll-wrapper-max-height, 100%);
    min-height: var(--scroll-wrapper-min-height, 0);

    overflow: auto;
    scrollbar-width: none;

    border: 0.5px solid var(--scroll-slot-border, var(--border-grey));
    border-radius: var(--scroll-border-radius, 15px);
    background-color: var(--scroll-slot-background-color, transparent);
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &:has(.scroll-wrapper__track_horizont) {
    & .scroll-wrapper__slot {
      height: calc(
        var(--scroll-wrapper-height, 100%) - var(
            --scroll-wrapper-horizontal-track-height,
            0px
          ) - var(--scroll-wrapper-horizontal-gap, 0px)
      );
    }

    & .scroll-wrapper__track_vertical {
      height: calc(
        var(--scroll-wrapper-height) - var(--scroll-track-margin-top) - var(
            --scroll-wrapper-horizontal-track-height,
            0px
          ) - var(--scroll-wrapper-horizontal-gap, 0px)
      );
    }
  }

  &__track {
    position: relative;
    flex-shrink: 0;

    opacity: 0;
    background-color: var(--scrollbar-bg-color);
    border-radius: var(--scroll-border-radius);

    transition: all 0.2s ease;

    &_drag {
      opacity: 1;
    }

    &_hide {
      opacity: 0;
    }

    &_vertical {
      width: var(--scroll-wrapper-vertical-track-width);
      height: calc(
        var(--scroll-wrapper-height) - var(--scroll-track-margin-top)
      );

      margin: var(--scroll-track-margin-top) 0 0 0;
      & .scroll-wrapper__bar {
        top: var(--scroll-bar-top-postion);

        width: 100%;
        height: var(--scroll-vertical-bar-height, 100%);
      }
    }

    &_horizont {
      height: var(--scroll-wrapper-horizontal-track-height);
      width: 100%;

      & .scroll-wrapper__bar {
        top: 0;
        left: var(--scroll-bar-left-position, 0);

        width: var(--scroll-horizontal-bar-width, 100%);
        height: 100%;
      }
    }
  }

  &:has(.scroll-wrapper__track_vertical) .scroll-wrapper__track_horizont {
    width: calc(
      100% - var(--scroll-wrapper-vertical-track-width, 0px) - var(
          --scroll-wrapper-vertical-gap,
          0px
        )
    );
  }

  &:hover {
    & .scroll-wrapper__track {
      opacity: 1;

      &_hide {
        opacity: 0;
      }
    }
  }

  &__bar {
    position: absolute;
    height: var(--scroll-bar-height, 100%);

    background-color: var(--scrollbar-thumb-color-base);
    border-radius: var(--scroll-bar-border-radius, 15px);

    transition: top 0.1s ease;
  }
}
</style>
