<template>
  <div class="default" :lang="props.lang" :class="[props.bgColor, props.color]">
    <div :v-if="props.choosed === true"></div>
    <span>
      <slot name="left-icon" />
      <slot />
      {{ props.text }}
      <slot name="right-icon" />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { IProps } from '@/interface';

const props = withDefaults(defineProps<IProps>(), {
  type: 'default',
  text: 'все',
  choosed: false,
  bgColor: '',
  color: ''
});
</script>

<style lang="scss" scope>
.base {
  padding: 4px 5px;
  border-radius: 5px;
  font-family: 'Golos Text', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  max-width: min-content;

  span {
    padding: 5px 4px;
    border-radius: 5px;
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    align-items: center;

    img {
      width: 20px;
      object-fit: cover;
      display: block;
    }
  }
}

.default span {
  color: $light-grey-text;
  background-color: $light-grey-bg;
}

.removed span {
  color: $light-blue-text;
  background-color: $light-blue-bg;
}

.shipped span {
  color: $light-green-text;
  background-color: $light-green-bg;
}

.ordered span {
  color: $light-orange-text;
  background-color: $light-orange-bg;
}

.overdue span {
  color: $light-red-text;
  background-color: $light-red-bg;
}

.choosed {
  position: relative;
  padding-right: 20px;
  background-color: $light-blue-bg-9;

  &:before,
  &:after {
    @include pseudo(12px, 1px);
    background-color: $light-grey-text;
    top: 50%;
    right: 5px;
    border-radius: 5px;
  }

  &:before {
    transform: rotate(-45deg) translateY(-50%);
  }
  &:after {
    transform: rotate(45deg) translateY(-50%);
    right: 6px;
  }
}
</style>
