<template>
  <div :class="classes" @click="isChoosen">
    <span>
      {{ props.text }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { IBadgesProps } from './interface';
import { BadgesType } from './enum';
import { onMounted, computed, reactive } from 'vue';

const props = withDefaults(defineProps<IBadgesProps>(), {
  type: BadgesType.default,
  choosed: false,
  disabled: false
});

const state = reactive({
  choosed: false
});

const emit = defineEmits<{
  (e: 'choose', state: boolean): void;
}>();

const isChoosen = () => {
  emit('choose', state.choosed);
  if (!props.disabled) state.choosed = !state.choosed;
};

const classes = computed(() => ({
  base: true,
  default: props.type === BadgesType.default,
  blue: props.type === BadgesType.blue,
  green: props.type === BadgesType.green,
  orange: props.type === BadgesType.orange,
  red: props.type === BadgesType.red,
  pink: props.type === BadgesType.pink,
  choosed: state.choosed
}));

onMounted(() => {
  state.choosed = props.choosed;
});
</script>

<style lang="scss" scope>
.base {
  padding: 4px 5px;
  border-radius: 5px;
  max-width: fit-content;
  cursor: pointer;
  font-size: 12px;

  span {
    padding: 2px 6px 3px 6px;
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

.pink span {
  color: $pink-FE3A8B;
  background-color: $pink-FEDAE9;
}

.choosed {
  position: relative;
  background-color: $blue-F2F7FF;
  padding: 3px 20px 3px 3px;

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
