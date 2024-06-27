<template>
  <div class="dropdown">
    <span class="dropdown__current" @click="e => closeOpenList(e)">
      <span class="truncate">{{ state.choosedOption }}</span>
      <Icon :name="IconNameEnum.chevronDown" v-if="state.isOpened" />
      <Icon :name="IconNameEnum.chevronUp" v-if="!state.isOpened" />
    </span>
    <ul class="dropdown__list" v-if="state.isOpened">
      <li
        :class="classes"
        v-for="option in options"
        @click="() => getChoosenOption(option)"
        :key="option"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, computed, ref } from 'vue';
import { IDropdownProps } from './interface/interface';
import { IconNameEnum } from '../Icon/enum/enum';
import Icon from './../Icon/Icon.vue';
import { useDropdownStore } from './../../stores/dropdown';

const dropdownStore = useDropdownStore();

const props = withDefaults(defineProps<IDropdownProps>(), {
  options: []
});

const emit = defineEmits<{
  (e: 'click', value: string): void;
}>();

const state = reactive({
  isOpened: false,
  choosedOption: props.options[0] || '',
  lengthOption: 0,
  activeOption: ACTIVE,
  getChooseOption: computed(() => {
    return dropdownStore.getChooseOption;
  })
});

const ACTIVE = 'active';

const classes = computed(() => ({
  'dropdown__item ': true,
  truncate: true,
  active: state.getChooseOption === [] ? false : state.getChooseOption
}));

const getChoosenOption = (value: string) => {
  state.choosedOption = value;
  emit('click', state.choosedOption);
  dropdownStore.setChooseOption(state.choosedOption);
  state.isOpened = false;
};

const closeOpenList = (e: MouseEvent) => {
  state.isOpened = !state.isOpened;

  const target = e.currentTarget as HTMLElement | null;
  if (target) {
    if (target.classList.contains(ACTIVE)) {
      target.classList.remove(ACTIVE);
    } else {
      target.classList.add(ACTIVE);
    }
  }
};

onMounted(() => {});
</script>
<style lang="scss" scoped>
.dropdown {
  width: 100%;

  &__current {
    width: inherit;
    padding: 6px 5px;
    background-color: $WHITE;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid $TRANSPARENT;
    margin-bottom: 5px;
    border-radius: 5px;
    cursor: pointer;

    &.active {
      border: 1px solid $BLUE-9CBEFF;
    }

    svg {
      flex-shrink: 0;
    }
  }

  &__list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    padding: 6px 5px;
    max-height: 120px;
    overflow-y: scroll;
    background-color: $WHITE;
    border-radius: 5px;
    border: 1px solid $BLUE-9CBEFF;
    display: grid;
    gap: 10px;
  }

  &__item {
    padding: 6px 5px;
    cursor: pointer;

    &:hover {
      background-color: $WHITE-ECF3FF;
      border-radius: 5px;
    }

    &.active {
      background-color: $WHITE-ECF3FF;
      border-radius: 5px;
    }
  }
}

.truncate {
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
