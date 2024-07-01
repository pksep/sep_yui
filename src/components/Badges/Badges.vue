<template>
  <div :class="classes" @click="isChoosen">
    <span class="badges-text">
      {{ props.text }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { IBadgesProps } from './interface/interface';
import { BadgesTypeEnum } from './enum/enum';
import { onMounted, computed, reactive } from 'vue';

const props = withDefaults(defineProps<IBadgesProps>(), {
  type: BadgesTypeEnum.default,
  choosed: false,
  disabled: false
});

const state = reactive({
  choosed: false
});

const emit = defineEmits<{
  (e: 'choose', state: boolean): void;
}>();

/**
 * Создает проверки классов для выбранного статуса.
 */

const classes = computed(() => ({
  base: true,
  default: props.type === BadgesTypeEnum.default,
  blue: props.type === BadgesTypeEnum.blue,
  green: props.type === BadgesTypeEnum.green,
  orange: props.type === BadgesTypeEnum.orange,
  red: props.type === BadgesTypeEnum.red,
  pink: props.type === BadgesTypeEnum.pink,
  choosed: state.choosed
}));

/**
 * Создает проверку на выбор статуса
 */
const isChoosen = () => {
  emit('choose', state.choosed);
  if (!props.disabled) state.choosed = !state.choosed;
};

onMounted(() => {
  state.choosed = props.choosed;
});
</script>

<style lang="scss" scoped>
.base {
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
  color: $GREY-757D8A;
  background-color: $GREY-E2E2E2;
}

.blue span {
  color: $BLUE-5CBAFF;
  background-color: $BLUE-E0F2FF;
}

.green span {
  color: $GREEN-0FBE3F;
  background-color: $GREEN-D8F2DA;
}

.orange span {
  color: $ORANGE-E8A702;
  background-color: $ORANGE-FAEED5;
}

.red span {
  color: $RED-FF6868;
  background-color: $RED-FFE2E1;
}

.pink span {
  color: $PINK-FE3A8B;
  background-color: $PINK-FEDAE9;
}

.base.choosed {
  position: relative;
  background-color: $BLUE-F2F7FF;
  padding: 3px 20px 3px 3px;

  &:before,
  &:after {
    @include pseudo(12px, 1px);
    background-color: $GREY-757D8A;
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
