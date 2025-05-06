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
  'green-yui-kit': props.type === BadgesTypeEnum.green,
  'orange-yui-kit': props.type === BadgesTypeEnum.orange,
  'red-yui-kit': props.type === BadgesTypeEnum.red,
  'pink-yui-kit': props.type === BadgesTypeEnum.pink,
  'violet-yui-kit': props.type === BadgesTypeEnum.violet,
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
