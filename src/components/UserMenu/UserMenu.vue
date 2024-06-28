<template>
  <div class="menu">
    <div class="menu__wrapper">
      <div class="menu__avatar">
        <img :src="props.user.path" />
      </div>
      <div :class="classes">
        <div class="menu__names">
          <p class="menu__name">{{ props.user.name }}</p>
          <p class="menu__role">{{ props.user.role }}</p>
        </div>
        <Button
          :type="ButtonType.ghost"
          class="menu__button"
          @click="toggleShow"
          ><Icon :name="nameIcon"
        /></Button>
      </div>
    </div>
    <div class="menu__list" v-if="state.isShow">
      <ul class="list">
        <li class="list__item">
          <span
            class="list__item-text"
            @click="choosedOptions(MenuType.profile)"
            >Профиль</span
          >
        </li>
        <li class="list__item">
          <Icon :name="IconNameEnum.dark" />
          <span class="list__item-text" @click="choosedOptions(MenuType.theme)"
            >Темная тема</span
          >
          <Toggle
            @themeChange="isChecked => toggleTheme(isChecked)"
            :checked="state.isChecked"
          />
        </li>
        <li class="list__item">
          <Icon :name="IconNameEnum.settings" />
          <span
            class="list__item-text"
            @click="choosedOptions(MenuType.options)"
            >Настройки</span
          >
        </li>
        <li class="list__item">
          <Icon :name="IconNameEnum.exit" />
          <span class="list__item-text" @click="choosedOptions(MenuType.exit)"
            >Выход</span
          >
        </li>
        <li class="list__item">
          <Icon :name="IconNameEnum.help" />
          <span
            class="list__item-text"
            :data-type="MenuType.help"
            @click="choosedOptions(MenuType.help)"
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
import { MenuType } from '@/components/UserMenu/enum/enum';
import { ButtonType } from '@/components/Button/enum/enum';
import { IconNameEnum } from '@/components/Icon/enum/enum';
import { IChangeSwitchEmit } from '@/components/Switch/interface/interface';

const props = withDefaults(defineProps<IMenuProps>(), {});

const state = reactive({
  isShow: false,
  option: '',
  isChecked: false
});

const emit = defineEmits<{
  (e: 'click', type: MenuType): void;
  (e: 'themeChange', value: boolean): void;
  (e: 'languageSwitch', value: IChangeSwitchEmit): void;
}>();

const classes = computed(() => ({
  menu__heading: true,
  active: state.isShow
}));

const choosedOptions = (type: MenuType): void => {
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
// const choosedOptions = (e: MouseEvent, type: MenuType): void => {
//   const target = e.target as HTMLElement;
//   const optionType = target.dataset.type;
//   console.log(target.dataset.type, 'TYPE');

//   if (optionType !== undefined) {
//     state.option = type;
//     emit('click', state.option);
//     if (props.closeAfterClick) {
//       state.isShow = false;
//     }
//   } else {
//     console.error('Option type is undefined');
//   }
// };

const nameIcon = computed(() => {
  return state.isShow ? IconNameEnum.chevronDown : IconNameEnum.chevronUp;
});

const toggleShow = () => {
  state.isShow = !state.isShow;
};

const toggleTheme = (isChecked: boolean) => {
  emit('themeChange', isChecked);
  state.isChecked = isChecked;
};

const handleLanguageSwitch = (event: IChangeSwitchEmit) => {
  emit('languageSwitch', event);
};
</script>

<style lang="scss" scoped>
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
      background-color: $BLUE-F2F7FF;
    }
  }

  &__list {
    padding: 15px 9px;
    width: 100%;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.11);
    background-color: $WHITE;
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
      background-color: $BLUE-F2F7FF;
      color: $BLUE-70A6FF;
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
