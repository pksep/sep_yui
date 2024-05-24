<template>
  <svg class="icon" :width="props.width" :height="props.height">
    <use :href="`#${props.type}`"></use>
  </svg>

  <svg width="0" height="0" class="hidden">
    <symbol
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      id="help"
    >
      <path
        d="M11.5 19.5C15.6421 19.5 19 16.1421 19 12C19 7.85786 15.6421 4.5 11.5 4.5C7.35786 4.5 4 7.85786 4 12C4 16.1421 7.35786 19.5 11.5 19.5Z"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M11.5 9V12"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M11.5 15H11.508"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </symbol>
    <symbol
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      id="notification"
    >
      <path
        d="M11.7199 21.1649C12.2013 21.1631 12.6628 20.9711 13.0031 20.6306C13.3436 20.2901 13.5357 19.8288 13.5374 19.3474H9.90235C9.90404 19.8288 10.0962 20.2901 10.4367 20.6306C10.777 20.9711 11.2385 21.1631 11.7199 21.1649ZM18.2665 16.3565C17.8556 15.9477 17.624 15.3921 17.6225 14.8123V10.7184C17.6225 9.48322 17.2346 8.27925 16.5136 7.2764C15.7925 6.27339 14.7746 5.52242 13.6037 5.12914C13.4529 5.08036 13.3215 4.98513 13.228 4.85727C13.1344 4.72926 13.0838 4.57509 13.0832 4.4166C13.0883 4.05534 12.9532 3.70609 12.7065 3.44223C12.4598 3.17821 12.1205 3.01987 11.7597 3.00065C11.3915 2.98927 11.0346 3.12759 10.7702 3.38407C10.5058 3.64055 10.3567 3.9932 10.3568 4.36151V4.41659C10.3562 4.57507 10.3056 4.72923 10.212 4.85726C10.1185 4.98512 9.9871 5.08036 9.83632 5.12913C8.66544 5.52239 7.64754 6.27338 6.92639 7.27639C6.2054 8.27925 5.81755 9.48317 5.81755 10.7184V14.8056C5.81601 15.3854 5.58445 15.9408 5.17348 16.3496L4.6419 16.8812C4.23357 17.2917 4.00307 17.8462 4 18.4251H19.44C19.4369 17.8462 19.2064 17.2917 18.7981 16.8812L18.2665 16.3565Z"
        fill="#121212"
      ></path>
    </symbol>
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { SizesEnum } from '../../common/sizes';
import { IButtonProps, IIconPorps } from './interface';
import { ButtonType } from './enum';

const props = withDefaults(defineProps<IIconPorps>(), {
  width: 24,
  height: 24
});
</script>
