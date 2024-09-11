<template>
  <div
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
    class="dnd-yui-kit"
  >
    <label
      for="docsFileSelected"
      class="dnd-yui-kit__label"
      :class="{ pressed: state.isPressed }"
      @click="state.isPressed = !state.isPressed"
    >
      <Icon name="paperClip" stroke-width="2" />
      <span class="dnd-yui-kit__span"> Кликните или перенесите файлы </span>
    </label>
    <input
      id="docsFileSelected"
      @change="addDock()"
      type="file"
      style="display: none"
      required
      :multiple="!props.IsOne"
      ref="fileRef"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { IDragAndDropProps } from './interface/interface.ts';
import Icon from "../Icon/Icon.vue";

const props = withDefaults(defineProps<IDragAndDropProps>(), {});

const emits = defineEmits(['unmount']);

const state = reactive({
  isPressed: false,
  docFiles: []
});

const fileRef = ref(null);

const onChange = () => {
  state.docFiles = [...fileRef.value?.files];
};

const dragover = (event: Event) => {
  event.preventDefault();
  const label = event.currentTarget?.children[0];
  if (!label.classList.contains('active')) label.classList.add('active');
};

const dragleave = (event: Event) => {
  event.currentTarget?.children[0].classList.remove('active');
};

const drop = async (event: Event) => {
  event.preventDefault();
  if (fileRef.value === null) fileRef.value.files = event.dataTransfer.files;
  await addDock();
  event.currentTarget?.children[0].classList.remove('active');
};

const addDock = async () => {
  state.isPressed = false;
  onChange();
  await emits('unmount', state.docFiles);
};

onMounted(() => {
  fileRef.value?.addEventListener('cancel', () => {
    state.isPressed = false;
  });
});
</script>

<style scoped>
div.dnd-yui-kit,
label.dnd-yui-kit__label {
  width: 100%;
  height: 100%;
  background: white;
}

div.dnd-yui-kit label.dnd-yui-kit__label {
  display: flex;
  background: white;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border-radius: none;
  font-size: 20px;
  color: #a6a3ad;
  svg {
    margin-right: 5px;
  }
}

div.dnd-yui-kit label.dnd-yui-kit__label {
  &:hover,
  &.pressed {
    border: 1.5px solid #77a6ff;
    background: #f9fbff;
  }
  &.active,
  &.pressed {
    & span.dnd-yui-kit__span,
    svg {
      color: #77a6ff;
    }
  }
  &.active {
    border: 2.5px dashed #77a6ff;
    background: #f9fbff;
  }
}
</style>
