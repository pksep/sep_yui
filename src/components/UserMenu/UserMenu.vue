<template>
  <div class="menu-yui-kit" :data-testid="props.dataTestid">
    <div class="menu-yui-kit__wrapper">
      <Popover
        :open="state.isShow"
        @close="state.isShow = false"
        placement="bottom-start"
        :data-testid="`${props.dataTestid}-Popover`"
      >
        <template #trigger>
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
        </template>
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
        />
      </Popover>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { IMenuProps } from './interface/interface';
import Button from '@/components/Button/Button.vue';
import Icon from '@/components/Icon/Icon.vue';
import { MenuTypeEnum } from '@/components/UserMenu/enum/enum';
import { ButtonTypeEnum } from '@/components/Button/enum/enum';
import { IconNameEnum } from '@/components/Icon/enum/enum';
import { IChangeSwitchEmit } from '@/components/Switch/interface/interface';
import Avatar from '../Avatar/Avatar.vue';
import Popover from '../Popover/Popover.vue';
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
 * @enum type:  MenuTypeEnum
 * @returns
 */

/**
 * Закрытие меню при клике вне его
 */

function choosedOptions(type: MenuTypeEnum) {
  emit('click', type);
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

/**
 * @param isBlackTheme:  boolean
 * @returns
 */

/**
 * Меняет тему, передает значение выбора родителю
 */
function toggleThemeChange(isBlackTheme: boolean) {
  if (props.closeAfterClick) state.isShow = false;

  emit('themeChange', isBlackTheme);
  state.isBlackTheme = isBlackTheme;
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
function handleLanguageSwitch(object: IChangeSwitchEmit) {
  if (props.closeAfterClick) {
    state.isShow = false;
  }
  emit('languageSwitch', object);
}
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

    &.active-yui-kit {
      background-color: var(--blue9);
    }
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
}

.menu-yui-kit__avatar {
  --size-avatar: 40px;
  & :deep(img.user__image) {
    height: var(--size-avatar);
    width: var(--size-avatar);
  }
}
</style>
