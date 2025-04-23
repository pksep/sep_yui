<template>
  <Tooltip
    :hint="props.tooltip"
    size="small"
    type="black"
    position="top-left"
    :is-can-show="!!props.tooltip && !state.isShow"
  >
    <div class="popover-yui-kit" v-on-click-outside.bubble="closeShow">
      <div :class="classesFilter" @click="toggleShow" ref="currentRef">
        <Icon
          class="popover-yui-kit__icon"
          :name="props.iconName"
          :width="16"
          :height="16"
        />
      </div>

      <div
        class="popover-yui-kit__options"
        v-show="state.isShow"
        ref="dropdownRef"
      >
        <div
          class="popover-yui-kit__options__item"
          v-for="(item, i) in props.options"
          :key="i"
          @click="handleClick(item)"
        >
          {{ item.value }}
        </div>
      </div>
    </div>
  </Tooltip>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { IPopoverOption, IPopoverProps } from './interface/interface';
import Icon from '@/components/Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import { vOnClickOutside } from '@vueuse/components';
import Tooltip from '@/components/Tooltip/Tooltip.vue';

interface IPopoverState {
  isShow: boolean;
}

const props = withDefaults(defineProps<IPopoverProps>(), {
  iconName: IconNameEnum.moreVertical,
  options: () => [],
  tooltip: ''
});

const emits = defineEmits<{
  (e: 'close'): void;
}>();

const state = reactive<IPopoverState>({
  isShow: false
});

const dropdownRef = ref<HTMLElement | null>(null);
const currentRef = ref<HTMLElement | null>(null);

/**
 * Создаем проверки для классов, устанавливаем их основной плашке фильтра.
 */
const classesFilter = computed(() => ({
  'popover-yui-kit__wrapper': true,
  'active-yui-kit': state.isShow
}));

/**
 * показываем, скрываем список фильтров
 */
const toggleShow = () => (state.isShow = !state.isShow);

const closeShow = (): void => {
  state.isShow = false;
  emits('close');
};

const handleClick = (item: IPopoverOption): void => {
  item.function();
  state.isShow = false;
};

const updateDropdownPosition = () => {
  if (currentRef.value && dropdownRef.value && state.isShow) {
    const currentRect = currentRef.value.getBoundingClientRect();
    dropdownRef.value.style.top = `${currentRect.top + currentRect.height + 10}px`;
    dropdownRef.value.style.left = `${currentRect.left}px`;
  }
};

watch(() => state.isShow, updateDropdownPosition);

watch(
  () => props.isShow,
  () => (state.isShow = props.isShow)
);

onMounted(() => {
  updateDropdownPosition();
  window.addEventListener('scroll', closeShow, true);
});

onUnmounted(() => {
  window.removeEventListener('scroll', closeShow, true);
});
</script>

<style lang="scss" scoped>
.popover-yui-kit {
  display: grid;
  width: fit-content;
  position: relative;

  & .popover-yui-kit__wrapper {
    display: flex;
    align-items: center;
    width: fit-content;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    color: var(--popover-icon-color, var(--grey4));
    &:hover,
    &.active-yui-kit {
      color: var(--border-blue);
    }
  }

  & .popover-yui-kit__options {
    position: fixed;
    z-index: 20;
    left: 0;
    background-color: var(--white);
    border-radius: 5px;
    box-shadow: 0 0 22px 0 #00000012;
    padding: 5px;
    display: grid;
    gap: 5px;
    width: max-content;

    & .popover-yui-kit__options__item {
      cursor: pointer;
      width: 100%;
      border-radius: 5px;
      padding: 5px;
      text-align: left;
      transition: background-color 0.2s ease;
      &:hover {
        background-color: var(--blue9);
      }
      &:active {
        background-color: var(--blue10);
      }
    }
  }
}
</style>
