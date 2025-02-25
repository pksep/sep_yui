<template>
  <div class="pie-chart">
    <div class="pie-chart-border" v-if="props.percent < 100">
      <div
        class="sector"
        :style="{ clipPath: calculateClipPath() }"
        style="background-color: #ffcc00"
      ></div>
    </div>
    <svg
      v-else
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.9987 0.332031C3.3187 0.332031 0.332031 3.3187 0.332031 6.9987C0.332031 10.6787 3.3187 13.6654 6.9987 13.6654C10.6787 13.6654 13.6654 10.6787 13.6654 6.9987C13.6654 3.3187 10.6787 0.332031 6.9987 0.332031ZM5.66536 10.332L2.33203 6.9987L3.27203 6.0587L5.66536 8.44536L10.7254 3.38536L11.6654 4.33203L5.66536 10.332Z"
        fill="#34C759"
      />
    </svg>
  </div>
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
  padding: 1.33px;
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
  border: 1.33px solid #ffcc00;
  padding: 1.33px;
}

.sector {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>
