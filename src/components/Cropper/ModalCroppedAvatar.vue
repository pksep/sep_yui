<template>
  <Modal
    v-bind="props"
    class="modal-cropped-avatar"
    :data-testid="`ModalCroppedAvatar-${id}`"
    @close="closeModal"
  >
    <div
      class="modal-cropped-avatar__content"
      :data-testid="`ModalCroppedAvatar-${id}-content`"
    >
      <div
        class="modal-cropped-avatar__title"
        :data-testid="`ModalCroppedAvatar-${id}-title`"
      >
        Изменение фото профиля
      </div>
      <div
        class="modal-cropped-avatar__main"
        :data-testid="`ModalCroppedAvatar-${id}-content-main`"
      >
        <div
          class="modal-cropped-avatar__cropped"
          :data-testid="`ModalCroppedAvatar-${id}-content-main-cropped`"
        >
          <BaseCropper
            ref="cropper"
            :image
            :max="maxScale"
            :min="minScale"
            :step="stepScale"
            class="modal-cropped-avatar__cropper"
            @unmount-scale="handleScaleCropped"
          />

          <div
            class="modal-cropped-avatar__tools"
            :data-testid="`ModalCroppedAvatar-${id}-content-tools`"
          >
            <Icon
              :name="IconNameEnum.minus"
              class="modal-cropped-avatar__icon"
              :data-testid="`ModalCroppedAvatar-${id}-content-iconMinus`"
              @click="handleMinusScale"
            />

            <Range
              :max="maxScale"
              :min="minScale"
              :step="stepScale"
              v-model="scale"
              :data-testid="`ModalCroppedAvatar-${id}-content-Range`"
            />

            <Icon
              :name="IconNameEnum.plus"
              class="modal-cropped-avatar__icon"
              :data-testid="`ModalCroppedAvatar-${id}-content-IconPlus`"
              @click="handlePlusScale"
            />
          </div>
        </div>

        <div
          class="modal-cropped-avatar__buttons"
          :data-testid="`ModalCroppedAvatar-${id}-content-buttons`"
        >
          <Button
            :type="ButtonTypeEnum.outline"
            class="modal-cropped-avatar__button"
            :data-testid="`ModalCroppedAvatar-${id}-content-ButtonCancel`"
            @click="closeModal"
          >
            Отменить
          </Button>

          <Button
            class="modal-cropped-avatar__button"
            :data-testid="`ModalCroppedAvatar-${id}-content-buttonSave`"
            @click="croppedImage"
          >
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import BaseCropper from './BaseCropper.vue';
import Modal from '../Modal/ModalAnimated.vue';
import useRange from './extenstions/use-range';
import getChangedNameFile from './extenstions/get-change-name-file';
import {
  onMounted,
  onUnmounted,
  reactive,
  useId,
  useTemplateRef,
  watch
} from 'vue';
import type { IModalCropperdAvatar } from './interface';
import { IconNameEnum } from '../Icon/enum/enum';
import Icon from '../Icon/Icon.vue';
import Button from '../Button/Button.vue';
import Range from '../Range/Range.vue';
import { ButtonTypeEnum } from '../Button/enum/enum';

defineOptions({
  name: 'ModalCroppedAvatar'
});

const props = withDefaults(defineProps<IModalCropperdAvatar>(), {
  width: '650px',
  height: 'auto',
  position: 'center'
});

const emit = defineEmits<{
  (e: 'unmount-close'): void;
  (e: 'unmount-save', file: File): void;
}>();

const {
  max: maxScale,
  min: minScale,
  step: stepScale,
  value: scale
} = useRange({
  defaultValue: 1,
  max: 3,
  min: 1,
  step: 0.1
});

const id = useId();
const cropper = useTemplateRef<InstanceType<typeof BaseCropper>>('cropper');

const state = reactive<{
  openModal: boolean;
}>({
  openModal: false
});

watch(scale, () => {
  if (cropper.value) cropper.value.setScale(scale.value);
});

const closeModal = () => {
  state.openModal = false;

  emit('unmount-close');
};

const handleScaleCropped = (value: number): void => {
  scale.value = value;
};

const handleMinusScale = (): void => {
  scale.value = scale.value - stepScale;
};

const handlePlusScale = (): void => {
  scale.value = scale.value + stepScale;
};

const croppedImage = () => {
  if (cropper.value) {
    const file = cropper.value.cropImage();
    if (file) {
      const fileName = file.name;

      const fileWithUuid = getChangedNameFile(file, fileName);

      emit('unmount-save', fileWithUuid);
      closeModal();
    }
  }
};

onUnmounted(() => {
  closeModal();
});

onMounted(() => {
  if (props.open === undefined) {
    state.openModal = props.open;
  }
});
</script>

<style scoped>
dialog.modal-cropped-avatar {
  --ease: inherit;
  position: fixed;

  width: max-content;
  margin-right: auto;

  display: flex;
  align-items: center;
  background-color: transparent;
}

.modal-cropped-avatar__content,
.modal-cropped-avatar__main,
.modal-cropped-avatar__cropped {
  display: flex;
  flex-direction: column;
}

.modal-cropped-avatar__content {
  padding: 30px;
  gap: 30px;

  background-color: var(--white);

  border-radius: 15px;
}

.modal-cropped-avatar__buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.modal-cropped-avatar__button {
  padding: 9px 48px;
  min-height: auto;
}

.modal-cropped-avatar__title {
  align-self: center;
  color: #181818;

  font-size: 20px;
  font-weight: 700;
}

.modal-cropped-avatar__main {
  gap: 40px;
}

.modal-cropped-avatar__cropped {
  align-items: center;
  gap: 20px;
}

.modal-cropped-avatar__cropper {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
}

.modal-cropped-avatar__tools {
  align-self: center;
  width: 83.7%;
  display: flex;
  align-items: center;
  gap: 20px;
}

.modal-cropped-avatar__icon {
  flex-shrink: 0;

  cursor: pointer;
}
</style>
