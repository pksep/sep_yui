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
import '@/styles/components/_button.scss';

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
