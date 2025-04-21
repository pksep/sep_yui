<template>
  <div
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
    class="dnd-yui-kit"
    :data-testid="props.dataTestid"
  >
    <label
      for="docsFileSelected"
      class="dnd-yui-kit__label"
      :class="{ 'is-pressed': state.isPressed }"
      @click="togglePress"
      :data-testid="`${props.dataTestid}-Label`"
    >
      <Icon
        :name="IconNameEnum.paperClip"
        stroke-width="2"
        :data-testid="`${props.dataTestid}-Icon`"
      />
      <span
        class="dnd-yui-kit__span"
        :data-testid="`${props.dataTestid}-Title`"
      >
        {{ props.title }}
      </span>
    </label>
    <input
      id="docsFileSelected"
      @change="onChange"
      @click="onClick"
      type="file"
      style="display: none"
      :data-testid="`${props.dataTestid}-Input`"
      required
      :multiple="!props.singleFileMode"
      ref="fileInputRef"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { IDragAndDropProps } from './interface/interface.ts';
import Icon from '../Icon/Icon.vue';
import { IconNameEnum } from '../Icon/enum/enum.ts';

const props = withDefaults(defineProps<IDragAndDropProps>(), {
  singleFileMode: false,
  title: 'Кликните или перенесите файлы'
});

const emits = defineEmits<{
  (event: 'fileDropped', fileList: FileList | null): void;
}>();

const state = reactive({
  isPressed: false
});

const fileInputRef = ref<HTMLInputElement | null>(null);

const onChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  addDock(target.files);
};

const onClick = (): void => {
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
};

const dragover = (event: Event): void => {
  event.preventDefault();
  const label = (event.currentTarget as HTMLElement)?.children[0];
  if (!label.classList.contains('active')) label.classList.add('active');
};

const dragleave = (event: Event) => {
  const target = event.currentTarget as HTMLElement;
  target.children[0].classList.remove('active');
};

const drop = (event: DragEvent): void => {
  event.preventDefault();

  addDock(event.dataTransfer?.files || null);

  const target = event.currentTarget as HTMLElement;
  target.children[0].classList.remove('active');
};

const togglePress = (): void => {
  state.isPressed = !state.isPressed;
};

const addDock = (files: FileList | null): void => {
  state.isPressed = false;
  emits('fileDropped', files);
};

onMounted(() => {
  fileInputRef.value?.addEventListener('cancel', () => {
    state.isPressed = false;
  });
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.dnd-yui-kit {
  --background: var(--white);
}

div.dnd-yui-kit,
label.dnd-yui-kit__label {
  width: 100%;
  height: 100%;
  background: var(--background);
  border-radius: 5px;
}

div.dnd-yui-kit label.dnd-yui-kit__label {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: $PRIMARY-FONT;
  font-size: 18px;
  font-weight: 700;
  color: #a6a3ad;
  svg {
    margin-right: 5px;
  }
}

div.dnd-yui-kit label.dnd-yui-kit__label {
  &:hover,
  &.is-pressed {
    border: 1.5px solid #77a6ff;
    background: #f9fbff;
  }
  &.active,
  &.is-pressed {
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
