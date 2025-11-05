<template>
  <li class="list-yui-kit__item" @click="handleClick" :data-testid="dataTestid">
    <Icon :name="iconName" />
    <span class="list-yui-kit__item-text">{{ text }}</span>
    <slot name="extra"></slot>
  </li>
</template>

<script lang="ts" setup>
import Icon from '@/components/Icon/Icon.vue';
import { MenuTypeEnum } from './enum/enum';
import { IconNameEnum } from '@/components/Icon/enum/enum';

interface Props {
  dataTestid: string;
  iconName: IconNameEnum;
  text: string;
  menuType: MenuTypeEnum;
}

const { dataTestid, iconName, text, menuType } = defineProps<Props>();

const emit = defineEmits<{
  click: [MenuTypeEnum];
}>();

function handleClick() {
  emit('click', menuType);
}
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

  &:hover,
  &:active {
    background-color: var(--blue9);
    color: var(--blue19);
  }
}

.toggle-yui-kit {
  margin: 0;
  margin-left: auto;
}
</style>
