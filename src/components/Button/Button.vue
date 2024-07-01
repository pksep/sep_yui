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
  'button-ui-kit': true,
  [props.size]: true,
  'disabled-ui-kit': props.disabled,
  'pill-ui-kit': props.pill,
  'primary-ui-kit': props.type === ButtonTypeEnum.primary,
  'secondary-ui-kit': props.type === ButtonTypeEnum.secondary,
  'outline-ui-kit': props.type === ButtonTypeEnum.outline,
  'ghost-ui-kit': props.type === ButtonTypeEnum.ghost
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
button.button-ui-kit {
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

button.small-ui-kit {
  padding: 13px 11px;
  font-size: 14px;
  line-height: 16px;
  min-height: 40px;
}

button.medium-ui-kit {
  min-height: 50px;
  padding: 16px 13px;
}

button.large-ui-kit {
  min-height: 70px;
  padding: 5px 13px;
  font-size: 18px;
  line-height: 22px;
}

button.primary-ui-kit {
  background-color: $BLUE-77A6FF;

  &:active {
    background-color: $BLUE-548CF6;
  }
  &.disabled:disabled {
    color: $GREY-757D8A;
    background-color: $WHITE-F5F5F5;
  }
}

button.secondary-ui-kit {
  background-color: $WHITE-F8F9FD;
  color: $BLUE-77A6FF;

  &:active {
    background-color: $WHITE-ECF3FF;
  }
  &.disabled-ui-kit:disabled {
    color: $GREY-757D8A;
    background-color: $WHITE-F5F5F5;
  }
}

button.outline-ui-kit {
  background-color: $TRANSPARENT;
  border: 1px solid $BLUE-9CBEFF;
  color: $GREY-282828;

  &:active {
    color: $WHITE;
    background-color: $BLUE-548CF6;
  }

  &.disabled-ui-kit:disabled {
    color: $GREY-757D8A;
    background-color: $WHITE-F5F5F5;
    border: 1px solid $WHITE-E7E7E7;
  }
}

button.ghost-ui-kit {
  background-color: $TRANSPARENT;
  color: $GREY-282828;

  &:hover {
    background-color: $WHITE-F8F9FD;
  }

  &:active {
    color: $BLUE-77A6FF;
    background-color: $WHITE-ECF3FF;
  }
  &.disabled-ui-kit:disabled {
    background-color: $WHITE-E6E6E6;
  }
}

button.pill-ui-kit {
  border-radius: 10px;
}
</style>
