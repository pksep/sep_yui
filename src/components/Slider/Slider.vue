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
<script setup>
import { onMounted, reactive } from 'vue';

const props = defineProps(['data', 'width', 'static', 'width_main']);

const state = reactive({
  files: [],
  file: {},
  fPoz: 0
});

const photoPreloadUrl = (input, cb, checkTypes = false) => {
  if (!input || !input.name) return 0;

  let typeFile = input.name
    .split('.')
    [input.name.split('.').length - 1].toLowerCase();
  if (typeFile.indexOf('_archive_v', 1) != -1)
    typeFile = typeFile.split('_archive_v')[0];

  let type;
  for (const imgType of FORMAT_IMG) {
    if (typeFile == imgType) type = 'img';
  }
  for (const movi of FORMAT_MOVI) {
    if (movi == typeFile) type = 'movi';
  }

  if (type != 'img' && type != 'movi')
    return cb({ type: 'doc', typename: typeFile });

  if (type == 'img' && checkTypes)
    return cb({ type: 'img', typename: typeFile });
  if (type == 'movi' && checkTypes) return cb({ type, typename: typeFile });
  if (type == 'movi') return cb({ type, typename: typeFile });

  const reader = new FileReader();
  reader.onload = function (e) {
    if (e && e.target && e.target.result)
      return cb({ type, url: e.target.result });
  };
  reader.readAsDataURL(input);
};

// const PATH_TO_SERVER = sessionStorage.getItem('devMode')
//   ? 'http://89.23.4.133:81/'
//   : `${process.env.VUE_APP_PATH_TO_SERVER}/`;
// const PATH_TO_SOCKET = 'http://localhost:3001';
// const PATH_TO_FILE_CDN = `${process.env.VUE_APP_PATH_TO_FILE_CDN}/`;

const swapMedia = (ate = 'r') => {
  if (isEmpty(state.file)) {
    state.fPoz = 0;
    state.file = state.files[state.fPoz];
    return 0;
  }
  if (ate == 'r' && state.fPoz + 1 <= state.files.length - 1) {
    state.fPoz++;
    state.file = state.files[state.fPoz];
  }
  if (ate == 'l' && state.fPoz - 1 >= 0) {
    state.fPoz--;
    state.file = state.files[state.fPoz];
  }
};

const sizeImg = img => {
  img.parentElement.classList.toggle('all_size_block');
  if (img.parentElement.classList.contains('all_size_block'))
    img.parentElement.style = 'width: 100%';
  else img.parentElement.style = props.width;
  img.classList.toggle('all_size_img');
};

onMounted(async () => {
  if (!props.data) return 0;

  // Принимает параметры name, path, (ban*)
  state.files = [];
  let ava;
  for (const file of props.data) {
    if (file.ban) continue;
    if (file?.name?.indexOf('_archive_', 1) !== -1) continue;
    if (file?.path?.indexOf('_archive_', 1) !== -1) continue;

    photoPreloadUrl(
      file,
      res => {
        if (res.type == 'movi' || res.type == 'img') {
          const path = props.static ? file.path : PATH_TO_FILE_CDN + file.path;

          state.files.push({
            path,
            type: res.type,
            name: file.name
          });

          if (file.ava) ava = file;
        }
      },
      true
    );
  }

  if (ava) {
    let findItem;
    state.files = state.files.filter(el => {
      if (el.name == ava.name) findItem = el;
      return el.name !== ava.name;
    });
    state.files.unshift(findItem);
  }

  swapMedia('l');
});
</script>

<style scoped>
.slider_main {
  width: 100%;
  height: 250px;
  margin-bottom: 5px;
  display: flex;
}
.img_slider {
  height: 250px;
  margin: 0 auto;
  left: 0;
  right: 0;
  max-width: 97%;
}
.left_button,
.right_button {
  font-weight: bold;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  height: 250px;
  width: 70px;
  background-color: rgb(168, 168, 168);
  z-index: 3;
  opacity: 0.5;
}
.left_button:hover,
.right_button:hover {
  background-color: rgb(53, 53, 53);
}
.img_content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.img_folder {
  position: absolute;
  width: 434px;
  display: flex;
}
.all_size_block {
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
.all_size_img {
  height: 100%;
  position: fixed;
}
</style>
