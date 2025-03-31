<template>
  <input
    ref="input"
    type="range"
    v-bind="props"
    class="range"
    v-model="model"
    @change="handleChange"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
import { IRangeProps } from '@/components/Range/interface/interface';
import changeStyleProperties from '@/helpers/change-style-properties';
import { onMounted, ref, watch } from 'vue';
import { IRangeEmit } from '@/components/Range/interface/interface';

defineOptions({
  name: 'Range'
});

const props = withDefaults(defineProps<IRangeProps>(), {
  min: 0,
  max: 100,
  step: 1,
  disabled: false
});

const emit = defineEmits<IRangeEmit>();

const model = defineModel<number>({
  default: 0
});

const input = ref<HTMLInputElement | null>(null);

watch(model, () => {
  changeProgress();
});

const getProcent = (): number => {
  const procent: number =
    ((model.value - props.min) / (props.max - props.min)) * 100;

  return procent;
};

const changeProgress = (): void => {
  requestAnimationFrame(() => {
    if (input.value) {
      changeStyleProperties(
        {
          '--progress': getProcent() + '%'
        },
        input.value
      );
    }
  });
};

const handleChange = (e: Event): void => {
  const target = e.target as HTMLInputElement;

  if (target) {
    emit('unmount-change', Number(target.value));
  }
};

const handleInput = (e: Event): void => {
  const target = e.target as HTMLInputElement;

  if (target) {
    emit('unmount-change', Number(target.value));
  }
};

onMounted(() => {
  changeProgress();
});
</script>

<style scoped lang="scss">
.range {
  width: 100%;
  --range-width-thumb: 20px;
  --range-track-color: var(--grey4);

  -webkit-appearance: none;
  appearance: none;
  height: 2px;

  border-radius: 2px;

  background: linear-gradient(
    90deg,
    var(--blue1) 0%,
    var(--blue1) var(--progress, 0%),
    var(--range-track-color) var(--progress, 0%),
    var(--range-track-color) 100%
  );

  cursor: pointer;

  &::-webkit-slider-thumb,
  &::-moz-range-thumb {
    -webkit-appearance: none;
    appearance: none;
    background-color: var(--blue1);
    border: 0px solid var(--blue1);
    border-radius: 50%;
    height: var(--range-width-thumb);
    width: var(--range-width-thumb);

    cursor: pointer;
  }
}
</style>
