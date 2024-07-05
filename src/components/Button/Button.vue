<template>
  <button
    :class="classes"
    :disabled="props.disabled"
    :style="styles"
    @click="onClick"
  >
    <template v-if="$slots['left-icon']">
      <span :style="styleChangeColor">
        <slot name="left-icon" />
      </span>
    </template>
    <slot />
    <template v-if="$slots['right-icon']">
      <span :style="styleChangeColor">
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
  color: ''
});

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const classes = computed(() => ({
  'button-yui-kit': true,
  [props.size]: true,
  'disabled-yui-kit': props.disabled,
  'pill-yui-kit': props.pill,
  'primary-yui-kit': props.type === ButtonTypeEnum.primary,
  'secondary-yui-kit': props.type === ButtonTypeEnum.secondary,
  'outline-yui-kit': props.type === ButtonTypeEnum.outline,
  'ghost-yui-kit': props.type === ButtonTypeEnum.ghost
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
const onClick = () => emit('click');
</script>

<style lang="scss" scoped>
.button-yui-kit {
  color: $WHITE;
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
  padding: 13px 11px;
  font-size: 14px;
  line-height: 16px;
  min-height: 40px;
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
  background-color: $BLUE-77A6FF;

  &:active {
    background-color: $BLUE-548CF6;
  }
  &.disabled:disabled {
    color: $GREY-757D8A;
    background-color: $WHITE-F5F5F5;
  }
}

.secondary-yui-kit {
  background-color: $WHITE-F8F9FD;
  color: $BLUE-77A6FF;

  &:active {
    background-color: $WHITE-ECF3FF;
  }
  &.disabled-yui-kit:disabled {
    color: $GREY-757D8A;
    background-color: $WHITE-F5F5F5;
  }
}

.outline-yui-kit {
  background-color: $TRANSPARENT;
  border: 1px solid $BLUE-9CBEFF;
  color: $GREY-282828;

  &:active {
    color: $WHITE;
    background-color: $BLUE-548CF6;
  }

  &.disabled-yui-kit:disabled {
    color: $GREY-757D8A;
    background-color: $WHITE-F5F5F5;
    border: 1px solid $WHITE-E7E7E7;
  }
}

.ghost-yui-kit {
  background-color: $TRANSPARENT;
  color: $GREY-282828;

  &:hover {
    background-color: $WHITE-F8F9FD;
  }

  &:active {
    color: $BLUE-77A6FF;
    background-color: $WHITE-ECF3FF;
  }
  &.disabled-yui-kit:disabled {
    background-color: $WHITE-E6E6E6;
  }
}

.pill-yui-kit {
  border-radius: 10px;
}
</style>
