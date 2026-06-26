<template>
  <div
    ref="tooltipRef"
    class="tooltip-yui-kit"
    :data-testid="props.dataTestid"
    :aria-label="hint"
    v-on="tooltipEvents"
  >
    <slot></slot>

    <Teleport v-if="props.isCanShow" :to="toTeleport">
      <Transition name="hint-animate" @enter="unmountAnimationEnter">
        <div
          v-if="isHintVisible"
          ref="hintRef"
          class="tooltip-yui-kit__hint"
          :data-testid="props.dataTestid"
          :class="tooltipClass"
        >
          {{ hint }}
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { ITooltipProps } from '@/components/Tooltip/interface/interface';
import changeStyleProperties from '@/helpers/change-style-properties';
import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  useId,
  watch
} from 'vue';

defineOptions({
  name: 'Tooltip'
});

const props = withDefaults(defineProps<ITooltipProps>(), {
  isShow: false,
  isCanShow: true,
  position: 'bottom-center',
  size: 'small',
  type: 'black',
  dataTestid: 'Tooltip',
  hintClass: ''
});

const isSupportAnchor = CSS.supports('top', 'anchor(bottom)');
const id = useId();

const anchorName = computed(() => `--anchor-tooltip-${id}`);

const tooltipRef = ref<HTMLDivElement | null>(null);
const hintRef = ref<HTMLDivElement | null>(null);

const state = reactive<{
  isShow: boolean;
}>({
  isShow: false
});

const isHintVisible = computed(
  () => props.isCanShow && (props.isShow || state.isShow)
);

const tooltipClass = computed(() => [
  {
    'tooltip-yui-kit__hint_show': isHintVisible.value,
    'tooltip-yui-kit__hint_bottom-center': props.position === 'bottom-center',
    'tooltip-yui-kit__hint_bottom-left': props.position === 'bottom-left',
    'tooltip-yui-kit__hint_bottom-right': props.position === 'bottom-right',
    'tooltip-yui-kit__hint_top-center': props.position === 'top-center',
    'tooltip-yui-kit__hint_top-left': props.position === 'top-left',
    'tooltip-yui-kit__hint_top-right': props.position === 'top-right',
    'tooltip-yui-kit__hint_left-top': props.position === 'left-top',
    'tooltip-yui-kit__hint_left-center': props.position === 'left-center',
    'tooltip-yui-kit__hint_left-bottom': props.position === 'left-bottom',
    'tooltip-yui-kit__hint_right-top': props.position === 'right-top',
    'tooltip-yui-kit__hint_right-center': props.position === 'right-center',
    'tooltip-yui-kit__hint_right-bottom': props.position === 'right-bottom',
    'tooltip-yui-kit__hint_small': props.size === 'small',
    'tooltip-yui-kit__hint_medium': props.size === 'medium',
    'tooltip-yui-kit__hint_large': props.size === 'large',
    'tooltip-yui-kit__hint_black': props.type === 'black',
    'tooltip-yui-kit__hint_blue': props.type === 'blue',
    'tooltip-yui-kit__hint_white': props.type === 'white',
    [props.hintClass]: true
  }
]);

const toTeleport = computed(() => {
  const dialog = tooltipRef.value?.closest('dialog');

  if (dialog) return dialog;

  return 'body';
});

const unmountMouseEnter = (): void => {
  showHint();
};

const unmountMouseLeave = (): void => {
  hideHint();
};

const unmountAnimationEnter = (): void => {
  setPosition();
};

const tooltipEvents = computed(() => {
  if (!props.isCanShow) return {};

  return {
    mouseenter: unmountMouseEnter,
    mouseleave: unmountMouseLeave
  };
});

const setPosition = (): void => {
  requestAnimationFrame(() => {
    if (!tooltipRef.value || !hintRef.value || !isHintVisible.value) return;

    const setedStyles: Record<string, string> = {
      '--hint-top': 'anchor(top)',
      '--hint-left': 'anchor(left)',
      '--hint-measured-width': '0',
      '--hint-height': '0',
      '--tooltip-width': '0',
      '--tooltip-height': '0',
      '--hint-visibility': 'visible'
    };
    if (!isSupportAnchor) {
      setedStyles['--hint-top'] = '0';
      setedStyles['--hint-left'] = '0';
    }

    const rect = tooltipRef.value.getBoundingClientRect();
    const rectHint = hintRef.value.getBoundingClientRect();

    // получаем положение основного элемента относительно документа
    let top = rect.top;
    let left = rect.left;

    // если элемент находится в диалоге, то нужно вычесть его положение
    const dialog = tooltipRef.value.closest('dialog');

    if (dialog) {
      const rectDialog = dialog.getBoundingClientRect();

      // выстявляем позиции от window отностиельно диалога
      top = rect.top - rectDialog.top;
      left = rect.left - rectDialog.left;

      const dialogScrollTop = dialog.scrollTop;
      const dialogScrollLeft = dialog.scrollLeft;

      // Добавляем смещение относительно скролл диалога
      top += dialogScrollTop;
      left += dialogScrollLeft;
    }

    // устанавливаем длину и высоту элемента и подскахки для смещения
    const tooltipWidth = rect.width;
    const tooltipHeight = rect.height;
    const hintWidth = rectHint.width;
    const hintHeigth = rectHint.height;

    if (!isSupportAnchor) {
      setedStyles['--hint-top'] = `${top}px`;
      setedStyles['--hint-left'] = `${left}px`;
    }
    setedStyles['--tooltip-width'] = `${tooltipWidth}px`;
    setedStyles['--tooltip-height'] = `${tooltipHeight}px`;
    setedStyles['--hint-measured-width'] = `${hintWidth}px`;
    setedStyles['--hint-height'] = `${hintHeigth}px`;

    if (!hintRef.value) return;

    changeStyleProperties(setedStyles, hintRef.value);
  });
};

const setHintGap = (): void => {
  requestAnimationFrame(() => {
    if (!hintRef.value || props.hintGap === undefined || !isHintVisible.value)
      return;

    changeStyleProperties(
      {
        '--tooltip-hint-gap': props.hintGap
      },
      hintRef.value
    );
  });
};

const setPositionAnchor = (): void => {
  if (props.isCanShow && isHintVisible.value && hintRef.value) {
    changeStyleProperties(
      {
        'position-anchor': `${anchorName.value}`
      },
      hintRef.value
    );

    setPosition();
  }
};

const setAnchorName = (): void => {
  if (!props.isCanShow || !tooltipRef.value) return;

  changeStyleProperties(
    {
      'anchor-name': `${anchorName.value}`
    },
    tooltipRef.value
  );
};

watch(
  () => props.hintGap,
  () => {
    if (isHintVisible.value) setHintGap();
  }
);

watch(
  () => props.isCanShow,
  isCanShow => {
    if (!isCanShow) {
      hideHint();
      disconnectActiveTooltip();

      return;
    }

    nextTick(() => {
      setAnchorName();

      if (isHintVisible.value) {
        connectActiveTooltip();
      }
    });
  }
);

const showHint = () => {
  if (!props.isCanShow) return;

  state.isShow = true;
};

const hideHint = () => {
  state.isShow = false;
};

let mutationObserver: MutationObserver | null = null;
let resizeObserver: ResizeObserver | null = null;
let isWindowListenersSet = false;

const observedElements = new Set<HTMLElement>();

const getMutationObserver = (): MutationObserver => {
  if (!mutationObserver) {
    mutationObserver = new MutationObserver(() => {
      if (isHintVisible.value) setPosition();
    });
  }

  return mutationObserver;
};

const getResizeObserver = (): ResizeObserver => {
  if (!resizeObserver) {
    resizeObserver = new ResizeObserver(() => {
      if (!isHintVisible.value) return;

      if (!tooltipRef.value?.matches(':hover')) {
        hideHint();

        return;
      }

      setPosition();
    });
  }

  return resizeObserver;
};

const addWindowListeners = (): void => {
  if (isSupportAnchor || isWindowListenersSet) return;

  window.addEventListener('scroll', setPosition, true);
  window.addEventListener('resize', setPosition);
  isWindowListenersSet = true;
};

const removeWindowListeners = (): void => {
  if (!isWindowListenersSet) return;

  window.removeEventListener('scroll', setPosition, true);
  window.removeEventListener('resize', setPosition);
  isWindowListenersSet = false;
};

const disconnectActiveTooltip = (): void => {
  resizeObserver?.disconnect();
  mutationObserver?.disconnect();
  observedElements.clear();
  removeWindowListeners();
};

const connectActiveTooltip = (): void => {
  if (!props.isCanShow || !isHintVisible.value) return;

  nextTick(() => {
    if (!props.isCanShow || !isHintVisible.value) return;

    setAnchorName();
    setPositionAnchor();
    setHintGap();

    if (hintRef.value) {
      setObservers(hintRef.value);
    }

    if (tooltipRef.value) {
      setObservers(tooltipRef.value);
    }

    addWindowListeners();
    setPosition();
  });
};

const setObservers = (element: HTMLElement): void => {
  if (observedElements.has(element)) return;

  getMutationObserver().observe(element, {
    childList: true, // следит за изменением детей
    attributes: true, // следит за изменением атрибутов
    characterData: true // следит за изменением текста внутри
  });
  getResizeObserver().observe(element);
  observedElements.add(element);
};

watch(
  isHintVisible,
  isVisible => {
    if (isVisible) {
      connectActiveTooltip();

      return;
    }

    disconnectActiveTooltip();
  },
  {
    flush: 'post'
  }
);

onMounted(() => {
  if (!props.isCanShow) return;

  setAnchorName();

  if (isHintVisible.value) {
    connectActiveTooltip();
  }
});

onUnmounted(() => {
  disconnectActiveTooltip();
});
</script>

<style scoped lang="scss">
:global(body) {
  anchor-scope: all;
}
.tooltip-yui-kit {
  position: relative;
  display: inline-block;

  width: max-content;

  &__hint {
    --hint-top: 0px;
    --hint-left: 0px;
    --hint-height: 1lh;
    --hint-before-width: 11px;
    --tooltip-hint-gap: 8px;
    position: fixed;
    z-index: 20;

    top: var(--hint-top);
    left: var(--hint-left);

    background-color: var(--tooltip-background-color);
    color: var(--tooltip-color);
    transition: var(--tooltip-transition);

    padding: var(--tooltip-padding);
    border-radius: 4px;
    width: max-content;
    max-width: min(320px, calc(100vw - 16px));
    visibility: var(--hint-visibility, hidden);

    font-size: var(--tooltip-font-size);
    white-space: pre-line;
    word-break: normal;
    overflow-wrap: normal;
    hyphens: auto;

    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.16));

    line-height: initial;

    &::before {
      position: fixed;
      content: '';

      width: var(--hint-before-width, 11px);
      height: var(--hint-before-width, 11px);
      background-color: var(--tooltip-background-color);

      clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
    }

    &_black {
      --tooltip-color: var(--white);
    }

    &_blue {
      --tooltip-background-color: var(--border-primary-color);
      --tooltip-color: var(--white);
    }

    &_white {
      --tooltip-background-color: var(--white);
      --tooltip-color: var(--text-color);
    }

    &_small {
      --tooltip-font-size: 14px;
    }

    &_medium {
      --tooltip-font-size: 16px;
    }

    &_large {
      --tooltip-font-size: 18px;
    }

    &_top-center,
    &_top-left,
    &_top-right,
    &_bottom-center,
    &_bottom-left,
    &_bottom-right {
      left: calc(var(--hint-left) + (var(--tooltip-width) / 2));
      transform: translateX(-50%);
      &::before {
        left: 50%;
        transform: translateX(-50%);
      }
    }

    &_top-center,
    &_top-left,
    &_top-right {
      top: calc(
        var(--hint-top) - var(--hint-height) - var(--hint-before-width) - var(
            --tooltip-hint-gap,
            8px
          )
      );
      &::before {
        bottom: auto;
        top: 100%;
        clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
      }
    }

    &_top-left {
      transform: translateX(-8px);
      &::before {
        left: var(--hint-before-width);
        transform: translateX(-70%);
      }
    }

    &_top-right {
      transform: translateX(calc((var(--hint-measured-width) * -1) + 16px));
      &::before {
        left: auto;
        right: var(--hint-before-width);
        transform: translateX(0%);
      }
    }

    &_bottom-center,
    &_bottom-left,
    &_bottom-right {
      top: calc(
        var(--hint-top) + var(--tooltip-height) + var(--hint-before-width) +
          var(--tooltip-hint-gap, 8px)
      );
      &::before {
        bottom: 100%;
      }
    }

    &_bottom-left {
      transform: translateX(-16px);
      &::before {
        left: var(--hint-before-width);
        transform: translateX(0%);
      }
    }

    &_bottom-right {
      transform: translateX(calc((var(--hint-measured-width) * -1) + 10px));
      &::before {
        left: auto;
        right: var(--hint-before-width);
        transform: translateX(70%);
      }
    }

    &_left-center,
    &_left-top,
    &_left-bottom,
    &_right-center,
    &_right-top,
    &_right-bottom {
      top: calc(var(--hint-top) + var(--tooltip-height) / 2);
      transform: translateY(-50%);
    }

    &_left-center,
    &_left-top,
    &_left-bottom {
      left: calc(
        var(--hint-left) + var(--tooltip-width) + var(--hint-before-width) +
          var(--tooltip-hint-gap, 12px)
      );
      &:before {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        clip-path: polygon(100% 0%, 0% 50%, 100% 100%);
      }
    }

    &_right-center,
    &_right-top,
    &_right-bottom {
      left: calc(
        var(--hint-left) - var(--hint-measured-width) - var(--hint-before-width) - var(
            --tooltip-hint-gap,
            12px
          )
      );
      &:before {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
      }
    }

    &_left-top,
    &_right-top {
      transform: translateY(-25%);
      &:before {
        top: 0%;
        transform: translateY(30%);
      }
    }

    &_left-bottom,
    &_right-bottom {
      transform: translateY(-75%);
      &:before {
        bottom: 0;
        transform: translateY(20%);
      }
    }
  }
}

dialog {
  &:has(.tooltip-yui-kit) {
    position: relative;
  }
}
.hint-animate {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.2s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }

  &-enter-to,
  &-leave-from {
    opacity: 1;
  }
}
</style>
