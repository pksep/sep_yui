<template>
  <Dialog open width="185px" height="185px">
    <div class="loader">
      <svg
        :width="props.width"
        :height="props.height"
        viewBox="0 0 30 16"
        class="loader__icon"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="10%" cy="50%" rx="5.4" ry="5.4" fill="#77A6FF">
          <animate
            attributeName="cx"
            attributeType="XML"
            values="10%;90%;10%"
            begin="0s"
            :dur="props.animationDelay"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse cx="90%" cy="50%" rx="5.4" ry="5.4" fill="#407BFF">
          <animate
            attributeName="cx"
            attributeType="XML"
            values="90%;10%;90%"
            begin="0s"
            :dur="props.animationDelay"
            repeatCount="indefinite"
          />
        </ellipse>
      </svg>
      <span v-if="props.title" class="loader__span">
        {{ props.title }}
      </span>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
//import { reactive } from 'vue';
import Dialog from '../Dialog/Dialog.vue';
import type { ILoaderProps } from './interfaces/interfaces';

const props = withDefaults(defineProps<ILoaderProps>(), {
  width: '50',
  height: '15',
  title: 'Загрузка...',
  animationDelay: '1.5s'
});

/*
const state = reactive({
  percent: 0
});
*/
</script>

<style scoped>
.loader {
  display: grid;
  padding: 40px 25px;
  background: var(--white);
  justify-items: center;
  & .loader__icon {
    margin-top: 10px;
    margin-bottom: 27px;
  }
  & .loader__span {
    font-size: 18px;
    font-weight: bold;
    margin-top: 13px;
    color: var(--blue1);
  }
}

.dialog-yui-kit {
  --background: var(--white);
}
</style>
