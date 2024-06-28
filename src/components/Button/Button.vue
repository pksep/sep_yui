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
import { ButtonType } from './enum/enum';

const props = withDefaults(defineProps<IButtonProps>(), {
  disabled: false,
  size: SizesEnum.medium,
  type: ButtonType.primary,
  pill: false,
  color: ''
});

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const classes = computed(() => ({
  button: true,
  [props.size]: true,
  disabled: props.disabled,
  pill: props.pill,
  primary: props.type === ButtonType.primary,
  secondary: props.type === ButtonType.secondary,
  outline: props.type === ButtonType.outline,
  ghost: props.type === ButtonType.ghost
}));

const styles = computed(() => ({
  backgroundColor: props.backgroundColor
}));

const styleChangeColor = computed(() => ({
  color:
    props.color === 'primary' || props.color === 'secondary'
      ? 'black'
      : props.color
}));

const onClick = () => emit('click');
</script>

<style lang="scss" scoped>
.button {
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

.small {
  padding: 13px 11px;
  font-size: 14px;
  line-height: 16px;
  min-height: 40px;
}

.medium {
  min-height: 50px;
  padding: 16px 13px;
}

.large {
  min-height: 70px;
  padding: 5px 13px;
  font-size: 18px;
  line-height: 22px;
}

.primary {
  background-color: $BLUE-77A6FF;

  &:active {
    background-color: $BLUE-548CF6;
  }
  &.disabled:disabled {
    color: $GREY-757D8A;
    background-color: $WHITE-F5F5F5;
  }
}

.secondary {
  background-color: $WHITE-F8F9FD;
  color: $BLUE-77A6FF;

  &:active {
    background-color: $WHITE-ECF3FF;
  }
  &.disabled:disabled {
    color: $GREY-757D8A;
    background-color: $WHITE-F5F5F5;
  }
}

.outline {
  background-color: $TRANSPARENT;
  border: 1px solid $BLUE-9CBEFF;
  color: $GREY-282828;

  &:active {
    color: $WHITE;
    background-color: $BLUE-548CF6;
  }

  &.disabled:disabled {
    color: $GREY-757D8A;
    background-color: $WHITE-F5F5F5;
    border: 1px solid $WHITE-E7E7E7;
  }
}

.ghost {
  background-color: $TRANSPARENT;
  color: $GREY-282828;

  &:hover {
    background-color: $WHITE-F8F9FD;
  }

  &:active {
    color: $BLUE-77A6FF;
    background-color: $WHITE-ECF3FF;
  }
  &.disabled:disabled {
    background-color: $WHITE-E6E6E6;
  }
}

.pill {
  border-radius: 10px;
}
</style>
