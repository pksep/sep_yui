<template>
  <div class="menu-yui-kit__list">
    <ul class="list-yui-kit">
      <MenuItem
        v-for="menuType in props.categories"
        :key="menuType"
        :data-testid="`${props.dataTestid}-${getTestIdSuffix(menuType)}-Item`"
        :iconName="getIconForType(menuType)"
        :text="props.texts?.[menuType] ?? getDefaultText(menuType)"
        :menuType="menuType"
        :disabled="isDisabled(menuType)"
        :active="activeItem === menuType"
        @click="() => choosedOptions(menuType)"
      >
        <Toggle
          v-if="menuType === MenuTypeEnum.theme"
          disabled
          @change="handleThemeSwitch"
        />
      </MenuItem>
    </ul>

    <Switch
      v-if="props.languages?.items"
      :items="props.languages?.items"
      :default-value="props.languages?.defaultValue"
      @change="handleLanguageSwitch"
      :data-testid="`${props.dataTestid}-Language-Switch`"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import Switch from '@/components/Switch/Switch.vue';
import { IChangeSwitchEmit } from '@/components/Switch/interface/interface';
import MenuItem from './MenuItem.vue';
import { IconNameEnum } from '@/components/Icon/enum/enum';
import { MenuTypeEnum } from './enum/enum';
import Toggle from '@/components/Toggle/Toggle.vue';
import type { IMenuProps } from './interface/interface';

const props = withDefaults(defineProps<IMenuProps>(), {
  dataTestid: 'UserMenuList'
});

const emit = defineEmits<{
  (e: 'click', type: MenuTypeEnum): void;
  (e: 'unmount-qr-auth'): void;
  (e: 'themeChange', value: boolean): void;
  (e: 'languageSwitch', value: IChangeSwitchEmit): void;
}>();

const activeItem = ref<MenuTypeEnum | null>(null);

watch(
  () => props.menuOpen,
  newVal => {
    if (!newVal) activeItem.value = null;
  }
);

const choosedOptions = (type: MenuTypeEnum) => {
  activeItem.value = type;
  if (type === MenuTypeEnum.qrAuth) {
    emit('unmount-qr-auth');
    return;
  }
  emit('click', type);
};

const handleLanguageSwitch = (obj: IChangeSwitchEmit) => {
  emit('languageSwitch', obj);
};

/*
Данная функция находится в разработке
@date 2025-11-07
*/
const handleThemeSwitch = () => {
  // emit('themeChange', value);
  return false;
};

const getDefaultText = (type: MenuTypeEnum): string => {
  const defaults: Record<MenuTypeEnum, string> = {
    [MenuTypeEnum.profile]: 'Profile',
    [MenuTypeEnum.qrAuth]: 'Auth with QR',
    [MenuTypeEnum.theme]: 'Theme',
    [MenuTypeEnum.options]: 'Settings',
    [MenuTypeEnum.exit]: 'Log Out',
    [MenuTypeEnum.help]: 'Help'
  };
  return defaults[type] ?? '';
};

const getIconForType = (type: MenuTypeEnum): IconNameEnum => {
  const icons: Record<MenuTypeEnum, IconNameEnum> = {
    [MenuTypeEnum.profile]: IconNameEnum.profile,
    [MenuTypeEnum.qrAuth]: IconNameEnum.qrCode,
    [MenuTypeEnum.theme]: IconNameEnum.darkThemeSwitcher,
    [MenuTypeEnum.options]: IconNameEnum.settings,
    [MenuTypeEnum.exit]: IconNameEnum.logout,
    [MenuTypeEnum.help]: IconNameEnum.help
  };
  return icons[type] ?? IconNameEnum.profile;
};

const getTestIdSuffix = (type: MenuTypeEnum): string => {
  const suffixes: Record<MenuTypeEnum, string> = {
    [MenuTypeEnum.profile]: 'Profile',
    [MenuTypeEnum.qrAuth]: 'QR',
    [MenuTypeEnum.theme]: 'Theme',
    [MenuTypeEnum.options]: 'Settings',
    [MenuTypeEnum.exit]: 'Exit',
    [MenuTypeEnum.help]: 'Help'
  };
  return suffixes[type] ?? type;
};

const isDisabled = (type: MenuTypeEnum): boolean => {
  return type === MenuTypeEnum.theme || type === MenuTypeEnum.help;
};
</script>

<style scoped>
.menu-yui-kit__list {
  padding: 10px;
}

.list-yui-kit {
  list-style-type: none;
  padding: 0;
  margin-top: -5px;
  margin-bottom: 10px;
  display: grid;
  gap: 5px;
}

:deep(ul.switch-yui-kit-list) {
  width: 191px;
  padding: 2px;
  background-color: var(--blue9);
}

:deep(li.switch-yui-kit-item) {
  height: 26px;
}

.toggle-yui-kit {
  margin: 0;
  margin-left: auto;
}
</style>
