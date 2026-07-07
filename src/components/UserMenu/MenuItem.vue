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
  transition: 0.3s ease;
  border-radius: 5px;
  font-size: 14px;
  padding: 6px;
  line-height: 16px;
}

.list-yui-kit__item--active,
.list-yui-kit__item:focus-visible,
.list-yui-kit__item:hover,
.list-yui-kit__item:active {
  background-color: var(--action-secondary-hover-bg);
  color: var(--text-primary);
}

.list-yui-kit__item--disabled,
.list-yui-kit__item--disabled:hover {
  color: var(--text-disabled);
  background-color: transparent;
  cursor: not-allowed;
  & svg.icon-yui-kit {
    color: var(--text-disabled);
  }
}
</style>
