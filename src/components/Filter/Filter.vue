<template>
  <div :class="classes">
    <div :v-if="props.choosed === true"></div>
    <span>
      <slot name="left-icon" />
      <slot />
      <slot name="right-icon" />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { IFilterProps } from './interface';
import { FilterType } from './enum';
import { computed } from 'vue';

const props = withDefaults(defineProps<IFilterProps>(), {
  type: FilterType.default,
  choosed: false
});

const emit =
  defineEmits<{
    (e: 'click', id: number): void;
  }>();

const classes = computed(() => ({
  base: true,
  default: props.type === FilterType.default,
  blue: props.type === FilterType.blue,
  green: props.type === FilterType.green,
  orange: props.type === FilterType.orange,
  red: props.type === FilterType.red,
  choosed: props.choosed
}));
</script>

<style lang="scss" scope>
.base {
  padding: 4px 5px;
  border-radius: 5px;
  font-family: 'Golos Text', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  max-width: min-content;

  span {
    padding: 5px 4px;
    border-radius: 5px;
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    align-items: center;

    img {
      width: 20px;
      object-fit: cover;
      display: block;
    }
  }
}

.default span {
  color: $grey-757D8A;
  background-color: $grey-E2E2E2;
}

.blue span {
  color: $blue-5CBAFF;
  background-color: $blue-E0F2FF;
}

.green span {
  color: $green-0FBE3F;
  background-color: $green-D8F2DA;
}

.orange span {
  color: $orange-E8A702;
  background-color: $orange-FAEED5;
}

.red span {
  color: $red-FF6868;
  background-color: $red-FFE2E1;
}

.choosed {
  position: relative;
  padding-right: 20px;
  background-color: $blue-F2F7FF;

  &:before,
  &:after {
    @include pseudo(12px, 1px);
    background-color: $grey-757D8A;
    top: 50%;
    right: 5px;
    border-radius: 5px;
  }

  &:before {
    transform: rotate(-45deg) translateY(-50%);
  }
  &:after {
    transform: rotate(45deg) translateY(-50%);
    right: 6px;
  }
}
</style>
