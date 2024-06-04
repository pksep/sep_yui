<template>
  <div class="menu">
    <Icon name="notification" />
    <div class="menu__wrapper">
      <div class="menu__avatar">
        <img :src="props.path" />
      </div>
      <div :class="menu__heading">
        <div class="menu__wrapper">
          <p class="menu__name">{{ props.name }}</p>
          <p class="menu__role">{{ props.role }}</p>
        </div>
        <Button type="ghost" class="menu__button" @click="toggleShow"
          ><Icon :name="nameIcon"
        /></Button>
      </div>
    </div>
    <div class="menu__list">
      <ul class="list">
        <li class="list__item">
          <Icon name="profile" />
          <span class="list__item-text">Профиль</span>
        </li>
        <li class="list__item">
          <Icon name="dark" />
          <span class="list__item-text">Темная тема</span>
          <Toggle @change="" :checked="state.isCheckedTheme" />
          <Toggle
            checked
            @change="(checked: boolean) => console.log(checked)"
          />
        </li>
        <li class="list__item">
          <Icon name="settings" />
          <span class="list__item-text">Настройки</span>
        </li>
        <li class="list__item">
          <Icon name="exit" />
          <span class="list__item-text">Выход</span>
        </li>
        <li class="list__item">
          <Icon name="help" />
          <span class="list__item-text">Помощь</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, computed } from 'vue';
import { IMenuProps } from './interface';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import Toggle from '@/components/Toggle/Toggle';

const props = withDefaults(defineProps<IMenuProps>(), {
  name: '',
  role: '',
  path: ''
});
const state = reactive({
  isShow: false,
  isCheckedTheme: false
});

const classes = computed(() => {});

const nameIcon = computed(() => {
  return state.isShow ? 'chevronDown' : 'chevronUp';
});
const toggleShow = () => {
  state.isShow = !state.isShow;
};
const toggleTheme = () => {
  console.log(1123123);
  state.isCheckedTheme = !state.isCheckedTheme;
};
</script>

<style lang="scss" scope>
.menu {
  display: flex;
  align-items: center;
  gap: 10px;

  &__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;

    img {
      object-fit: cover;
      max-width: 100%;
      height: 100%;
    }
  }

  &__heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 15px;
    border-radius: 3px;

    &.active {
      background-color: $blue-F2F7FF;
    }
  }

  &__name,
  &__role {
    margin: 0;
  }

  &__name {
    color: $grey-121212;
  }

  &__role {
    color: $grey-515151;
  }

  &__button {
    background-color: $transparent;
    padding: 0;
  }
}
.list {
  list-style-type: none;

  &__item {
    display: flex;
    align-items: center;
  }

  .toggle {
    margin: 0;
    height: 16px;
  }
}
</style>
