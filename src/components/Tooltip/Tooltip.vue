<template>
  <div class="tooltip-yui-kit" :aria-label="String($slots['default'])">
    <div class="tooltip-yui-kit__content">
      <slot></slot>
    </div>
    <div v-if="isShow && $slots['tooltip']" class="tooltip-yui-kit__tooltip">
      <slot name="tooltip"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ITooltipProps } from '@/components/Tooltip/interface/interface';

defineOptions({
  name: 'Tooltip'
});

withDefaults(defineProps<ITooltipProps>(), {
  isShow: true
});
</script>

<style scoped lang="scss">
.tooltip-yui-kit {
  --tooltip-background-color: var(--black2);
  --tooltip-color: var(--white);

  position: relative;

  width: max-content;

  &:has(.tooltip-yui-kit__content:hover) .tooltip-yui-kit__tooltip {
    z-index: 0;
    opacity: 1;
    cursor: auto;
  }

  &__tooltip {
    position: absolute;
    width: inherit;
    z-index: -1;
    top: calc(100% + 17px);
    left: 50%;
    transform: translateX(-50%);

    padding: 8px 16px;

    opacity: 0;
    border-radius: 4px;
    background-color: var(--tooltip-background-color);
    color: var(--tooltip-color);

    font-size: 14px;
    text-align: center;

    transition: opacity 0.2s ease;
    cursor: default;

    &::after {
      --w: 11px;

      position: absolute;
      content: '';
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);

      clip-path: polygon(50% 0%, 100% 100%, 0% 100%);

      width: var(--w);
      height: var(--w);

      background-color: var(--tooltip-background-color);
    }
  }
}
</style>
