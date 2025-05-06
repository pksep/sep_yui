<template>
  <BadgesUnstyled
    ref="badgesRef"
    @choose="isChoosen"
    :data-testid="props.dataTestid"
    :choosed="props.choosed"
    :disabled="props.disabled"
    :type="props.type"
    :text="props.text"
  />
</template>

<script lang="ts" setup>
import { reactive, useTemplateRef } from 'vue';
import BadgesUnstyled from './BadgesUnstyled.vue';
import type { IBadgesProps } from './interface/interface';
import { BadgesTypeEnum } from './enum/enum';

const props = withDefaults(defineProps<IBadgesProps>(), {
  type: BadgesTypeEnum.default,
  choosed: false,
  disabled: false,
  dataTestid: 'Badges'
});

const emit = defineEmits<{
  (e: 'choose', state: boolean, value?: string): void;
}>();

const badgesRef = useTemplateRef<typeof BadgesUnstyled>('badgesRef');

const state = reactive({
  choosed: props.choosed
});

const isChoosen = (value: boolean, text: string | undefined) => {
  if (!props.disabled) state.choosed = !value;
  emit('choose', state.choosed, text || props.text);
};

const isSpanOverflow = (): boolean | null => {
  if (!badgesRef.value) return null;
  return badgesRef.value.isSpanOverflow;
};

defineExpose({
  isSpanOverflow
});
</script>

<style scoped>
@import url('@/components/Badges/Badges.css');
</style>
