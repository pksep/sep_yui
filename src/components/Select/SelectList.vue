<template>
  <div class="select-list-yui-kit" v-on-click-outside.bubble="dropdownHandler">
    <span
      ref="currentRef"
      :class="[
        'select-list-yui-kit__current',
        { 'active-yui-kit': state.isOpened },
        { 'disabled-yui-kit': props.disabled },
        props.cn?.header
      ]"
      @click="closeOpenList"
    >
      <slot name="header" />
    </span>
    <ul
      ref="dropdownRef"
      :class="['select-list-yui-kit__list', props.cn?.options]"
      v-show="state.isOpened"
    >
      <slot name="options" />
    </ul>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, watchEffect, onMounted, onUnmounted, watch } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import type { OnClickOutsideHandler } from '@vueuse/core';
import type { ISelectListProps } from './interface/interface';

const props = withDefaults(defineProps<ISelectListProps>(), {
  isOpened: false
});

const state = reactive({
  isOpened: false
});

const dropdownRef = ref<HTMLElement | null>(null);
const currentRef = ref<HTMLElement | null>(null);

const emits = defineEmits<{
  (e: 'change', val: boolean): void;
}>();

watchEffect(() => {
  state.isOpened = props.isOpened;
});

/**
 * Закрывает открытый список, и также открывает его.
 */
const closeOpenList = () => {
  if (props.disabled) return;
  state.isOpened = !state.isOpened;
  emits('change', state.isOpened);
};

const dropdownHandler: OnClickOutsideHandler = () => {
  state.isOpened = false;
  emits('change', state.isOpened);
};

const updateDropdownPosition = () => {
  if (currentRef.value && dropdownRef.value && state.isOpened) {
    const currentRect = currentRef.value.getBoundingClientRect();
    dropdownRef.value.style.top = `${currentRect.top + currentRect.height}px`;
    dropdownRef.value.style.width = `${currentRect.width}px`;
  }
};

watch(() => state.isOpened, updateDropdownPosition);

onMounted(() => {
  window.addEventListener('scroll', updateDropdownPosition, true);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateDropdownPosition, true);
});
</script>
<style lang="scss" scoped>
.select-list-yui-kit {
  width: var(--width, 100%);

  &__current {
    width: inherit;
    padding: 0px 10px;
    background-color: var(--white);
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid transparent;
    border-radius: var(--radius, 5px);
    cursor: pointer;

    &.active-yui-kit {
      border: 1px solid $BLUE-9CBEFF;
    }

    &.disabled-yui-kit {
      cursor: unset;
      background-color: var(--grey1);
      color: var(--grey4);
    }

    svg {
      flex-shrink: 0;
      height: 16px;
      width: 16px;
    }
  }

  &__text {
    padding: 8.5px 0;
  }
  &__list {
    margin-top: 5px;
    list-style-type: none;
    display: inline-grid;
    width: inherit;
    padding: 0;
    background-color: var(--white);
    border: 1px solid $BLUE-9CBEFF;
    border-radius: 5px;
    position: fixed;
    overflow: auto;
    overflow-x: hidden;
    z-index: 2222222;
  }
  &__list > div {
    display: grid;
    max-height: 120px;
    gap: 10px;
  }
}
</style>
