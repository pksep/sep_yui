<template>
  <fieldset
    class="input-yui-kit"
    :class="inputClass"
    @focusout="handleBlur"
    :data-testid="props.dataTestid"
  >
    <legend
      v-if="props.inputMessage"
      class="input-yui-kit__legend"
      :data-testid="`${props.dataTestid}-Legend`"
    >
      {{ props.inputMessage }}
      <sup
        class="input-yui-kit__star"
        v-if="props.required"
        :data-testid="`${props.dataTestid}-Legend-Star`"
        >*</sup
      >
    </legend>
    <textarea
      v-model="state.inputElement"
      @focus="handleFocus"
      @input="handleInput"
      :data-testid="`${props.dataTestid}-Textarea`"
      class="input-yui-kit__input"
      :placeholder="props.placeholder"
      :required="props.required"
      :maxlength="props.maxlength"
      :readonly="props.readonly"
    />
  </fieldset>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import type { ITextareaProps } from './interface/interface';
import { TextareaTypeEnum } from '@/components/Textarea/enum';

const props = withDefaults(defineProps<ITextareaProps>(), {
  required: false,
  modelValue: '',
  readonly: false,
  dataTestid: 'Textarea',
  type: TextareaTypeEnum.default
});

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const state = reactive({
  isPressed: false,
  inputElement: props.modelValue
});

const inputClass = computed(() => [
  {
    pressed: state.isPressed,
    readonly: props.readonly,
    [props.type]: true
  }
]);

const handleInput = (): void => {
  emits('update:modelValue', state.inputElement);
};

const handleFocus = (): void => {
  if (!props.readonly) {
    state.isPressed = true;
  }
};

const handleBlur = (): void => {
  state.isPressed = false;
};

watch(
  () => props.modelValue,
  newValue => {
    state.inputElement = newValue;
  }
);
</script>

<style lang="scss" scoped>
fieldset.input-yui-kit {
  height: auto;
  margin-inline: 0;
  padding: 0;
}
fieldset.input-yui-kit .input-yui-kit__input {
  resize: none;
  height: 96px;
  padding: 10px 15px;
  width: calc(100% + 3px);
}

fieldset.input-yui-kit.readonly::before,
fieldset.input-yui-kit.readonly:hover::before {
  border: none;
}
</style>
