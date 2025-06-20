<template>
  <div :class="classes" @click="isChoosen" :data-testid="props.dataTestid">
    <span
      ref="spanRef"
      class="badges-text"
      :data-testid="`${props.dataTestid}-BadgesText`"
    >
      {{ props.text }}
    </span>
    <Icon
      class="close-icon"
      :width="10"
      :height="10"
      :data-testid="`${props.dataTestid}-Icon`"
      :name="IconNameEnum.closeTag"
      color="var(--grey6)"
    />
  </div>
</template>

<script lang="ts" setup>
import { IBadgesProps } from './interface/interface';
import { BadgesTypeEnum } from './enum/enum';
import { onMounted, computed, reactive, ref } from 'vue';
import { IconNameEnum } from '@/components/Icon/enum/enum.ts';
import Icon from '../Icon/Icon.vue';

const props = withDefaults(defineProps<IBadgesProps>(), {
  type: BadgesTypeEnum.default,
  choosed: false,
  disabled: false,
  dataTestid: 'Badges'
});

const emit = defineEmits<{
  (e: 'choose', state: boolean, value?: string): void;
}>();

const state = reactive({
  choosed: props.choosed
});
const spanRef = ref<HTMLElement | null>(null);

const getIsSpanOverflow = (): boolean => {
  if (spanRef.value && spanRef.value.scrollWidth > spanRef.value.clientWidth) {
    return true;
  }
  return false;
};

const isSpanOverflow = ref<boolean>(getIsSpanOverflow());

/**
 * Создает проверки классов для выбранного статуса.
 */

const classes = computed(() => ({
  'base-yui-kit': true,
  'default-yui-kit': props.type === BadgesTypeEnum.default,
  'blue-yui-kit': props.type === BadgesTypeEnum.blue,
  'light-blue-yui-kit': props.type === BadgesTypeEnum.lightBlue,
  'contrast-blue-yui-kit': props.type === BadgesTypeEnum.contrastBlue,
  'green-yui-kit': props.type === BadgesTypeEnum.green,
  'orange-yui-kit': props.type === BadgesTypeEnum.orange,
  'red-yui-kit': props.type === BadgesTypeEnum.red,
  'pink-yui-kit': props.type === BadgesTypeEnum.pink,
  'violet-yui-kit': props.type === BadgesTypeEnum.violet,
  'yellow-yui-kit': props.type === BadgesTypeEnum.yellow,
  'choosed-yui-kit': props.choosed || state.choosed
}));

/**
 * Создает проверку на выбор статуса
 */
const isChoosen = () => {
  emit('choose', state.choosed, props.text);
  if (!props.disabled) state.choosed = !state.choosed;
};

const resizeObserver = new ResizeObserver(() => {
  isSpanOverflow.value = getIsSpanOverflow();
});

defineExpose({
  isSpanOverflow
});

/**
 * Устанавливает выбранные статусы из пропсов
 */
onMounted(() => {
  if (spanRef.value) {
    resizeObserver.observe(spanRef.value);
  }
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

.contrast-blue-yui-kit span {
  color: var(--white);
  background-color: var(--blue22);
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

.yellow-yui-kit span {
  color: var(--orange12);
  background-color: var(--orange11);
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
  padding: 3px;
  display: flex;
  align-items: center;
  gap: 3px;

  & .close-icon {
    display: block;
  }
}

.close-icon {
  display: none;
}
</style>
