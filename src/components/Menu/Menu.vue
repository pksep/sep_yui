<template>
  <div class="menu">
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
          <span
            class="list__item-text"
            :data-type="MenuType.profile"
            @click="e => choosedOptions(e)"
            >Профиль</span
          >
        </li>
        <li class="list__item">
          <Icon name="dark" />
          <span
            class="list__item-text"
            :data-type="MenuType.theme"
            @click="e => choosedOptions(e)"
            >Темная тема</span
          >
          <Toggle @change="e => toggleTheme(e)" />
        </li>
        <li class="list__item">
          <Icon name="settings" />
          <span
            class="list__item-text"
            :data-type="MenuType.options"
            @click="e => choosedOptions(e)"
            >Настройки</span
          >
        </li>
        <li class="list__item">
          <Icon name="exit" />
          <span
            class="list__item-text"
            :data-type="MenuType.exit"
            @click="e => choosedOptions(e)"
            >Выход</span
          >
        </li>
        <li class="list__item">
          <Icon name="help" />
          <span
            class="list__item-text"
            :data-type="MenuType.help"
            @click="e => choosedOptions(e)"
            >Помощь</span
          >
        </li>
      </ul>
      <Switch :items="['Ru', 'En']" @click="handleLanguageSwitch" />
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
import { MenuType } from '@/components/Menu/enum';

const props = withDefaults(defineProps<IMenuProps>(), {});

const state = reactive({
  isShow: false,
  option: ''
});

interface IToggle {
  value?: string;
  type: boolean;
}

interface ISwitch {
  value?: string;
  type: string;
}

const emit = defineEmits<{
  (
    e: 'click',
    event: {
      type: MenuType;
    }
  ): void;
  (e: 'themeChange', event: IToggle): void;
  (e: 'languageSwitch', event: ISwitch): void;
  (e: 'email', event: string): void;
}>();

const choosedOptions = (e: MouseEvent): void => {
  const target = e.target as HTMLElement;
  state.option = target.dataset.type;
  emit('click', { type: state.option });
};

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

const toggleTheme = e => {
  emit('themeChange', { type: e });
};

const handleLanguageSwitch = (language: string) => {
  emit('languageSwitch', { type: language.target.textContent });
};
</script>

<style lang="scss" scope>
.menu {
  display: flex;
  align-items: center;
  gap: 25px;
  position: relative;
  max-width: fit-content;

  &__wrapper {
    display: flex;
    align-items: center;
    gap: 9px;
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
    padding: 0 13px 0 15px;
    border-radius: 3px;
    gap: 25px;
    min-height: 40px;

    &.active {
      background-color: $blue-F2F7FF;
    }
  }

  &__list {
    padding: 15px 9px;
    width: 100%;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.11);
    background-color: $white;
    border-radius: 5px;
    position: absolute;
    z-index: 10000;
    top: 50px;

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
    min-height: 40px;

    &:hover {
      background-color: $transparent;
    }
  }
}
.list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
  margin-bottom: 10px;

  &__item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    cursor: pointer;
    padding: 6px 3px;
    transition: 0.3s ease-in-out;
    border-radius: 5px;

    &:hover,
    &:active {
      background-color: $blue-F2F7FF;
      color: $blue-70A6FF;
    }
  }

  .toggle {
    margin: 0;
    margin-left: auto;
    height: 16px;
    width: 25px;
  }
}
</style>
