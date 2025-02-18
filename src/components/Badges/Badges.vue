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
  'base-yui-kit': true,
  'default-yui-kit': props.type === BadgesTypeEnum.default,
  'blue-yui-kit': props.type === BadgesTypeEnum.blue,
  'light-blue-yui-kit': props.type === BadgesTypeEnum.lightBlue,
  'green-yui-kit': props.type === BadgesTypeEnum.green,
  'orange-yui-kit': props.type === BadgesTypeEnum.orange,
  'red-yui-kit': props.type === BadgesTypeEnum.red,
  'pink-yui-kit': props.type === BadgesTypeEnum.pink,
  'violet-yui-kit': props.type === BadgesTypeEnum.violet,
  'choosed-yui-kit': state.choosed
}));

/**
 * Создает проверку на выбор статуса
 */
const isChoosen = () => {
  emit('choose', state.choosed);
  if (!props.disabled) state.choosed = !state.choosed;
};

/**
 * Устанавливает выбранные статусы из пропсов
 */
onMounted(() => {
  state.choosed = props.choosed;
});
</script>

<style lang="scss" scoped>
.base-yui-kit {
  border-radius: 5px;
  max-width: fit-content;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;

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

.default-yui-kit span {
  color: var(--grey6);
  background-color: var(--grey3);
}

.light-blue-yui-kit span {
  color: var(--blue14);
  background-color: var(--blue13);
}

.blue-yui-kit span {
  color: var(--blue4);
  background-color: var(--blue12);
}

.green-yui-kit span {
  color: var(--green2);
  background-color: var(--green1);
}

.orange-yui-kit span {
  color: var(--orange8);
  background-color: var(--orange7);
}

.red-yui-kit span {
  color: var(--red4);
  background-color: var(--red3);
}

.pink-yui-kit span {
  color: var(--pink2);
  background-color: var(--pink1);
}

.violet-yui-kit span {
  color: var(--violet2);
  background-color: var(--violet3);
}

.base-yui-kit.choosed-yui-kit {
  position: relative;
  background-color: var(--blue9);
  padding: 3px 20px 3px 3px;

  &:before,
  &:after {
    @include pseudo(12px, 1px);
    background-color: var(--grey6);
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
