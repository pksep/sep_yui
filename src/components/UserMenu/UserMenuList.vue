<template>
  <div class="menu-yui-kit__list">
    <ul class="list-yui-kit">
      <MenuItem
        :data-testid="`${props.dataTestid}-Profile-Item`"
        :iconName="IconNameEnum.profile"
        text="Profile"
        :menuType="MenuTypeEnum.profile"
        @click="choosedOptions"
      />
      <MenuItem
        :data-testid="`${props.dataTestid}-Theme-Item`"
        :iconName="IconNameEnum.paint"
        text="Theme"
        :menuType="MenuTypeEnum.theme"
        @click="choosedOptions"
      >
        <Switch
          :items="['Light', 'Dark']"
          :defaultValue="props.isBlackTheme ? 'Dark' : 'Light'"
          @change="handleThemeSwitch"
        />
      </MenuItem>
      <MenuItem
        :data-testid="`${props.dataTestid}-Settings-Item`"
        :iconName="IconNameEnum.settings"
        text="Settings"
        :menuType="MenuTypeEnum.options"
        @click="choosedOptions"
      />
      <MenuItem
        :data-testid="`${props.dataTestid}-Exit-Item`"
        :iconName="IconNameEnum.logout"
        text="Log Out"
        :menuType="MenuTypeEnum.exit"
        @click="choosedOptions"
      />
      <MenuItem
        :data-testid="`${props.dataTestid}-Help-Item`"
        :iconName="IconNameEnum.help"
        text="Help"
        :menuType="MenuTypeEnum.help"
        @click="choosedOptions"
      />
    </ul>

    <Switch
      v-if="props.languages?.items"
      :items="props.languages?.items"
      :defaultValue="props.languages?.defaultValue"
      @change="handleLanguageSwitch"
      :data-testid="`${props.dataTestid}-Language-Switch`"
    />
  </div>
</template>

<script lang="ts" setup>
import Switch from '@/components/Switch/Switch.vue';
import { IChangeSwitchEmit } from '@/components/Switch/interface/interface';
import MenuItem from './MenuItem.vue';
import { IconNameEnum } from '@/components/Icon/enum/enum';
import { MenuTypeEnum } from './enum/enum';
import { defineProps, defineEmits, withDefaults } from 'vue';

interface IUserMenuListProps {
  dataTestid: string;
  isBlackTheme: boolean;
  languages?: {
    items?: string[];
    defaultValue?: string;
  };
}

const props = withDefaults(defineProps<IUserMenuListProps>(), {
  dataTestid: 'UserMenuList'
});

const emit = defineEmits<{
  (e: 'click', type: MenuTypeEnum): void;
  (e: 'themeChange', value: boolean): void;
  (e: 'languageSwitch', value: IChangeSwitchEmit): void;
}>();

function choosedOptions(type: MenuTypeEnum) {
  emit('click', type);
}

function toggleThemeChange(value: boolean) {
  emit('themeChange', value);
}

function handleLanguageSwitch(obj: IChangeSwitchEmit) {
  emit('languageSwitch', obj);
}

function handleThemeSwitch(obj: IChangeSwitchEmit) {
  toggleThemeChange(obj.value === 'Dark');
}
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

.switch-yui-kit-list {
  width: 191px;
  background-color: var(--blue9);
  padding: 2px;
}

.switch-yui-kit-item {
  height: 26px;
}
</style>
