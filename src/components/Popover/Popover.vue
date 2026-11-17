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
                  <Icon
                    v-if="!!item.iconName"
                    :name="item.iconName"
                    :data-testid="`${props.dataTestid}-Item${i}-Icon`"
                  />
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
const toggleShow = (): void => {
  state.isShow = !state.isShow;
};

/** Закрывает меню и сохраняет уведомление внешнего управляющего компонента. */
const closeShow = (): void => {
  state.isShow = false;
  emits('close');
};

/** Выполняет выбранное действие и закрывает меню. */
const handleClick = (item: IPopoverOption): void => {
  item.function();
  closeShow();
};

let positionFrame: number | null = null;
let shouldCheckCovered = false;
let isPositioned = false;
let intersectionObserver: IntersectionObserver | null = null;

/** Объединяет события прокрутки и изменения размера в одно измерение за кадр. */
const setCssPosition = (): void => {
  // Закрытое меню не измеряем, уже запланированный кадр используем повторно.
  if (!state.isShow || positionFrame !== null) return;

  positionFrame = requestAnimationFrame(() => {
    positionFrame = null;

    if (!reference.value || !floating.value || !state.isShow) return;
    const setedStyles: Record<string, string> = {};

    const rect = reference.value.getBoundingClientRect();

    // Проверка перекрытия использует то же положение кнопки, что и меню.
    if (shouldCheckCovered) {
      shouldCheckCovered = false;
      checkCovered(reference.value, rect);

      if (!state.isShow) return;
    }

    // После первого размещения anchor сам следует за кнопкой без записей в style.
    if (isSupportAnchor && isPositioned) return;

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

    isPositioned = true;
  });
};

/**
 * Проверяем на попадание в другие элементы над элементом, открывающим popover
 * @param el Кнопка, открывающая меню.
 * @param rect Положение кнопки, уже измеренное в текущем кадре.
 */
const checkCovered = (el: Element, rect: DOMRect): void => {
  const topEl = document.elementFromPoint(rect.left, rect.top);
  const bottomEl = document.elementFromPoint(rect.right, rect.bottom);

  if (!(topEl && el.contains(topEl)) && !(bottomEl && el.contains(bottomEl))) {
    closeShow();
  }
};

/** Отмечает необходимость проверки перекрытия без синхронных измерений при scroll. */
const handleScroll = (): void => {
  if (!state.isShow) return;

  shouldCheckCovered = true;
  setCssPosition();
};

/** Наблюдает только за открытым меню, сохраняя единственный обработчик прокрутки. */
const setObservers = (): void => {
  window.addEventListener('scroll', handleScroll, {
    capture: true,
    passive: true
  });

  // В браузерах с anchor позиционирование при resize выполняет CSS.
  if (!isSupportAnchor) window.addEventListener('resize', setCssPosition);

  // Закрытые меню не создают наблюдатель и не удерживают наблюдаемые элементы.
  intersectionObserver = new IntersectionObserver(entries => {
    if (state.isShow && entries.some(entry => !entry.isIntersecting)) {
      closeShow();
    }
  });

  if (popover.value) intersectionObserver.observe(popover.value);
};

/** Освобождает все ресурсы меню при закрытии и размонтировании независимо от refs. */
const executeObservers = (): void => {
  // Удаляем ту же функцию и с тем же capture, с которыми она была добавлена.
  window.removeEventListener('scroll', handleScroll, true);
  window.removeEventListener('resize', setCssPosition);
  intersectionObserver?.disconnect();
  intersectionObserver = null;

  if (positionFrame !== null) {
    cancelAnimationFrame(positionFrame);
    positionFrame = null;
  }

  shouldCheckCovered = false;
  isPositioned = false;
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
});

onUnmounted(() => {
  executeObservers();
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

    color: var(--popover-icon-color, var(--text-light-color));
    &:hover,
    &.active-yui-kit {
      color: var(--border-primary-color);
      &.empty-yui-kit {
        color: var(--popover-icon-color, var(--text-light-color));
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
  box-shadow: 0px 4px 9.8px 0px #0000000d;
  overflow: hidden;
  background-color: var(--surface-overlay);
  border: 0.5px solid transparent;
  transition: all 0.2s ease-in-out;
  color: var(--text-primary);
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

:is([data-theme='dark'], .theme-dark) .popover-yui-kit__content {
  border: 0.5px solid var(--border-table);
}

.popover-yui-kit__options {
  display: grid;
  box-shadow: 0 0 22px 0 #00000012;
  font-size: 14px;
  padding: 5px;
  gap: 5px;

  & .popover-yui-kit__options__item {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    width: 100%;
    border-radius: 5px;
    padding: 5px;
    text-align: left;
    transition: background-color 0.2s ease;
    color: var(--text-primary);
    &:hover {
      background-color: var(--action-secondary-hover-bg);
    }
    &:active {
      background-color: var(--action-secondary-pressed-bg);
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
