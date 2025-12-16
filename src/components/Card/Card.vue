<template>
  <div class="card-yui-kit" :data-testid="props.dataTestid">
    <div
      v-if="$slots.left"
      class="card-yui-kit__left"
      :data-testid="`${props.dataTestid}-Left`"
    >
      <slot name="left" />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { ICardProps } from './interface/interface';

const props = withDefaults(defineProps<ICardProps>(), {
  dataTestid: 'Card'
});
</script>

<style scoped lang="scss">
.card-yui-kit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border-width: 0.5px;
  border-style: solid;
  border-color: transparent;
  box-shadow: 0px 4px 9.8px 0px #0000000d;
  background: white;
  border-radius: 15px;
  cursor: pointer;
  font-size: var(--font-size, 14px);

  &:hover,
  &:active,
  .pressed {
    border-color: var(--border-primary-color);
  }
  &:hover {
    border-width: 0.5px;
  }
  &:active,
  .pressed {
    border-width: 1px;
  }

  &__left {
    color: var(--primary-color);
    font-size: 24px;
    font-weight: 700;
    line-height: 100%;
  }
}
</style>
