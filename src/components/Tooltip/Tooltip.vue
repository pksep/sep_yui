<template>
  <div
    ref="tooltipRef"
    class="tooltip-yui-kit"
    :aria-label="hint"
    @mouseenter="showHint"
    @mouseleave="hideHint"
  >
    <slot></slot>

    <Teleport to="body">
      <div
        ref="hintRef"
        v-if="isCanShow"
        class="tooltip-yui-kit__hint"
        :class="tooltipClass"
      >
        {{ hint }}
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { ITooltipProps } from '@/components/Tooltip/interface/interface';
import changeStyleProperties from '@/helpers/change-style-properties';
import { computed, onMounted, onUnmounted, ref } from 'vue';

defineOptions({
  name: 'Tooltip'
});

const props = withDefaults(defineProps<ITooltipProps>(), {
  isShow: false,
  isCanShow: true,
  position: 'bottom-center',
  size: 'small',
  type: 'black'
});
const isShow = ref<boolean>(false);
const tooltipRef = ref<HTMLDivElement | null>(null);
const hintRef = ref<HTMLDivElement | null>(null);

const tooltipClass = computed(() => [
  {
    'tooltip-yui-kit__hint_show': props.isShow || isShow.value,
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
    'tooltip-yui-kit__hint_white': props.type === 'white'
  }
]);

const updatePosition = () => {
  if (tooltipRef.value && hintRef.value) {
    const tooltipRect = tooltipRef.value.getBoundingClientRect();
    const hintRect = hintRef.value.getBoundingClientRect();

    requestAnimationFrame(() => {
      if (hintRef.value) {
        changeStyleProperties(
          {
            '--tooltip-top': `${tooltipRect.top}px`,
            '--tooltip-left': `${tooltipRect.left}px`,
            '--tooltip-right': `${tooltipRect.right}px`,
            '--tooltip-width': `${tooltipRect.width}px`,
            '--tooltip-height': `${tooltipRect.height}px`,
            '--tooltip-hint-width': `${hintRect.width}px`
          },
          hintRef.value
        );

        if (props.hintGap) {
          changeStyleProperties(
            {
              '--tooltip-hint-gap': `${props.hintGap}px`
            },
            hintRef.value
          );
        }
      }
    });
  }
};

const showHint = () => {
  updatePosition();
  isShow.value = true;
};

const hideHint = () => {
  isShow.value = false;
};

onMounted(() => {
  if (tooltipRef.value && props.isShow) {
    updatePosition();
    window.addEventListener('scroll', updatePosition);
  }
});

onUnmounted(() => {
  if (tooltipRef.value && props.isShow) {
    window.removeEventListener('scroll', updatePosition);
  }
});
</script>

<style scoped lang="scss">
.tooltip-yui-kit {
  position: relative;
  display: inline-block;

  width: max-content;

  &__hint {
    --width: 11px;
    position: fixed;
    z-index: 1;

    background-color: var(--tooltip-background-color);
    color: var(--tooltip-color);
    opacity: 0;
    transition: var(--tooltip-transition);

    padding: var(--tooltip-padding);
    border-radius: 4px;
    white-space: nowrap;
    width: max-content;

    visibility: hidden;
    font-size: var(--tooltip-font-size);

    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.16));

    &::before {
      position: absolute;
      content: '';

      width: var(--width, 11px);
      height: var(--width, 11px);
      background-color: var(--tooltip-background-color);

      clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
    }

    &_black {
      --tooltip-background-color: var(--black2);
      --tooltip-color: var(--white);
    }

    &_blue {
      --tooltip-background-color: var(--blue7);
      --tooltip-color: var(--white);
    }

    &_white {
      --tooltip-background-color: var(--white);
      --tooltip-color: #181818;
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
      left: calc(var(--tooltip-width) / 2 + var(--tooltip-left));
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
        var(--tooltip-top) - var(--tooltip-height) - var(
            --tooltip-hint-gap,
            16px
          )
      );

      &::before {
        bottom: auto;
        top: 100%;
        clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
      }
    }

    &_top-left {
      &::before {
        left: var(--width);
        transform: translateX(-70%);
      }
    }

    &_top-right {
      &::before {
        left: auto;
        right: var(--width);
        transform: translateX(0%);
      }
    }

    &_bottom-center,
    &_bottom-left,
    &_bottom-right {
      top: calc(
        var(--tooltip-top) + var(--tooltip-height) +
          var(--tooltip-hint-gap, 16px)
      );

      &::before {
        bottom: 100%;
      }
    }

    &_bottom-left {
      &::before {
        left: var(--width);
        transform: translateX(0%);
      }
    }

    &_bottom-right {
      &::before {
        left: auto;
        right: var(--width);
        transform: translateX(70%);
      }
    }

    &_left-center,
    &_left-top,
    &_left-bottom,
    &_right-center,
    &_right-top,
    &_right-bottom {
      top: calc(var(--tooltip-top) + var(--tooltip-height) / 2);

      transform: translateY(-50%);
    }

    &_left-center,
    &_left-top,
    &_left-bottom {
      left: calc(
        var(--tooltip-left) + var(--tooltip-width) +
          var(--tooltip-hint-gap, 19px)
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
        var(--tooltip-left) - var(--tooltip-hint-width) - var(
            --tooltip-hint-gap,
            19px
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
      &:before {
        top: 0%;
        transform: translateY(30%);
      }
    }

    &_left-bottom,
    &_right-bottom {
      &:before {
        bottom: 0;
        transform: translateY(20%);
      }
    }

    &_show {
      visibility: visible;
      opacity: 1;
    }
  }
}
</style>
