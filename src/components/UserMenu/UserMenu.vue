<template>
  <div class="menu-yui-kit" ref="menuRef" :data-testid="props.dataTestid">
    <div class="menu-yui-kit__wrapper">
      <Avatar
        class="menu-yui-kit__avatar"
        :is-icon="!props.user.avatar"
        :url="props.user.avatar"
        alt="user-avatar"
        :data-testid="`${props.dataTestid}-Avatar`"
      />
      <div :class="classes" @click="toggleShow">
        <div class="menu-yui-kit__names">
          <p class="menu-yui-kit__name">{{ props.user.name }}</p>
          <p class="menu-yui-kit__role">{{ props.user.role }}</p>
        </div>
        <Button
          :type="ButtonTypeEnum.ghost"
          class="menu-yui-kit__button"
          :data-testid="`${props.dataTestid}-Toggle`"
        >
          <Icon class="menu-yui-kit__button-icon" :name="nameIcon"
        /></Button>
      </div>
    </div>
    <div class="menu-yui-kit__list" v-if="state.isShow">
      <ul class="list-yui-kit">
        <li
          class="list-yui-kit__item"
          @click="choosedOptions(MenuTypeEnum.profile)"
          :data-testid="`${props.dataTestid}-Profile-Item`"
        >
          <Icon :name="IconNameEnum.profile" />
          <span class="list-yui-kit__item-text">Профиль</span>
        </li>
        <li
          class="list-yui-kit__item"
          :data-testid="`${props.dataTestid}-Theme-Item`"
        >
          <Icon :name="iconTheme" />
          <span
            class="list-yui-kit__item-text"
            @click="choosedOptions(MenuTypeEnum.theme)"
            >Темная тема</span
          >

          <Toggle
            :type="ToggleEnum.small"
            @change="toggleThemeChange"
            :checked="state.isBlackTheme"
            :data-testid="`${props.dataTestid}-Theme-Toggle`"
          />
        </li>
        <li
          class="list-yui-kit__item"
          @click="choosedOptions(MenuTypeEnum.options)"
          :data-testid="`${props.dataTestid}-Settings-Item`"
        >
          <Icon :name="IconNameEnum.settings" />
          <span class="list-yui-kit__item-text">Настройки</span>
        </li>
        <li
          class="list-yui-kit__item"
          @click="choosedOptions(MenuTypeEnum.exit)"
          :data-testid="`${props.dataTestid}-Exit-Item`"
        >
          <Icon :name="IconNameEnum.exit" />
          <span class="list-yui-kit__item-text">Выход</span>
        </li>
        <li
          class="list-yui-kit__item"
          @click="choosedOptions(MenuTypeEnum.help)"
          :data-testid="`${props.dataTestid}-Help-Item`"
        >
          <Icon :name="IconNameEnum.help" />
          <span class="list-yui-kit__item-text" :data-type="MenuTypeEnum.help"
            >Помощь</span
          >
        </li>
      </ul>

      <Switch
        v-if="props.languages?.items"
        :items="props.languages?.items"
        :defaultValue="props.languages?.defaultValue"
        @change="handleLanguageSwitch"
        :data-testid="`${props.dataTestid}-Language-Switch`"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { IMenuProps } from './interface/interface';
import Button from '@/components/Button/Button.vue';
import Icon from '@/components/Icon/Icon.vue';
import Toggle from '@/components/Toggle/Toggle.vue';
import Switch from '@/components/Switch/Switch.vue';
import { MenuTypeEnum } from '@/components/UserMenu/enum/enum';
import { ButtonTypeEnum } from '@/components/Button/enum/enum';
import { IconNameEnum } from '@/components/Icon/enum/enum';
import { IChangeSwitchEmit } from '@/components/Switch/interface/interface';
import { ToggleEnum } from '@/components/Toggle/enums/enums';
import Avatar from '../Avatar/Avatar.vue';

const props = withDefaults(defineProps<IMenuProps>(), {
  dataTestid: 'UserMenu'
});

const state = reactive({
  isShow: false,
  option: '',
  isBlackTheme: props.isBlackTheme ?? false
});

const emit = defineEmits<{
  (e: 'click', type: MenuTypeEnum): void;
  (e: 'themeChange', value: boolean): void;
  (e: 'languageSwitch', value: IChangeSwitchEmit): void;
}>();

/**
 * Высчитывает классы для всего Меню
 */
const classes = computed(() => ({
  'menu-yui-kit__heading': true,
  'active-yui-kit': state.isShow
}));

/**
 * Высчитывает наименование иконки, показать темную или светлую иконку темы. Меняет иконку.
 */
const iconTheme = computed(() =>
  state.isBlackTheme ? IconNameEnum.dark : IconNameEnum.light
);

/**
 * @enum type:  MenuTypeEnum
 * @returns
 */

/**
 * Закрытие меню при клике вне его
 */

const menuRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent): void => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    state.isShow = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

/**
 * Высчитывает какую опцию выбрали
 */
const choosedOptions = (type: MenuTypeEnum): void => {
  if (type !== undefined) {
    state.option = type;
    emit('click', type);
    if (props.closeAfterClick) {
      state.isShow = false;
    }
  } else {
    console.error('Option type is undefined');
  }
};

/**
 * Высчитывает наименование иконки, показать список, скрыть. Меняет иконку.
 */
const nameIcon = computed(() => {
  return state.isShow ? IconNameEnum.chevronUp : IconNameEnum.chevronDown;
});

/**
 * Переключает видимость списка
 */
const toggleShow = () => {
  state.isShow = !state.isShow;
};

/**
 * @param isBlackTheme:  boolean
 * @returns
 */

/**
 * Меняет тему, передает значение выбора родителю
 */
const toggleThemeChange = (isBlackTheme: boolean): void => {
  if (props.closeAfterClick) state.isShow = false;

  emit('themeChange', isBlackTheme);
  state.isBlackTheme = isBlackTheme;
};

/**
 * @param object:  {
      index: number,
      value: string
    }
 * @returns
 */

/**
 * Меняет язык, передает значение родителю
 */
const handleLanguageSwitch = (object: IChangeSwitchEmit) => {
  if (props.closeAfterClick) {
    state.isShow = false;
  }
  emit('languageSwitch', object);
};
</script>

<style scoped>
.menu-yui-kit {
  display: flex;
  align-items: center;
  gap: 25px;
  position: relative;
  max-width: fit-content;
  min-width: 212px;

  & .menu-yui-kit__wrapper {
    display: flex;
    align-items: center;
    gap: 9px;
    background-color: var(--white);
    width: 100%;
  }

  & .menu-yui-kit__names {
    max-width: 94px;
  }

  & .menu-yui-kit__heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px 3px 15px;
    border-radius: 3px;
    gap: 20px;
    cursor: pointer;
    width: 100%;
    height: 40px;

    &.active-yui-kit {
      background-color: var(--blue9);
    }
  }

  & .menu-yui-kit__list {
    padding: 15px 9px;
    width: 100%;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.11);
    background-color: var(--white);
    color: var(--grey8);
    border-radius: 5px;
    position: absolute;
    z-index: 10000;
    top: 50px;
  }

  & .menu-yui-kit__name,
  & .menu-yui-kit__role {
    margin: 0;
  }

  & .menu-yui-kit__name {
    color: var(--grey9);
    margin-bottom: 2px;
    font-size: 14px;
    line-height: 16px;
  }

  & .menu-yui-kit__role {
    color: var(--grey10);
    font-size: 12px;
    line-height: 14px;
  }

  & .menu-yui-kit__button {
    background-color: transparent;
    padding: 0;
    margin-right: 0;
    height: inherit;
    & .menu-yui-kit__button-icon {
      width: 16px;
      height: 16px;
    }

    &:hover {
      background-color: transparent;
    }
  }
}

.list-yui-kit {
  list-style-type: none;
  padding: 0;
  margin: 0 0 23px 0;
  display: grid;
  gap: 8px;

  & .list-yui-kit__item {
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

  & .toggle-yui-kit {
    margin: 0;
    margin-left: auto;
  }
}

.menu-yui-kit__avatar {
  --size-avatar: 40px;
  & :deep(img.user__image) {
    height: 40px;
    width: 40px;
  }
}

.switch-yui-kit-list {
  background-color: var(--blue9);
  padding: 2px;
}

.switch-yui-kit-item {
  height: 26px;
}
</style>
