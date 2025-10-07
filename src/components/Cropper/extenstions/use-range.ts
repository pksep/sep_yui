import { ref, watch } from 'vue';

export interface IOptionsRange {
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

const useRange = (options?: IOptionsRange) => {
  const value = ref<number>(options?.defaultValue || 1);
  const min: number = options?.min || 1;
  const max: number = options?.max || 100;
  const step: number = options?.step || 0.1;

  watch(value, newValue => {
    value.value = getCorrectValue(newValue);
  });

  const getCorrectValue = (value: number): number => {
    return Math.max(min, Math.min(value, max));
  };

  return {
    value,
    min,
    max,
    step,
    getCorrectValue
  };
};

export default useRange;
