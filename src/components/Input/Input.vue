<template>
    <input :placeholder="props.placeholder"/>
</template>

<script setup lang="ts">
import type { IInputProps } from "./interface/interface.ts"

const props = withDefaults(defineProps<IInputProps>(), {
    placeholder: "Введите текст"
}); 
</script>
