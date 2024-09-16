<template>
  <div class="dropdown-yui-kit">
    <span class="dropdown-yui-kit__current" @click="e => closeOpenList(e)">
      <span class="truncate-yui-kit">{{ state.choosedOption }}</span>
      <Icon :name="IconNameEnum.chevronDown" v-if="state.isOpened" />
      <Icon :name="IconNameEnum.chevronUp" v-if="!state.isOpened" />
    </span>
    <ul class="dropdown-yui-kit__list" v-if="state.isOpened">
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

const ACTIVE = 'active-yui-kit';

/**
 * Создаем проверки для классов, устанавливаем их элементам списка
 */
const classes = computed(() => ({
  'dropdown-yui-kit__item': true,
  'truncate-yui-kit': true
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
.dropdown-yui-kit {
  width: 100%;

  &__current {
    width: inherit;
    padding: 6px 5px;
    background-color: $WHITE;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid $TRANSPARENT;
    border-radius: 5px;
    cursor: pointer;

    &.active-yui-kit {
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

    &.active-yui-kit {
      background-color: $WHITE-ECF3FF;
      border-radius: 5px;
    }
  }
}

.truncate-yui-kit {
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
