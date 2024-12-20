<template>
  <Dialog class="dialog" open no-close width="185px" height="185px">
    <div class="loader">
      <div class="loader__area">
        <div class="loader__circle loader__circle--light-blue"></div>
        <div class="loader__circle loader__circle--blue"></div>
      </div>
      <span v-if="props.title" class="loader__span">
        {{ props.title }}
      </span>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from '../Dialog/Dialog.vue';
import type { ILoaderProps } from './interfaces/interfaces';

const props = withDefaults(defineProps<ILoaderProps>(), {
  title: 'Загрузка...'
});
</script>

<style scoped>
.dialog {
  background: var(--white);
}

.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-block: 24px;
  position: relative;
}

.loader__area {
  position: relative;
  width: 65px;
  height: 65px;
}

.loader__circle {
  position: absolute;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  top: 27px;
  animation: animation 1.3145s infinite ease-in-out;
}

.loader__circle--light-blue {
  background-color: #77a6ff;
  animation-name: light-blue-circle;
  left: 16.25px;
}

.loader__circle--blue {
  background-color: #407bff;
  animation-name: blue-circle;
  left: 37.75px;
}

.loader__span {
  font-size: 18px;
  font-weight: bold;
  margin-top: 13px;
  color: var(--blue1);
}

@keyframes light-blue-circle {
  0% {
    left: 16.25px;
  }
  50% {
    left: 37.75px;
  }
  100% {
    left: 16.25px;
  }
}

@keyframes blue-circle {
  0% {
    left: 37.75px;
    z-index: -1;
  }
  50% {
    left: 16.25px;
    z-index: -1;
  }
  100% {
    left: 37.75px;
    z-index: 1;
  }
}
</style>
