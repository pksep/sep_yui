<template>
  <div class="color">
    <div class="color__wrapper">
      <div
        class="color__preview"
        :style="{ backgroundColor: props.color }"
      ></div>
      <div class="color__info">
        <p class="color__text">{{ props.text }}</p>
        <p class="color__text-color">{{ props.color }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IColorProps } from './interface';

const props = withDefaults(defineProps<IColorProps>(), {
  text: '',
  color: ''
});
</script>
<style lang="scss">
.color {
  background-color: $white;
  -webkit-box-shadow: 0px 0.57px 1.79px 0px rgba(12, 20, 33, 1);
  -moz-box-shadow: 0px 0.57px 1.79px 0px rgba(12, 20, 33, 1);
  box-shadow: 0px 0.57px 1.79px 0px rgba(12, 20, 33, 1);
  padding: 24px;
  border-radius: 30px;
  width: fit-content;

  &__wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__preview {
    width: 96px;
    height: 48px;
    border-radius: 14px;
    border: 1px solid $grey-DCDFED;
  }

  &__text-color {
    text-transform: uppercase;
    color: $grey-677074;
  }

  &__info {
    p {
      margin: 0;
    }
  }
}
</style>
