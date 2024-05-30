<template>
  <h1 class="text">Badges</h1>
  <Badges :type="'default'">Все</Badges>
  <Badges :type="'blue'">Удалено</Badges>
  <Badges :type="'red'" choosed>Отгружено</Badges>
  <Badges :type="'orange'" choosed>Покупатели</Badges>
  <Badges :type="'pink'" choosed>Ожидает</Badges>

  <h1 class="text">Filter</h1>
  <Filter :items="badgesItems" />
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

  <h1 class="text">Search</h1>
  <Search />

  <h1 class="text">Toggle</h1>
  <Toggle checked @change="(checked: boolean) => console.log(checked)" />

  <h1 class="text">Switch</h1>
  <Switch :items="array" />

  <h1 class="text">Slider</h1>
  <div class="slider-main">
    <Slider :items="files" />
  </div>
</template>

<script setup lang="ts">
import Badges from '@/components/Badges/Badges';
import Filter from '@/components/Filter/Filter';
import Button from '@/components/Button/Button';
import Icon from '@/components/Icon/Icon';
import Toggle from '@/components/Toggle/Toggle';
import Switch from '@/components/Switch/Switch';
import Search from '@/components/Search/Search';
import Slider from '@/components/Slider/Slider';
import { IconNameEnum } from '@/components/Icon/enum';
import '@/assets/icons/sprite';

const array = ['Ru', 'En'];
const files = [
  {
    path: 'https://gas-kvas.com/grafic/uploads/posts/2023-10/1696502289_gas-kvas-com-p-kartinki-lyubie-45.jpg'
  },
  {
    path: 'https://videocdn.cdnpk.net/joy/content/video/free/video0467/large_preview/_import_61557331a47cb7.87464437.mp4?filename=1109668_stairs_standard_dawn_1920x1080.mp4'
  },
  {
    path: 'https://www.sunhome.ru/i/wallpapers/210/voronie-loshadi.orig.jpg'
  }
];
const badgesItems = ['Все', 'Удалено', 'Отгружено', 'Покупатели', 'Ожидает'];
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
.slider-main {
  width: 472px;
  height: 220px;
}
</style>
