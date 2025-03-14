<template>
  <div class="tooltip-yui-kit" :class="tooltipClass" :aria-label="hint">
    <slot></slot>
    <div class="tooltip-yui-kit__hint">{{ hint }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ITooltipProps } from '@/components/Tooltip/interface/interface';
import { computed } from 'vue';

defineOptions({
  name: 'Tooltip'
});

const props = withDefaults(defineProps<ITooltipProps>(), {
  isShow: false,
  position: 'bottom-center',
  size: 'small',
  type: 'black'
});

const tooltipClass = computed(() => [
  {
    'tooltip-yui-kit_show': props.isShow,
    'tooltip-yui-kit_bottom-center': props.position === 'bottom-center',
    'tooltip-yui-kit_bottom-left': props.position === 'bottom-left',
    'tooltip-yui-kit_bottom-right': props.position === 'bottom-right',
    'tooltip-yui-kit_top-center': props.position === 'top-center',
    'tooltip-yui-kit_top-left': props.position === 'top-left',
    'tooltip-yui-kit_top-right': props.position === 'top-right',
    'tooltip-yui-kit_left-top': props.position === 'left-top',
    'tooltip-yui-kit_left-center': props.position === 'left-center',
    'tooltip-yui-kit_left-bottom': props.position === 'left-bottom',
    'tooltip-yui-kit_right-top': props.position === 'right-top',
    'tooltip-yui-kit_right-center': props.position === 'right-center',
    'tooltip-yui-kit_right-bottom': props.position === 'right-bottom',
    'tooltip-yui-kit_small': props.size === 'small',
    'tooltip-yui-kit_medium': props.size === 'medium',
    'tooltip-yui-kit_large': props.size === 'large',
    'tooltip-yui-kit_black': props.type === 'black',
    'tooltip-yui-kit_blue': props.type === 'blue',
    'tooltip-yui-kit_white': props.type === 'white'
  }
]);
</script>

<style scoped lang="scss">
.tooltip-yui-kit {
  --tooltip-background-color: var(--black2);
  --tooltip-color: var(--white);
  --tooltip-transition: opacity 0.3s ease;
  --tooltip-padding: 8px 16px;
  --tooltip-font-size: 14px;

  position: relative;

  width: max-content;

  &__hint {
    --width: 11px;
    position: absolute;
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
    & .tooltip-yui-kit__hint {
      left: 50%;
      transform: translateX(-50%);

      &::before {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  &_top-center,
  &_top-left,
  &_top-right {
    & .tooltip-yui-kit__hint {
      top: auto;
      bottom: calc(100% + 16px);

      &::before {
        bottom: auto;
        top: 100%;
        clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
      }
    }
  }

  &_top-left {
    & .tooltip-yui-kit__hint {
      &::before {
        left: var(--width);
        transform: translateX(-70%);
      }
    }
  }

  &_top-right {
    & .tooltip-yui-kit__hint {
      &::before {
        left: auto;
        right: var(--width);
        transform: translateX(0%);
      }
    }
  }

  &:hover .tooltip-yui-kit__hint,
  &_show .tooltip-yui-kit__hint {
    visibility: visible;
    opacity: 1;
  }

  &_bottom-center,
  &_bottom-left,
  &_bottom-right {
    & .tooltip-yui-kit__hint {
      top: calc(100% + 16px);
      &::before {
        bottom: 100%;
      }
    }
  }

  &_bottom-left {
    & .tooltip-yui-kit__hint {
      &::before {
        left: var(--width);
        transform: translateX(0%);
      }
    }
  }

  &_bottom-right {
    & .tooltip-yui-kit__hint {
      &::before {
        left: auto;
        right: var(--width);
        transform: translateX(70%);
      }
    }
  }

  &_left-center,
  &_left-top,
  &_left-bottom,
  &_right-center,
  &_right-top,
  &_right-bottom {
    & .tooltip-yui-kit__hint {
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &_left-center,
  &_left-top,
  &_left-bottom {
    & .tooltip-yui-kit__hint {
      left: calc(100% + 19px);

      &:before {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        clip-path: polygon(100% 0%, 0% 50%, 100% 100%);
      }
    }
  }

  &_right-center,
  &_right-top,
  &_right-bottom {
    & .tooltip-yui-kit__hint {
      right: calc(100% + 19px);

      &:before {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
      }
    }
  }

  &_left-top,
  &_right-top {
    & .tooltip-yui-kit__hint {
      &:before {
        top: 0%;
        transform: translateY(30%);
      }
    }
  }

  &_left-bottom,
  &_right-bottom {
    & .tooltip-yui-kit__hint {
      &:before {
        bottom: 0;
        transform: translateY(20%);
      }
    }
  }

  // &:has(.tooltip-yui-kit__content:hover) .tooltip-yui-kit__tooltip {
  //   z-index: 0;
  //   opacity: 1;
  //   cursor: auto;
  // }

  // &__tooltip {
  //   position: absolute;
  //   width: inherit;
  //   z-index: -1;
  //   top: calc(100% + 17px);
  //   left: 50%;
  //   transform: translateX(-50%);

  //   padding: 8px 16px;

  //   opacity: 0;
  //   border-radius: 4px;
  //   background-color: var(--tooltip-background-color);
  //   color: var(--tooltip-color);

  //   font-size: 14px;
  //   text-align: center;

  //   transition: opacity 0.2s ease;
  //   cursor: default;

  //   &::after {
  //     --width: 11px;

  //     position: absolute;
  //     content: '';
  //     bottom: 100%;
  //     left: 50%;
  //     transform: translateX(-50%);

  //     clip-path: polygon(50% 0%, 100% 100%, 0% 100%);

  //     width: var(--width);
  //     height: var(--width);

  //     background-color: var(--tooltip-background-color);
  //   }
  // }
}
</style>
