<template>
  <div class="color">
    <div class="color__wrapper">
      <div class="color__preview" :style="{ background: props.color }"></div>
      <div class="color__info">
        <p class="color__text">{{ props.text }}</p>
        <p
          class="color__text-color"
          v-if="props.text != 'Gradient1' && props.text != 'Gradient2'"
        >
          {{ props.color }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { IColorProps } from './interface/interface';

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
  padding: 10px;
  border-radius: 30px;
  width: 110px;

  &__wrapper {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__preview {
    width: 25px;
    height: 15px;
    border-radius: 14px;
    border: 1px solid $grey-DCDFED;
  }

  &__text-color {
    text-transform: uppercase;
    color: $grey-677074;
    font-size: 14px;
  }

  &__info {
    display: grid;
    gap: 5px;
    font-size: 16px;

    p {
      margin: 0;
    }
  }
}
</style>
