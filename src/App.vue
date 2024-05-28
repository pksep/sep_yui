<template>
  <h1 class="text">Filter</h1>
  <Filter :type="'default'">Все</Filter>
  <Filter :type="'blue'">Удалено</Filter>
  <Filter :type="'red'" choosed>Отгружено</Filter>

  <h1 class="text">Button</h1>
  <div class="buttons-wrapper">
    <Button :size="'small'" :type="'ghost'">Small Button</Button>
    <Button :size="'medium'" :type="'outline'">Medium Button</Button>
    <Button :size="'large'" :type="'primary'">Large Button</Button>
    <Button :size="'large'" disabled
      ><Icon :name="'help'" /> Large Button</Button
    >
    <Button :size="'large'" :type="'secondary'"
      ><Icon :name="'help'" :width="54" :height="54" /> Large Icon
      Button</Button
    >
  </div>

  <h1 class="text">Icon</h1>
  <div class="icons">
    <div v-for="item of Object.keys(IconNameEnum)" :key="item">
      <Icon :name="item" />
    </div>
  </div>

  <h1 class="text">Toggle</h1>
  <Toggle checked @change="(checked: boolean) => console.log(checked)" />

  <h1 class="text">Switch</h1>
  <Switch :items="array" :defaultValue="'En'" />

  <h1 class="text">Search</h1>
  <Search />
</template>

<script setup lang="ts">
import Filter from '@/components/Filter/Filter';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import Toggle from '@/components/Toggle/Toggle';
import Switch from '@/components/Switch/Switch';
import Search from '@/components/Search/Search';
import { IconNameEnum } from '@/components/Icon/enum';

const array = ['Ru', 'En'];
</script>

<style lang="scss">
.buttons-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
}
.text {
  color: black;
  font-family: 'Arial';

  &:hover {
    color: blue;
  }
}
.icons {
  display: flex;
}
</style>
