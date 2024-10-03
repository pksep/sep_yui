<template>
  <div class="dropdown-yui-kit" :style="{ width: props.width }">
    <span class="dropdown-yui-kit__current" @click="e => closeOpenList(e)">
      <span class="truncate-yui-kit">{{ state.choosedOption }}</span>
      <Icon :name="IconNameEnum.chevronUp" v-if="state.isOpened" />
      <Icon :name="IconNameEnum.chevronDown" v-if="!state.isOpened" />
    </span>
    <ul
      class="dropdown-yui-kit__list"
      v-if="state.isOpened"
      :style="{ width: props.width }"
    >
      <Scroll
        :style="{ width: props.width }"
        :railStyle="{
          y: {
            right: '6px'
          }
        }"
      >
        <li
          :class="[classes, { active: option === state.choosedOption }]"
          v-for="option in props.options"
          @click="() => getChoosenOption(option)"
          :key="option"
        >
          {{ option }}
        </li>
      </Scroll>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { reactive, computed, watch } from 'vue';
import { IDropdownProps } from './interface/interface';
import { IconNameEnum } from '../Icon/enum/enum';
import Scroll from '../Scrollbar/Scrollbar.vue';
import Icon from './../Icon/Icon.vue';

const props = withDefaults(defineProps<IDropdownProps>(), {});

const state = reactive({
  isOpened: false,
  choosedOption: props.defaultOption || props.options[0] || '',
  lengthOption: 0,
  width: '100%'
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
 * Получает знание выбранного элемента списка и передает по событию родителю. Закрывает список.
 */
const getChoosenOption = (value: string) => {
  state.choosedOption = value;
  emit('click', state.choosedOption);
  state.isOpened = false;
};

watch(
  () => props.defaultOption,
  () => {
    if (props.defaultOption) {
      state.choosedOption = props.defaultOption;
    }
  },
  { immediate: true }
);

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
    padding: 6px 10px;
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
    margin-top: 5px;
    list-style-type: none;
    display: grid;
    padding: 0;
    background-color: $WHITE;
    border: 1px solid $BLUE-9CBEFF;
    max-height: 120px;
    border-radius: 5px;
    position: absolute;
    overflow: auto;
    overflow-x: hidden;
    z-index: 2222222;
  }
  &__list > div {
    display: grid;
    max-height: 120px;
    gap: 10px;
  }

  &__item {
    &:first-child {
      margin-top: 5px;
    }
    padding: 5px 10px;
    cursor: pointer;
    &:nth-last-child(3) {
      margin-bottom: 10px;
    }

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
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-yui-kit__list {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  & ::-webkit-scrollbar {
    display: none; /* Скрывает скроллбар в Chrome, Safari и Opera */
  }
}
</style>

<style>
.ps__thumb-x,
.ps__rail-x {
  display: none !important;
}
</style>
