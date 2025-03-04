<template>
  <div class="pie-chart" v-if="props.percent < 100">
    <div
      class="pie-chart-border"
      :style="{
        'border-color': props.percent < 50 ? '#ef9b8f' : '#ffcc00'
      }"
    >
      <div
        class="sector"
        :style="{
          clipPath: calculateClipPath(),
          'background-color': props.percent < 50 ? '#ef9b8f' : '#ffcc00'
        }"
      ></div>
    </div>
  </div>
  <svg
    v-else
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 1C4.136 1 1 4.136 1 8C1 11.864 4.136 15 8 15C11.864 15 15 11.864 15 8C15 4.136 11.864 1 8 1ZM8 13.6C4.906 13.6 2.4 11.094 2.4 8C2.4 4.906 4.906 2.4 8 2.4C11.094 2.4 13.6 4.906 13.6 8C13.6 11.094 11.094 13.6 8 13.6Z"
      fill="#3BC648"
    />
    <circle cx="8" cy="8" r="4" transform="rotate(-180 8 8)" fill="#3BC648" />
    <path
      d="M10 6L7.5 9.83935L6 8.5"
      stroke="white"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { ICircularProgressProps } from '@/components/CircularProgress/interface/interface.ts';

const props = withDefaults(defineProps<ICircularProgressProps>(), {});

const calculateClipPath = () => {
  const percent = Math.min(Math.max(props.percent, 0), 100);

  const angle = (percent / 100) * 360;

  if (percent <= 25) {
    return `polygon(50% 50%, 50% 0%, calc(50% + 50% * cos(${angle - 90}deg)) 0,calc(50% + 50% * cos(${angle - 90}deg)) calc(50% + 50% * sin(${angle - 90}deg)), 50% 50%)`;
  } else if (percent <= 50) {
    return `polygon(50% 50%, 50% 0%, 100% 0%, 100% calc(50% + 50% * sin(${angle - 90}deg)), calc(50% + 50% * cos(${angle - 90}deg)) calc(50% + 50% * sin(${angle - 90}deg)), 50% 50%)`;
  } else if (percent <= 75) {
    return `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%,
    calc(50% + 50% * cos(${angle - 90}deg)) 100%, calc(50% + 50% * cos(${angle - 90}deg)) calc(50% + 50% * sin(${angle - 90}deg)), 50% 50%)`;
  } else if (percent <= 100) {
    return `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%,0% 100%, 0% calc(50% + 50% * sin(${angle - 90}deg)), 50% 50%)`;
  }
};
</script>

<style lang="scss" scoped>
.pie-chart {
  padding: 1px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pie-chart-border {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid;
}

.sector {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>
