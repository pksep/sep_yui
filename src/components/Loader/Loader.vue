<template>
  <div class="loader" :data-testid="props.dataTestid">
    <div class="loader__area" :data-testid="`${props.dataTestid}-Area`">
      <div
        class="loader__circle loader__circle--light-blue"
        :data-testid="`${props.dataTestid}-Loader-LightBlue1`"
      ></div>
      <div
        class="loader__circle loader__circle--blue"
        :data-testid="`${props.dataTestid}-Loader-LightBlue2`"
      ></div>
    </div>
    <span
      v-if="props.title"
      class="loader__span"
      :data-testid="`${props.dataTestid}-Loader-Title`"
    >
      {{ props.title }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { ILoaderProps } from './interfaces/interfaces';

const props = withDefaults(defineProps<ILoaderProps>(), {
  title: 'Загрузка...',
  dataTestid: 'Loader'
});
</script>

<style scoped>
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
  background-color: var(--primary-color);
  animation-name: light-blue-circle;
  transform: translateX(16.25px);
  z-index: 1;
}

.loader__circle--blue {
  background-color: var(--link-color);
  animation-name: blue-circle;
  transform: translateX(37.75px);
  z-index: 1;
}

.loader__span {
  font-size: 18px;
  font-weight: bold;
  margin-top: 13px;
  color: var(--primary-color);
}

@keyframes light-blue-circle {
  0% {
    transform: translateX(16.25px);
  }
  50% {
    transform: translateX(37.75px);
  }
  100% {
    transform: translateX(16.25px);
  }
}

@keyframes blue-circle {
  0% {
    transform: translateX(37.75px);
    z-index: 0;
  }
  50% {
    transform: translateX(16.25px);
    z-index: 0;
  }
  100% {
    transform: translateX(37.75px);
    z-index: 1;
  }
}
</style>
