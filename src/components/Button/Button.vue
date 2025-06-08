<template>
  <button
    :class="classes"
    :disabled="props.disabled"
    tabindex="0"
    :style="styles"
    :data-testid="props.dataTestid"
    @click="onClick"
    @keyup.enter="onClick"
  >
    <template v-if="$slots['left-icon']">
      <span
        :style="styleChangeColor"
        :data-testid="`${props.dataTestid}-LeftIcon`"
      >
        <slot name="left-icon" />
      </span>
    </template>
    <slot />
    <template v-if="$slots['right-icon']">
      <span
        :style="styleChangeColor"
        :data-testid="`${props.dataTestid}-RightIcon`"
      >
        <slot name="right-icon" />
      </span>
    </template>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { SizesEnum } from '../../common/sizes';
import { IButtonProps } from './interface/interface';
import { ButtonTypeEnum } from './enum/enum';

const props = withDefaults(defineProps<IButtonProps>(), {
  disabled: false,
  size: SizesEnum.medium,
  type: ButtonTypeEnum.primary,
  pill: false,
  color: '',
  dataTestid: 'Button'
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent | KeyboardEvent): void;
}>();

const classes = computed(() => ({
  'button-yui-kit': true,
  [props.size]: true,
  'disabled-yui-kit': props.disabled,
  'pill-yui-kit': props.pill,
  'primary-yui-kit': props.type === ButtonTypeEnum.primary,
  'secondary-yui-kit': props.type === ButtonTypeEnum.secondary,
  'outline-yui-kit': props.type === ButtonTypeEnum.outline,
  'reject-yui-kit': props.type === ButtonTypeEnum.reject,
  'ghost-yui-kit': props.type === ButtonTypeEnum.ghost,
  'minor-yui-kit': props.type === ButtonTypeEnum.minor
}));

/**
 * Проверка и установка стилей на бэкграунд кнопки
 */
const styles = computed(() => ({
  backgroundColor: props.backgroundColor
}));

/**
 * Проверка и установка стилей на цвет текста кнопки
 */
const styleChangeColor = computed(() => ({
  color:
    props.color === 'primary' || props.color === 'secondary'
      ? 'black'
      : props.color
}));

/**
 *  Передает событие клик родителю
 */
const onClick = (e: MouseEvent | KeyboardEvent) => emit('click', e);
</script>

<style scoped lang="scss">
.button-yui-kit {
  color: var(--white);
  outline: none;
  border: none;
  box-sizing: border-box;
  border-radius: 5px;
  transition: 0.3s ease-in-out;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover:not(:disabled) {
    cursor: pointer;
  }
}

.small-yui-kit {
  padding: 13px 11.5px;
  font-size: 14px;
  line-height: 16px;
  min-height: 40px;
}

.little-yui-kit {
  padding: 6.5px 8px;
  font-size: 14px;
  line-height: 100%;
  min-height: 30px;
}

.medium-yui-kit {
  min-height: 50px;
  padding: 16px 13px;
}

.large-yui-kit {
  min-height: 70px;
  padding: 5px 13px;
  font-size: 18px;
  line-height: 22px;
}

.primary-yui-kit {
  background-color: var(--blue1);

  &:hover,
  &:active,
  &.active {
    background-color: #548cf6;
  }

  &.disabled-yui-kit {
    color: var(--grey6);
    background-color: var(--grey1);
  }
}

.secondary-yui-kit {
  background-color: var(--blue15);
  color: var(--blue1);

  &:active,
  &.active {
    background-color: var(--blue10);
  }
  &.disabled-yui-kit {
    color: var(--grey6);
    background-color: var(--grey1);
  }
}

.outline-yui-kit {
  background-color: transparent;
  border: 1px solid var(--border-blue);
  color: var(--grey14);

  &:active,
  &.active {
    color: var(--white);
    background-color: #548cf6;
  }

  &.disabled-yui-kit {
    color: var(--grey6);
    background-color: var(--grey1);
    border: 1px solid var(--grey7);
  }
}

.reject-yui-kit {
  background-color: var(--grey1);
  border: 1px solid transparent;
  color: var(--grey6);

  &:active,
  &.active {
    color: var(--grey6);
    background-color: var(--grey1);
  }

  &.disabled-yui-kit {
    color: var(--grey6);
    background-color: var(--grey1);
    border: 1px solid var(--grey7);
  }
}

.ghost-yui-kit {
  background-color: transparent;
  color: var(--black2);

  &:hover {
    background-color: var(--blue15);
  }

  &:active,
  &.active {
    color: var(--blue1);
    background-color: var(--blue10);
  }
  &.disabled-yui-kit {
    background-color: var(--grey2);
  }
}

.minor-yui-kit {
  background-color: var(--white);
  color: var(--grey6);

  &:hover {
    background-color: var(--blue15);
  }

  &:active,
  &.active {
    color: var(--blue1);
    background-color: var(--blue10);
  }
  &.disabled-yui-kit {
    color: var(--grey6);
    background-color: var(--grey11);
  }
}

.disabled-yui-kit {
  cursor: auto;
}

.pill-yui-kit {
  border-radius: 10px;
}
</style>
