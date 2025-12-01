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
        <slot name="trigger">
          <Icon
            class="popover-yui-kit__icon"
            :name="props.iconName"
            :data-testid="`${props.dataTestid}-PopoverShow-Icon`"
          />
        </slot>
      </div>

      <Teleport :to="toTeleport" :disabled="props.isWCUse">
        <Transition name="popover-animate">
          <div
            v-show="state.isShow"
            class="popover-yui-kit__content"
            :style="{
              transform: `translateY(${props.translateY})`
            }"
            ref="floating"
          >
            <slot>
              <div
                v-if="props.options?.length"
                class="popover-yui-kit__options"
                :data-testid="`${props.dataTestid}-PopoverShow-Options`"
              >
                <div
                  class="popover-yui-kit__options__item"
                  v-for="(item, i) in props.options"
                  :key="i"
                  :style="item.style"
                  @click.stop="handleClick(item)"
                  :data-testid="`${props.dataTestid}-Item${i}`"
                >
                  {{ item.value }}
                </div>
              </div>
            </slot>
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
  tooltipPosition: 'top-left',
  translateY: '0'
});

const emits = defineEmits<{
  (e: 'close'): void;
}>();

const state = reactive<IPopoverState>({
  isShow: false
});

const toTeleport = computed(() => {
  const dialog = reference.value?.closest('dialog');

  if (dialog) return dialog;

  return 'body';
});

const isSupportAnchor = CSS.supports('top', 'anchor(bottom)');
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
    if (!reference.value || !floating.value || !state.isShow) return;
    const setedStyles: Record<string, string> = {};

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

      top += 10;
    }

    top += 10;

    setedStyles['--popover-top'] = `${top}px`;
    // Если не поддерживает anchor, то устанавливаем позицию по горизонту
    if (!isSupportAnchor) setedStyles['--popover-left'] = `${left}px`;

    changeStyleProperties(setedStyles, floating.value);

    /**
     * Получаем направление относительно горизонтального края
     */
    const setDirect = (): void => {
      if (!floating.value) return;
      const floatingRect = floating.value.getBoundingClientRect();

      // Если элемент расположен за правой границей, то меняем ему направление на лево
      if (floatingRect.right > window.innerWidth) {
        if (isSupportAnchor) {
          setedStyles['--popover-right'] = `anchor(right) `;
        } else {
          setedStyles['--popover-right'] =
            `${rect.right - floatingRect.width}px`;
        }
      }
    };

    setDirect();

    if (setedStyles['--popover-right']) {
      setedStyles.left = 'auto';
      changeStyleProperties(setedStyles, floating.value);
    }
  });
};

/**
 * Проверяем на попадание в другие элементы над элементом, открывающим popover
 * @param el
 */
const checkCovered = (el: Element): void => {
  const rect = el.getBoundingClientRect();
  const topEl = document.elementFromPoint(rect.left, rect.top);
  const bottomEl = document.elementFromPoint(rect.right, rect.bottom);

  if (!(topEl && el.contains(topEl)) && !(bottomEl && el.contains(bottomEl))) {
    closeShow();
  }
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

const setCheckCovered = (): void => {
  if (reference.value) {
    window.addEventListener(
      'scroll',
      checkCovered.bind(null, reference.value),
      true
    );
  }
};

const removeCheckCovered = (): void => {
  if (reference.value) {
    window.removeEventListener(
      'scroll',
      checkCovered.bind(null, reference.value),
      true
    );
  }
};

watch(
  () => props.isShow,
  () => (state.isShow = props.isShow)
);

watch(
  () => state.isShow,
  () => {
    if (state.isShow) {
      setCssPosition();
      setCheckCovered();
    } else {
      removeCheckCovered();
    }

    // если поддерживается anchor, то ничего не отслеживаем
    if (isSupportAnchor) return;

    if (state.isShow) {
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
  if (!isSupportAnchor) {
    setCssPosition();
  }
});

onUnmounted(() => {
  intersectionObeserver.disconnect();

  removeCheckCovered();
  if (!isSupportAnchor) {
    executeObservers();
  }
});
</script>

<style scoped>
:global(body) {
  anchor-scope: all;
}

.popover-yui-kit {
  display: grid;
  width: fit-content;
  position: relative;

  & .popover-yui-kit__icon {
    font-size: 16px;
  }

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

.popover-yui-kit__content {
  position: fixed;
  z-index: 20;
  border-radius: 5px;
  background-color: var(--white);
  width: max-content;
  @supports (top: anchor(bottom)) {
    top: calc(anchor(bottom) + 10px);
    left: var(--popover-left, anchor(left));
    right: var(--popover-right);
  }

  @supports not (top: anchor(bottom)) {
    position: absolute;
    top: var(--popover-top);
    left: var(--popover-left);
    right: var(--popover-right);
  }
}

.popover-yui-kit__options {
  display: grid;
  box-shadow: 0 0 22px 0 #00000012;
  font-size: 14px;
  padding: 5px;
  gap: 5px;

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

.popover-animate-enter-active,
.popover-animate-leave-active {
  transition: opacity 0.2s ease;
}

.popover-animate-enter-from,
.popover-animate-leave-to {
  opacity: 0;
}

.popover-animate-enter-to,
.popover-animate-leave-from {
  opacity: 1;
}
</style>
