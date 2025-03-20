<template>
  <div class="choosen-mini-options">
    <div
      v-for="option in options"
      :key="option.key"
      class="choosen-mini-options__option"
    >
      <Badges
        :type="BadgesTypeEnum.blue"
        :text="isOptionsObjectWithHint(option) ? option.hint : option.value"
        class="choosen-mini-options__badges"
        disabled
      />
      <Icon
        :name="IconNameEnum.crossLarge"
        :width="10"
        :height="10"
        class="choosen-mini-options__cross"
        @click="removeElement(option.key)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Badges from '@/components/Badges/Badges.vue';
import { BadgesTypeEnum } from '@/components/Badges/enum/enum';
import { IconNameEnum } from '@/components/Icon/enum/enum';
import Icon from '@/components/Icon/Icon.vue';
import {
  IChoosenMiniOptionsEmits,
  IChoosenMiniOptionsProps
} from '@/components/Select/interface/interface';
import isOptionsObjectWithHint from '@/helpers/guards/is-options-object-with-hint';

defineOptions({
  name: 'ChoosenMiniOptions'
});

defineProps<IChoosenMiniOptionsProps>();
const emit = defineEmits<IChoosenMiniOptionsEmits>();

const removeElement = (key: string): void => {
  emit('remove', key);
};
</script>

<style scoped lang="scss">
.choosen-mini-options {
  padding: 5px;
  background-color: var(--white);
  box-shadow: 0 4px 9.8px 0 rgba(0, 0, 0, 0.11);

  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: flex-start;
  cursor: default;

  &__option {
    padding: 3px;
    display: flex;
    align-items: center;
    gap: 3px;

    border-radius: 5px;
    background-color: var(--blue9);
  }

  &__badges {
    display: flex;
  }

  &__cross {
    --width: 10px;
    width: var(--width);
    height: var(--width);
    transition: all 0.2s ease;

    color: var(--grey6);

    &:hover {
      color: var(--blue1);
    }
  }
}
</style>
