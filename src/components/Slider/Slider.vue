div
<template>
  <div class="slider">
    <div class="slider__wrapper" v-if="state.files.length">
      <button
        class="slider__button slider__button--prev"
        @click="e => prevSlide(e)"
        :disabled="state.disabledPrev"
      >
        <Icon name="leftBig" />
      </button>
      <div class="slider__slides">
        <img
          v-if="state.file.type == 'img'"
          @click="img => sizeImg(img.target)"
          :src="state.file.path"
        />
        <video
          v-if="state.file.type == 'movi'"
          @click="img => sizeImg(img.target)"
          controls="controls"
        >
          <source :src="state.file.path" />
        </video>
      </div>
      <button
        class="slider__button slider__button--next"
        @click="e => nextSlide(e)"
        :disabled="state.disabledNext"
      >
        <Icon name="rightBig" />
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { ISliderProps } from './interface';
import Icon from './../Icon/Icon';

const props = withDefaults(defineProps<ISliderProps>(), {
  items: []
});

const state = reactive({
  files: props.items.length ? props.items : [],
  file: {},
  currentIndex: 0,
  disabledPrev: true,
  disabledNext: false
});

const closeFullSizeEsc = (e: event) => {};

const sizeImg = img => {
  if (img.parentElement && img.parentElement !== null) {
    img.parentElement.classList.toggle('slider__full-size');
    if (img.parentElement.classList.contains('slider__full-size')) {
      img.parentElement.style = 'width: 100%';
      document.body.style = 'overflow: hidden';
    } else {
      document.body.style = 'overflow: auto';
    }
    img.classList.toggle('slider__slide-full-size');
  }
};

const prevSlide = e => {
  if (state.currentIndex > 0) {
    state.currentIndex--;
    state.disabledNext = false;
    if (state.currentIndex === 0) {
      state.disabledPrev = true;
    }
  }
  state.file = state.files[state.currentIndex];
};

const nextSlide = () => {
  if (state.currentIndex < state.files.length - 1) {
    state.currentIndex++;
    state.disabledPrev = false;
    if (state.currentIndex === state.files.length - 1) {
      state.disabledNext = true;
    }
  }
  state.file = state.files[state.currentIndex];
};

onMounted(() => {
  if (!props.items) return 0;
  state.files = props.items;
  state.file = state.files[state.currentIndex];
});
</script>

<style lang="scss" scoped>
.slider {
  width: 100%;
  height: 100%;

  &__wrapper {
    width: inherit;
    height: inherit;
    padding: 20px 18px;
    transition: 0.3s ease-in-out;
    display: flex;
    justify-content: space-between;
    gap: 20px;

    &:hover {
      background-color: $blue-F2F7FF;
      cursor: url('./search.svg'), auto;
    }
  }

  &__slides {
    background-color: $white;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    img,
    video {
      object-fit: contain;
      max-width: 100%;
      height: auto;
    }

    img.slider__slide-full-size,
    video.slider__slide-full-size {
      width: auto;
      height: 100%;
    }
  }

  &__button {
    width: 64px;
    background-color: $white;
    border: 1px solid $transparent;
    outline: none;
    border-radius: 10px;
    padding: 0 20px;
    transition: 0.3s ease-in-out;
    cursor: pointer;

    &:active {
      background-color: $blue-D6E4FF;
      color: $blue-77A6FF;
    }

    &:disabled {
      background-color: $white-F5F5F5;
      color: $grey-A6A3AD;
    }
  }

  &__full-size {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    background-color: black;
    z-index: 6;
  }

  &__slide-full-size {
    height: 100%;
    position: fixed;
  }
}
</style>
