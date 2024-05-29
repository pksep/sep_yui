div
<template>
  <div class="slider">
    <div class="slider__wrapper">
      <div class="slider__slides">
        <img
          v-if="state.file.type == 'img'"
          class="slider__image"
          @click="img => sizeImg(img.target)"
          :src="state.file.path"
        />
        <video
          v-if="state.file.type == 'movi'"
          @click="img => sizeImg(img.target)"
          controls="controls"
          class="slider__image"
        >
          <source :src="state.file.path" />
        </video>
      </div>
      <div class="slider__buttons">
        <button type="button" class="slider__buton--prev"></button>
        <button type="button" class="slider__buton--next"></button>
      </div>
    </div>
  </div>
</template>
<script setup></script>

<style lang="scss" scoped>
.slider {
}
</style>
