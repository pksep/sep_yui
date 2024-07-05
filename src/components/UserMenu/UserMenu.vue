<template>
  <div class="menu-yui-kit">
    <div class="menu-yui-kit__wrapper">
      <div class="menu-yui-kit__avatar">
        <img :src="props.user.path" v-if="existUserPath" />
        <Icon :name="IconNameEnum.profile" v-else />
      </div>
      <div :class="classes" @click="toggleShow">
        <div class="menu-yui-kit__names">
          <p class="menu-yui-kit__name">{{ props.user.name }}</p>
          <p class="menu-yui-kit__role">{{ props.user.role }}</p>
        </div>
        <Button :type="ButtonTypeEnum.ghost" class="menu-yui-kit__button"
          ><Icon :name="nameIcon"
        /></Button>
      </div>
    </div>
    <div class="menu-yui-kit__list" v-if="state.isShow">
      <ul class="list-yui-ki">
        <li
          class="list-yui-ki__item"
          @click="choosedOptions(MenuTypeEnum.profile)"
        >
          <Icon :name="IconNameEnum.profile" />
          <span class="list-yui-ki__item-text">Профиль</span>
        </li>
        <li class="list-yui-ki__item">
          <Icon :name="iconTheme" />
          <span
            class="list-yui-ki__item-text"
            @click="choosedOptions(MenuTypeEnum.theme)"
            >Темная тема</span
          >

          <Toggle
            @themeChange="isCheckedTheme => toggleTheme(isCheckedTheme)"
            :checked="state.isCheckedTheme"
          />
        </li>
        <li
          class="list-yui-ki__item"
          @click="choosedOptions(MenuTypeEnum.options)"
        >
          <Icon :name="IconNameEnum.settings" />
          <span class="list-yui-ki__item-text">Настройки</span>
        </li>
        <li
          class="list-yui-ki__item"
          @click="choosedOptions(MenuTypeEnum.exit)"
        >
          <Icon :name="IconNameEnum.exit" />
          <span class="list-yui-ki__item-text">Выход</span>
        </li>
        <li
          class="list-yui-ki__item"
          @click="choosedOptions(MenuTypeEnum.help)"
        >
          <Icon :name="IconNameEnum.help" />
          <span class="list-yui-ki__item-text" :data-type="MenuTypeEnum.help"
            >Помощь</span
          >
        </li>
      </ul>

      <Switch
        v-if="props.languages?.items"
        :items="props.languages?.items"
        :defaultValue="props.languages?.defaultValue"
        @languageSwitch="handleLanguageSwitch"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { IMenuProps } from './interface/interface';
import Button from '@/components/Button/Button.vue';
import Icon from '@/components/Icon/Icon.vue';
import Toggle from '@/components/Toggle/Toggle.vue';
import Switch from '@/components/Switch/Switch.vue';
import { MenuTypeEnum } from '@/components/UserMenu/enum/enum';
import { ButtonTypeEnum } from '@/components/Button/enum/enum';
import { IconNameEnum } from '@/components/Icon/enum/enum';
import { IChangeSwitchEmit } from '@/components/Switch/interface/interface';

const props = withDefaults(defineProps<IMenuProps>(), {});

const state = reactive({
  isShow: false,
  option: '',
  isCheckedTheme: false
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
  state.isCheckedTheme ? IconNameEnum.dark : IconNameEnum.light
);

/**
 * @enum type:  MenuTypeEnum
 * @returns
 */

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
 * Проверяет наличие переданного пути к картинке.
 */
const existUserPath = computed(() => {
  return (
    props.user.path !== '' &&
    props.user.path !== null &&
    props.user.path !== undefined
  );
});

/**
 * Переключает видимость списка
 */
const toggleShow = () => {
  state.isShow = !state.isShow;
};

/**
 * @param isCheckedTheme:  boolean
 * @returns
 */

/**
 * Меняет тему, передает значение выбора родителю
 */
const toggleTheme = (isCheckedTheme: boolean) => {
  if (props.closeAfterClick) {
    state.isShow = false;
  }
  emit('themeChange', isCheckedTheme);
  state.isCheckedTheme = isCheckedTheme;
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

<style lang="scss" scoped>
.menu-yui-kit {
  display: flex;
  align-items: center;
  gap: 25px;
  position: relative;
  max-width: fit-content;

  &__wrapper {
    display: flex;
    align-items: center;
    gap: 9px;
    background-color: $WHITE;
  }

  &__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    background-color: $BLUE-F2F7FF;
    color: $GREY-262626;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      object-fit: cover;
      max-width: 100%;
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
    cursor: pointer;

    &.active-yui-kit {
      background-color: $BLUE-F2F7FF;
    }
  }

  &__list {
    padding: 15px 9px;
    width: 100%;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.11);
    background-color: $WHITE;
    color: $GREY-262626;
    border-radius: 5px;
    position: absolute;
    z-index: 10000;
    top: 50px;
  }

  &__name,
  &__role {
    margin: 0;
  }

  &__name {
    color: $GREY-121212;
  }

  &__role {
    color: $GREY-515151;
  }

  &__button {
    background-color: $TRANSPARENT;
    padding: 0;
    min-height: 40px;

    &:hover {
      background-color: $TRANSPARENT;
    }
  }
}

.list-yui-ki {
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
      background-color: $BLUE-F2F7FF;
      color: $BLUE-70A6FF;
    }
  }

  .toggle-yui-kit {
    margin: 0;
    margin-left: auto;
  }
}
</style>
