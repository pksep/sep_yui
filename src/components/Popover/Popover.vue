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
      ref="popover"
      v-on-click-outside.bubble="closeShow"
      :data-testid="`${props.dataTestid}-Popover`"
    >
      <div
        ref="reference"
        :class="classesFilter"
        :data-testid="`${props.dataTestid}-PopoverShow`"
        @click="toggleShow"
      >
        <Icon
          class="popover-yui-kit__icon"
          :name="props.iconName"
          :width="16"
          :height="16"
          :data-testid="`${props.dataTestid}-PopoverShow-Icon`"
        />
      </div>

      <Teleport to="body">
        <Transition name="popover-animate">
          <div
            v-if="props.options?.length"
            class="popover-yui-kit__options"
            v-show="state.isShow"
            ref="floating"
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
        </Transition>
      </Teleport>
    </div>
  </Tooltip>
</template>

<script lang="ts" setup>
import {
  computed,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  useId,
  watch
} from 'vue';
import { IPopoverOption, IPopoverProps } from './interface/interface';
import Icon from '@/components/Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum';
import { vOnClickOutside } from '@vueuse/components';
import Tooltip from '@/components/Tooltip/Tooltip.vue';
import changeStyleProperties from '@/helpers/change-style-properties';

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

const id = useId();

const anchorName = computed(() => `--anchor-popover-${id}`);

const reference = ref<HTMLElement | null>(null);
const floating = ref<HTMLElement | null>(null);
const popover = ref<HTMLElement | null>(null);

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

/**
 * Устанавливает позицию для popover
 */
const setCssPosition = (): void => {
  requestAnimationFrame(() => {
    if (!reference.value || !floating.value) return;
    const setedStyles: Record<string, string> = {
      '--popover-top': '0',
      '--popover-left': '0'
    };

    const rect = reference.value.getBoundingClientRect();

    // получаем положение основного элемента относительно документа
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    let top = rect.bottom + scrollTop;
    let left = rect.left + scrollLeft;

    // если элемент находится в диалоге, то нужно вычесть его положение
    const dialog = reference.value.closest('dialog');

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

    top += 10;

    setedStyles['--popover-top'] = `${top}px`;
    setedStyles['--popover-left'] = `${left}px`;

    changeStyleProperties(setedStyles, floating.value);
  });
};

const intersectionObeserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    // Если элемент не виден, то закрываем popover
    if (!entry.isIntersecting) {
      closeShow();
    }
  });
});

const setObservers = (): void => {
  if (reference.value && floating.value) {
    window.addEventListener('scroll', setCssPosition, true);
    window.addEventListener('resize', setCssPosition);
  }
};

const executeObservers = (): void => {
  if (reference.value && floating.value) {
    window.removeEventListener('scroll', setCssPosition, true);
    window.removeEventListener('resize', setCssPosition);
  }
};

watch(
  () => props.isShow,
  () => (state.isShow = props.isShow)
);

watch(
  () => state.isShow,
  () => {
    // если поддерживается anchor, то ничего не отслеживаем
    if (CSS.supports('top', 'anchor(bottom)')) return;

    if (state.isShow) {
      setCssPosition();
      setObservers();
    } else {
      executeObservers();
    }
  }
);

onMounted(() => {
  if (reference.value) {
    changeStyleProperties(
      {
        'anchor-name': `${anchorName.value}`
      },
      reference.value
    );
  }
  if (floating.value) {
    changeStyleProperties(
      {
        'position-anchor': `${anchorName.value}`
      },
      floating.value
    );
  }

  if (popover.value) {
    intersectionObeserver.observe(popover.value);
  }

  // Поддерживаем старые браузеры
  if (!CSS.supports('top', 'anchor(bottom)')) {
    setCssPosition();
  }
});

onUnmounted(() => {
  intersectionObeserver.disconnect();
});
</script>

<style lang="scss" scoped>
@global (body) {
  anchor-scope: all;
}

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
}

.popover-yui-kit__options {
  position: fixed;
  z-index: 20;
  background-color: var(--white);
  border-radius: 5px;
  box-shadow: 0 0 22px 0 #00000012;
  padding: 5px;
  display: grid;
  gap: 5px;
  width: max-content;
  font-size: 14px;

  @supports (top: anchor(bottom)) {
    top: calc(anchor(bottom) + 10px);
    left: anchor(left);
  }

  @supports not (top: anchor(bottom)) {
    position: absolute;
    top: var(--popover-top);
    left: var(--popover-left);
  }

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

.popover-animate {
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
