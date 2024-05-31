<template>
  <div>
    <input
      type="checkbox"
      :value="value"
      :checked="isChecked"
      @change="updateChecked"
    />
    <label>{{ label }}</label>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    required: true
  },
  value: {
    type: [String, Number, Boolean],
    required: true
  },
  label: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(['update:modelValue']);

const isChecked = computed(() => props.modelValue.includes(props.value));

const updateChecked = (event: Event) => {
  const checkbox = event.target as HTMLInputElement;
  const newValue = [...props.modelValue];

  console.log(...props.modelValue, 'props.modelValue.type');

  if (checkbox.checked) {
    newValue.push(props.value);
  } else {
    const index = newValue.indexOf(props.value);
    if (index > -1) {
      newValue.splice(index, 1);
      console.log(newValue, 'newValue');
    }
  }

  emit('update:modelValue', newValue);
};
</script>
