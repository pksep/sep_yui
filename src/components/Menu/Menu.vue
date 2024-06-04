<template>
  <div class="menu">
    <Icon name="notification" />
    <div class="menu__wrapper">
      <div class="menu__avatar">
        <img :src="props.path" />
      </div>
      <div :class="classes">
        <div class="menu__names">
          <p class="menu__name">{{ props.name }}</p>
          <p class="menu__role">{{ props.role }}</p>
        </div>
        <Button type="ghost" class="menu__button" @click="toggleShow"
          ><Icon :name="nameIcon"
        /></Button>
      </div>
    </div>
    <div class="menu__list" v-if="state.isShow">
      <ul class="list">
        <li class="list__item">
          <Icon name="profile" />
          <span class="list__item-text">Профиль</span>
        </li>
        <li class="list__item">
          <Icon name="dark" />
          <span class="list__item-text">Темная тема</span>
          <Toggle
            @change="isChecked => (state.isCheckedTheme = isChecked)"
            :checked="state.isCheckedTheme"
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
      <Switch :items="['Ru', 'En']" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, computed } from 'vue';
import { IMenuProps } from './interface';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import Toggle from '@/components/Toggle/Toggle';
import Switch from '@/components/Switch/Switch';

const props = withDefaults(defineProps<IMenuProps>(), {
  name: '',
  role: '',
  path: ''
});
const state = reactive({
  isShow: false,
  isCheckedTheme: false
});

const classes = computed(() => {
  return {
    menu__heading: true,
    active: state.isShow
  };
});

const nameIcon = computed(() => {
  return state.isShow ? 'chevronDown' : 'chevronUp';
});
const toggleShow = () => {
  state.isShow = !state.isShow;
};
const toggleTheme = () => {
  state.isCheckedTheme = !state.isCheckedTheme;
};
</script>

<style lang="scss" scope>
.menu {
  display: flex;
  align-items: center;
  gap: 25px;
  position: relative;

  &__wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }

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
    gap: 25px;

    &.active {
      background-color: $blue-F2F7FF;
    }
  }

  &__list {
    padding: 15px;
    width: 261px;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.11);
    border-radius: 5px;
    position: absolute;
    z-index: 10000;
    top: 70px;

    .td-list {
      min-width: 100%;

      .td-item {
        flex-grow: 1;
      }
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

    &:hover {
      background-color: $transparent;
    }
  }
}
.list {
  list-style-type: none;
  padding: 0;
  margin: 0;

  &__item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
  }

  .toggle {
    margin: 0;
    margin-left: auto;
    height: 16px;
    width: 25px;
  }
}
</style>
