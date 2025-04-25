<template>
  <div :class="styles" :data-testid="props.dataTestid">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IPopoverHoverProps } from './interface/interface';
import { PopoverHoverEnum } from './enums/enums';

const props = withDefaults(defineProps<IPopoverHoverProps>(), {
  position: PopoverHoverEnum.bottom,
  dataTestid: 'PopoverHover'
});

const styles = computed(() => ({
  'popover-hover-yui-kit': true,
  'popover_hover-yui-kit_top': props.position == PopoverHoverEnum.top
}));
</script>

<style scoped>
.popover_hover-yui-kit_top {
  top: calc(100% + 5px);
}

.popover-hover-yui-kit {
  position: absolute;
  left: 0;
  display: grid;
  z-index: 20;
  background-color: var(--white);
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.05);
  width: max-content;
}
</style>
