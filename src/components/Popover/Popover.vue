<template>
  <Tooltip
    :hint="props.tooltip"
    size="small"
    type="black"
    :position="props.tooltipPosition"
    :data-testid="props.dataTestid"
    :is-can-show="!!props.tooltip && !state.isShow && props.options.length > 0"
  >
    <div
      class="popover-yui-kit"
      v-on-click-outside.bubble="closeShow"
      :data-testid="`${props.dataTestid}-Popover`"
    >
      <div
        :class="classesFilter"
        @click="toggleShow"
        ref="currentRef"
        :data-testid="`${props.dataTestid}-PopoverShow`"
      >
        <Icon
          class="popover-yui-kit__icon"
          :name="props.iconName"
          :width="16"
          :height="16"
          :data-testid="`${props.dataTestid}-PopoverShow-Icon`"
        />
      </div>

      <div
        v-if="props.options?.length"
        class="popover-yui-kit__options"
        v-show="state.isShow"
        ref="dropdownRef"
        :data-testid="`${props.dataTestid}-PopoverShow-Options`"
      >
        <div
          class="popover-yui-kit__options__item"
          :style="item.style"
          v-for="(item, i) in props.options"
          :key="i"
          @click.stop="handleClick(item)"
          :data-testid="`${props.dataTestid}-Item${i}`"
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
  tooltip: '',
  dataTestid: 'Popover',
  tooltipPosition: 'top-left'
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
  'active-yui-kit': state.isShow,
  'empty-yui-kit': props.options.length === 0
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
  closeShow();
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
      &.empty-yui-kit {
        color: var(--popover-icon-color, var(--grey4));
      }
    }

    &.empty-yui-kit {
      cursor: default;
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
