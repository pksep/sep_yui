<template>
  <div
    ref="selectRef"
    class="select-list-yui-kit"
    v-on-click-outside.bubble="dropdownHandler"
    :data-testid="props.dataTestid"
  >
    <slot name="body" :close-open-list="closeOpenList">
      <div
        ref="currentRef"
        :class="[
          'select-list-yui-kit__current',
          { 'active-yui-kit': state.isOpened },
          { 'disabled-yui-kit': props.disabled },
          props?.headerClasses
        ]"
        tabindex="0"
        @keyup.enter="closeOpenList"
        @click="closeOpenList"
        :data-testid="`${props.dataTestid}-Current`"
      >
        <slot name="header" />
      </div>
    </slot>

    <ul
      ref="dropdownRef"
      :class="['select-list-yui-kit__list', props?.optionsClasses]"
      :open="state.isOpened"
      v-show="state.isOpened"
      :data-testid="`${props.dataTestid}-OptionsList`"
    >
      <slot name="options" />
    </ul>
  </div>
</template>
<script setup lang="ts">
import {
  reactive,
  ref,
  watchEffect,
  onMounted,
  onUnmounted,
  watch,
  useId,
  computed
} from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import type { OnClickOutsideHandler } from '@vueuse/core';
import type { ISelectListProps } from './interface/interface';
import changeStyleProperties from '@/helpers/change-style-properties';

const props = withDefaults(defineProps<ISelectListProps>(), {
  isOpened: false,
  dataTestid: 'SelectList',
  isUseAnchor: false
});
const emits = defineEmits<{
  (e: 'change', val: boolean): void;
  (e: 'focusout-options'): void;
}>();

const state = reactive({
  isOpened: false
});

const id = useId();

const dropdownRef = ref<HTMLElement | null>(null);
const currentRef = ref<HTMLElement | null>(null);
const selectRef = ref<HTMLElement | null>(null);

const anchorName = computed(() => `--anchor-select-${id}`);
watchEffect(() => (state.isOpened = props.isOpened));

/**
 * Закрывает открытый список, и также открывает его.
 */
const closeOpenList = () => {
  if (props.disabled || props.disableOpen) return;

  state.isOpened = !state.isOpened;
  emits('change', state.isOpened);
};

const dropdownHandler: OnClickOutsideHandler = () => {
  state.isOpened = false;
  emits('focusout-options');
  emits('change', state.isOpened);
};

const updateDropdownPosition = () => {
  if (currentRef.value && dropdownRef.value && state.isOpened) {
    const currentRect = currentRef.value.getBoundingClientRect();
    dropdownRef.value.style.top = `${currentRect.top + currentRect.height}px`;
  }
};

watch(
  () => props.isOpened,
  () => {
    state.isOpened = props.isOpened;
  }
);

watch(() => state.isOpened, updateDropdownPosition);

const setAnchor = (): void => {
  if (selectRef.value) {
    changeStyleProperties(
      {
        'anchor-name': `${anchorName.value}`
      },
      selectRef.value
    );
  }
  if (dropdownRef.value) {
    changeStyleProperties(
      {
        'position-anchor': `${anchorName.value}`
      },
      dropdownRef.value
    );
  }
};

onMounted(() => {
  if (props.isUseAnchor) setAnchor();

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
    background-color: var(--background, var(--white));
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid transparent;
    border-radius: var(--radius, 5px);
    cursor: pointer;

    &:hover,
    &.active-yui-kit {
      border: 1px solid $BLUE-9CBEFF;
    }

    &.disabled-yui-kit {
      cursor: unset;
      background-color: var(--button-neutral-color);
      color: var(--text-light-color);
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
    margin: 0;
    margin-top: 5px;
    list-style-type: none;
    display: inline-grid;
    gap: var(--select-list-gap, 1px);
    width: inherit;
    padding: 0;
    background-color: var(--white);
    border: 1px solid $BLUE-9CBEFF;
    border-radius: 5px;
    position: fixed;
    overflow: auto;
    overflow-x: hidden;
    z-index: 2222;

    left: anchor(left);
    top: calc(anchor(bottom) + 5px);
  }
  &__list > div {
    display: grid;
    max-height: 120px;
    gap: 10px;
  }
}
</style>
