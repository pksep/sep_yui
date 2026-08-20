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
      @click="handleRemove"
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
  (e: 'remove', value: string): void;
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
  'choosed-yui-kit': props.choosed || state.choosed,
  'disabled-yui-kit': props.type === BadgesTypeEnum.disabled
}));

/**
 * Создает проверку на выбор статуса
 */
const isChoosen = () => {
  emit('choose', state.choosed, props.text);
  if (!props.disabled) state.choosed = !state.choosed;
};

const handleRemove = () => {
  emit('remove', props.text);
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
  color: var(--chat-secondary);
  background-color: var(--border-table);
}

.light-blue-yui-kit span {
  color: var(--tag-blueLight-text);
  background-color: var(--tag-blueLight-bg);
}

.contrast-blue-yui-kit span {
  color: var(--white);
  background-color: var(--blue-dark-color);
}

.blue-yui-kit span {
  color: var(--tag-blue-text);
  background-color: var(--tag-blue-bg);
}

.green-yui-kit span {
  color: var(--tag-green-text);
  background-color: var(--tag-green-bg);
}

.orange-yui-kit span {
  color: var(--tag-orange-text);
  background-color: var(--tag-orange-bg);
}

.yellow-yui-kit span {
  color: var(--tag-orangeLight-text);
  background-color: var(--tag-orangeLight-bg);
}

.red-yui-kit span {
  color: var(--tag-red-text);
  background-color: var(--tag-redLight-bg);
}

.pink-yui-kit span {
  color: var(--tag-pink-text);
  background-color: var(--tag-pink-bg);
}

.violet-yui-kit span {
  color: var(--tag-purple-text);
  background-color: var(--tag-purple-bg);
}

.disabled-yui-kit span {
  color: var(--text-disabled);
  background-color: var(--action-disabled-bg);
}

.base-yui-kit.choosed-yui-kit {
  position: relative;
  background-color: var(--action-secondary-hover-bg);
  padding: 3px;
  display: flex;
  align-items: center;
  gap: 3px;

  & .close-icon {
    display: block;
    color: var(--text-secondary);
  }
}

.close-icon {
  display: none;
}
</style>
