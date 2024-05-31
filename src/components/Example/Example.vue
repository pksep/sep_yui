<template>
  <div>
    <Checkbox v-model="selectedValues" value="option1" label="Option 1" />
    <Checkbox v-model="selectedValues" value="option2" label="Option 2" />
    <Checkbox v-model="selectedValues" value="option3" label="Option 3" />
    <p>Selected Values: {{ selectedValues }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Checkbox from './Checkbox.vue';

const selectedValues = ref<string[]>([]);
</script>
