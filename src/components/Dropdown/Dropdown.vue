<template>
  <div class="dropdown-ui-kit">
    <span class="dropdown-ui-kit__current" @click="e => closeOpenList(e)">
      <span class="truncate-ui-kit">{{ state.choosedOption }}</span>
      <Icon :name="IconNameEnum.chevronDown" v-if="state.isOpened" />
      <Icon :name="IconNameEnum.chevronUp" v-if="!state.isOpened" />
    </span>
    <ul class="dropdown-ui-kit__list" v-if="state.isOpened">
      <li
        :class="[classes, { active: option === state.choosedOption }]"
        v-for="option in props.options"
        @click="() => getChoosenOption(option)"
        :key="option"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { reactive, computed } from 'vue';
import { IDropdownProps } from './interface/interface';
import { IconNameEnum } from '../Icon/enum/enum';
import Icon from './../Icon/Icon.vue';

const props = withDefaults(defineProps<IDropdownProps>(), {});

const state = reactive({
  isOpened: false,
  choosedOption: props.options[0] || '',
  lengthOption: 0
});

const emit = defineEmits<{
  (e: 'click', value: string): void;
}>();

const ACTIVE = 'active-ui-kit';

/**
 * Создаем проверки для классов, устанавливаем их элементам списка
 */
const classes = computed(() => ({
  'dropdown-ui-kit__item': true,
  'truncate-ui-kit': true
}));

/**
 * @param value: string
 * @returns
 */

/**
 * Получает знаение выбранного элемента списка и передает по событию родителю. Закрывает список.
 */
const getChoosenOption = (value: string) => {
  state.choosedOption = value;
  emit('click', state.choosedOption);
  state.isOpened = false;
};

/**
 * @event e: MouseEvent ( click )
 * @returns
 */

/**
 * Закрывает открытый список, и также открывает его.
 */
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
</script>
<style lang="scss" scoped>
.dropdown-ui-kit {
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

    &.active-ui-kit {
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
    position: absolute;
    z-index: 2222222;
  }

  &__item {
    padding: 6px 5px;
    cursor: pointer;

    &:hover {
      background-color: $WHITE-ECF3FF;
      border-radius: 5px;
    }

    &.active-ui-kit {
      background-color: $WHITE-ECF3FF;
      border-radius: 5px;
    }
  }
}

.truncate-ui-kit {
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
