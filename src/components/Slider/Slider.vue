<template>
  <div :style="props.width_main">
    <div class="slider_main">
      <div class="img_content" v-if="state.files.length">
        <div class="left_button" @click="swapMedia('l')">&#8592;</div>
        <div class="img_folder" :style="props.width" v-if="state.file">
          <img
            v-if="state.file.type == 'img'"
            class="img_slider"
            @click="img => sizeImg(img.target)"
            :src="state.file.path"
          />
          <video
            v-if="state.file.type == 'movi'"
            @click="img => sizeImg(img.target)"
            controls="controls"
            class="img_slider"
          >
            <source :src="state.file.path" />
          </video>
        </div>
        <div class="right_button" @click="swapMedia('r')">&#8594;</div>
      </div>
    </div>
  </div>
</template>
<script setup></script>

<style scoped></style>
