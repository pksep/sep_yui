<template>
  <li
    :class="[
      'list-yui-kit__item',
      {
        'list-yui-kit__item--disabled': disabled,
        'list-yui-kit__item--active': active
      }
    ]"
    @click="handleClick"
    :data-testid="dataTestid"
  >
    <Icon :name="iconName" />
    <span class="list-yui-kit__item-text">{{ text }}</span>
    <slot></slot>
  </li>
</template>

<script lang="ts" setup>
import Icon from '@/components/Icon/Icon.vue';
import { MenuTypeEnum } from './enum/enum';
import type { IMenuItemProps } from './interface/interface';

const { dataTestid, iconName, text, menuType, disabled, active } =
  defineProps<IMenuItemProps>();

const emit = defineEmits<{
  click: [MenuTypeEnum];
}>();

const handleClick = () => {
  if (disabled) return;
  emit('click', menuType);
};
</script>

<style scoped>
.list-yui-kit__item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  border-radius: 5px;
  font-size: 14px;
  padding: 6px;
  line-height: 16px;

  &:hover {
    background-color: var(--blue9);
    color: var(--blue19);
    & svg.icon-yui-kit {
      color: var(--black);
    }
  }
}

.list-yui-kit__item--active {
  background-color: var(--blue9);
  color: var(--blue19);
}

.list-yui-kit__item--disabled,
.list-yui-kit__item--disabled:hover {
  color: var(--grey6);
  background-color: transparent;
  cursor: not-allowed;
  & svg.icon-yui-kit {
    color: var(--grey6);
  }
}
</style>
