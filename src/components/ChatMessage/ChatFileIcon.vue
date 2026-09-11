<template>
  <Transition name="upload-icon-state" mode="out-in">
    <svg
      v-if="!props.isLoaded"
      key="loading"
      :class="{ 'message-content__media-loading__icon': !hasPercent }"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="20"
        :fill="
          props.isMeSender
            ? 'var(--surface-input-primary, white)'
            : 'var(--action-primary-bg, #77A6FF)'
        "
      />
      <template v-if="!hasPercent">
        <path
          d="M34 24C34 29.5228 29.5228 34 24 34C18.4772 34 14 29.5228 14 24C14 18.4772 18.4772 14 24 14C29.5228 14 34 18.4772 34 24ZM16.2 24C16.2 28.3078 19.6922 31.8 24 31.8C28.3078 31.8 31.8 28.3078 31.8 24C31.8 19.6922 28.3078 16.2 24 16.2C19.6922 16.2 16.2 19.6922 16.2 24Z"
          :fill="props.backgroundColor"
        />
        <path
          d="M24 15.1C24 14.4925 23.506 13.9937 22.9022 14.0604C21.3127 14.236 19.7828 14.7909 18.4443 15.6853C16.7998 16.7841 15.5181 18.3459 14.7612 20.1732C14.0043 22.0004 13.8063 24.0111 14.1921 25.9509C14.578 27.8907 15.5304 29.6725 16.9289 31.0711C18.3275 32.4696 20.1093 33.422 22.0491 33.8079C23.9889 34.1937 25.9996 33.9957 27.8268 33.2388C29.6541 32.4819 31.2159 31.2002 32.3147 29.5557C33.2091 28.2172 33.764 26.6873 33.9396 25.0978C34.0063 24.494 33.5075 24 32.9 24C32.2925 24 31.808 24.4949 31.7226 25.0964C31.5588 26.2499 31.1379 27.357 30.4855 28.3334C29.6284 29.6162 28.4102 30.6159 26.9849 31.2063C25.5597 31.7966 23.9913 31.9511 22.4783 31.6501C20.9652 31.3492 19.5754 30.6063 18.4846 29.5154C17.3937 28.4246 16.6508 27.0348 16.3499 25.5217C16.0489 24.0087 16.2034 22.4403 16.7937 21.0151C17.3841 19.5898 18.3838 18.3716 19.6666 17.5145C20.643 16.8621 21.7501 16.4412 22.9036 16.2774C23.5051 16.192 24 15.7075 24 15.1Z"
          fill="var(--action-primary-bg, #77A6FF)"
        />
      </template>
      <template v-else>
        <circle
          cx="24"
          cy="24"
          r="10"
          :stroke="props.backgroundColor"
          stroke-width="2.5"
        />
        <circle
          class="message-content__media-loading__progress"
          cx="24"
          cy="24"
          r="10"
          stroke="var(--action-primary-bg, #77A6FF)"
          stroke-width="2.5"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          transform="rotate(-90 24 24)"
        />
      </template>
    </svg>

    <svg
      v-else-if="props.icon === 'download'"
      key="download"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :data-testid="`${props.dataTestid}-FileIcon-Svg`"
    >
      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="20"
        :fill="
          props.isMeSender
            ? 'var(--surface-input-primary, white)'
            : 'var(--action-primary-bg, #77A6FF)'
        "
      />
      <path
        d="M24 14C24.8284 14 25.5 14.6716 25.5 15.5V25.3787L28.9393 21.9393C29.5251 21.3536 30.4749 21.3536 31.0607 21.9393C31.6464 22.5251 31.6464 23.4749 31.0607 24.0607L25.0607 30.0607C24.4749 30.6464 23.5251 30.6464 22.9393 30.0607L16.9393 24.0607C16.3536 23.4749 16.3536 22.5251 16.9393 21.9393C17.5251 21.3536 18.4749 21.3536 19.0607 21.9393L22.5 25.3787V15.5C22.5 14.6716 23.1716 14 24 14Z"
        :fill="
          !props.isMeSender
            ? 'var(--surface-input-primary, white)'
            : 'var(--action-primary-bg, #77A6FF)'
        "
      />
      <path
        d="M17.5 32.5C17.5 31.6716 18.1716 31 19 31H29C29.8284 31 30.5 31.6716 30.5 32.5C30.5 33.3284 29.8284 34 29 34H19C18.1716 34 17.5 33.3284 17.5 32.5Z"
        :fill="
          !props.isMeSender
            ? 'var(--surface-input-primary, white)'
            : 'var(--action-primary-bg, #77A6FF)'
        "
      />
    </svg>

    <svg
      v-else
      key="file"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      :data-testid="`${props.dataTestid}-FileIcon-Svg`"
    >
      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="20"
        :fill="
          props.isMeSender
            ? 'var(--surface-input-primary, white)'
            : 'var(--action-primary-bg, #77A6FF)'
        "
      />
      <path
        d="M25.7578 14.001H26.5332C27.0439 14.001 27.5325 14.2103 27.8848 14.5801L33.1133 20.0703C33.6824 20.668 34 21.4618 34 22.2871V28.5996C34 31.5819 31.5819 34 28.5996 34H19.4004C16.4181 34 14 31.5819 14 28.5996V19.4004C14 16.4181 16.4181 14 19.4004 14H25.7393C25.7454 14.0001 25.7516 14.001 25.7578 14.001ZM26.3047 17.6367C25.4543 16.7864 24.0003 17.3884 24 18.5908V22.6484C24 23.3939 24.6042 23.9988 25.3496 23.999H29.4072C30.6098 23.999 31.2124 22.5448 30.3623 21.6943L26.3047 17.6367Z"
        :fill="
          !props.isMeSender
            ? 'var(--surface-input-primary, white)'
            : 'var(--action-primary-bg, #77A6FF)'
        "
      />
    </svg>
  </Transition>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useSmoothedProgress } from './useSmoothedProgress';

const props = withDefaults(
  defineProps<{
    isMeSender: boolean;
    dataTestid?: string;
    isLoaded?: boolean;
    percent?: number | null;
    backgroundColor?: string;
    icon?: 'file' | 'download';
  }>(),
  {
    dataTestid: () => 'FileIcon',
    isLoaded: false,
    percent: null,
    backgroundColor: '#E7E7E7',
    icon: 'file'
  }
);

const radius = 10;
const circumference = 2 * Math.PI * radius;

const displayedProgress = useSmoothedProgress(() => props.percent);

const normalizedPercent = computed(() => {
  if (displayedProgress.value === null) {
    return null;
  }

  return displayedProgress.value;
});

const hasPercent = computed(() => normalizedPercent.value !== null);

const dashOffset = computed(() => {
  const percent = normalizedPercent.value ?? 0;
  return circumference * (1 - percent / 100);
});
</script>

<style scoped>
.upload-icon-state-enter-active,
.upload-icon-state-leave-active {
  transition:
    opacity 160ms ease,
    scale 180ms cubic-bezier(0.22, 1, 0.36, 1);
}

.upload-icon-state-enter-from,
.upload-icon-state-leave-to {
  opacity: 0;
  scale: 0.84;
}
</style>
