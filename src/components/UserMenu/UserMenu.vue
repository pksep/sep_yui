<template>
  <div class="menu-yui-kit" :data-testid="props.dataTestid">
    <div class="menu-yui-kit__wrapper" v-on-click-outside.bubble="closeShow">
      <div :class="classes" @click="toggleShow">
        <Avatar
          class="menu-yui-kit__avatar"
          :url="props.user?.avatar"
          alt="user-avatar"
          :data-testid="`${props.dataTestid}-Avatar`"
        />
        <div class="menu-yui-kit__names">
          <p class="menu-yui-kit__name">{{ props.user?.name }}</p>
          <p class="menu-yui-kit__role">{{ props.user?.role }}</p>
        </div>
        <Button
          :type="ButtonTypeEnum.ghost"
          class="menu-yui-kit__button"
          :data-testid="`${props.dataTestid}-Toggle`"
        >
          <Icon class="menu-yui-kit__button-icon" :name="nameIcon" />
        </Button>
      </div>
      <div v-if="state.isShow" class="menu-yui-kit__dropdown">
        <UserMenuList
          :data-testid="`${props.dataTestid}-List`"
          :is-black-theme="state.isBlackTheme"
          :menu-open="state.isShow"
          :languages="props.languages"
          :categories="props.categories"
          :texts="props.texts"
          @click="choosedOptions"
          @theme-change="toggleThemeChange"
          @language-switch="handleLanguageSwitch"
          @unmount-qr-auth="handleQrAuth"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import { IMenuProps } from './interface/interface';
import Button from '@/components/Button/Button.vue';
import Icon from '@/components/Icon/Icon.vue';
import { MenuTypeEnum } from '@/components/UserMenu/enum/enum';
import { ButtonTypeEnum } from '@/components/Button/enum/enum';
import { IconNameEnum } from '@/components/Icon/enum/enum';
import { IChangeSwitchEmit } from '@/components/Switch/interface/interface';
import Avatar from '../Avatar/Avatar.vue';
import UserMenuList from './UserMenuList.vue';

const props = withDefaults(defineProps<IMenuProps>(), {
  dataTestid: 'UserMenu'
});

const state = reactive({
  isShow: false,
  isBlackTheme: props.isBlackTheme ?? false
});

const emit = defineEmits<{
  (e: 'click', type: MenuTypeEnum): void;
  (e: 'unmount-qr-auth'): void;
  (e: 'theme-change', value: boolean): void;
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
 * @enum type:  MenuTypeEnum
 * @returns
 */

/**
 * Закрытие меню при клике вне его
 */

function choosedOptions(type: MenuTypeEnum) {
  emit('click', type);

  if (type === MenuTypeEnum.theme) return;
  if (props.closeAfterClick) state.isShow = false;
}

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

const closeShow = () => {
  state.isShow = false;
};

/**
 * @param isBlackTheme:  boolean
 * @returns
 */

/**
 * Меняет тему, передает значение выбора родителю
 */
function toggleThemeChange() {
  state.isBlackTheme = !state.isBlackTheme;
  emit('theme-change', state.isBlackTheme);
}

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

const handleQrAuth = () => {
  if (props.closeAfterClick) {
    state.isShow = false;
  }
  emit('unmount-qr-auth');
};
</script>

<style scoped>
.menu-yui-kit {
  display: flex;
  align-items: center;
  gap: 25px;

  & .menu-yui-kit__wrapper {
    display: flex;
    align-items: center;
    gap: 9px;
    background-color: var(--white);
    position: relative;
    width: 100%;
  }

  & .menu-yui-kit__heading {
    display: flex;
    align-items: center;
    padding: 6px;
    border-radius: 3px;
    gap: 10px;
    cursor: pointer;
    width: 100%;
    height: 52px;
    width: 211px;

    &:hover,
    &.active-yui-kit {
      background-color: var(--primary-hover-light-color);
    }
  }

  & .menu-yui-kit__name,
  & .menu-yui-kit__role {
    margin: 0;
  }

  & .menu-yui-kit__name {
    color: var(--text-color);
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
    margin-left: auto;
    height: inherit;
    & .menu-yui-kit__button-icon {
      font-size: 16px;
      stroke-width: 2px;
    }

    &:hover {
      background-color: transparent;
    }
  }

  & .menu-yui-kit__dropdown {
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    z-index: 20;
    overflow: hidden;
    width: max-content;
    border-radius: 5px;
    background-color: var(--white);
    box-shadow: 0px 4px 9.8px 0px #0000000d;
  }
}

.menu-yui-kit__avatar {
  --size-avatar: 40px;
  & :deep(img.user__image) {
    height: var(--size-avatar);
    width: var(--size-avatar);
  }
}
</style>
