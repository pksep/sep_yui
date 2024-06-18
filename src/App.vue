<template>
  <div style="padding: 0 20px 400px 20px; background-color: black">
    <!-- <h1 class="text">Badges</h1>
    <Badges :type="BadgesType.default" :text="'Все'" />
    <Badges :type="BadgesType.blue" :text="'Удалено'" />
    <Badges :type="BadgesType.red" choosed :text="'Отгружено'" />
    <Badges :type="BadgesType.orange" choosed :text="'Покупатели'" />
    <Badges :type="BadgesType.pink' choosed :text="'Ожидает'" /> -->

    <h1 class="text">Filter</h1>
    <Filter :options="badgesItems" :title="'Статус'" :multiselect="true" />
    <br />
    <Filter
      :options="badgesItemsSeach"
      :title="'Покупатели'"
      :multiselect="true"
      :searchable="true"
    />
    <!-- <h1 class="text">Button</h1>
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
    <h1 class="text">BreadCrumbs</h1>
    <BreadCrumbs
      :items="crumbsItems"
      :key="crumbsItems.length"
      @click="breadCrumbsSelect"
    />
    <h1 class="text">Search</h1>
    <Search />

    <h1 class="text">Toggle</h1>
    <Toggle checked @change="(checked: boolean) => console.log(checked)" />
    <Toggle checked @change="(checked: boolean) => console.log(checked)" />

    <h1 class="text">Switch</h1>
    <Switch :items="array" />

    <h1 class="text">Slider</h1>
    <div class="slider-main">
      <Slider :items="files" />
    </div>
    <Table /> -->
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
import Table from '@/components/Table/Table';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import { IconNameEnum } from '@/components/Icon/enum';
import '@/assets/icons/sprite';
import { BadgesType } from './components/Badges/enum';
import { IBreadCrumbsEmit } from './components/BreadCrumbs/interface';
import { ref } from 'vue';

const array = ['Ru', 'En'];

const files = [
  {
    path: 'https://www.sunhome.ru/i/wallpapers/14/loshadi-v4.orig.jpg'
  },
  {
    path: 'https://videocdn.cdnpk.net/joy/content/video/free/video0467/large_preview/_import_61557331a47cb7.87464437.mp4?filename=1109668_stairs_standard_dawn_1920x1080.mp4'
  },
  {
    path: 'https://www.sunhome.ru/i/wallpapers/210/voronie-loshadi.orig.jpg'
  }
];

const badgesItems = [
  {
    value: 'Все',
    type: BadgesType.default
  },
  {
    value: 'Удалено',
    type: BadgesType.pink
  },
  {
    value: 'Отгружено',
    type: BadgesType.red
  }
];
const badgesItemsSeach = [
  {
    value: 'Все',
    type: BadgesType.default
  },
  {
    value: 'Иванов Иван Сергеевич',
    type: BadgesType.blue
  },
  {
    value: 'Синев Ипполит Анатольевич',
    type: BadgesType.blue
  },
  {
    value: 'Цаплева Евгений Константинович',
    type: BadgesType.blue
  },
  {
    value: 'Иванов Иван Сергеевич',
    type: BadgesType.blue
  },
  {
    value: 'Синев Ипполит Анатольевич',
    type: BadgesType.blue
  },
  {
    value: 'Цаплева Евгений Константинович',
    type: BadgesType.blue
  }
];

let crumbsItems = ref([
  {
    path: '/assembly',
    title: 'Главная'
  },
  {
    path: '/assembly2',
    title: 'База деталей'
  },
  {
    path: '/assembly3',
    title: 'Редактор Детали '
  },
  {
    path: '/assembly4',
    title: 'База материалов'
  },
  {
    path: '/assembly6',
    title: 'База оборудования'
  },
  {
    path: '/assembly7',
    title: 'База инструментов'
  },
  {
    path: '/',
    title: 'База покупателей'
  },
  {
    path: '',
    title: 'Несуществующая База'
  },
  {
    path: '/assembly9',
    title: 'База продавцов'
  }
]);

const breadCrumbsSelect = (item: IBreadCrumbsEmit) => {
  crumbsItems.value = crumbsItems.value.slice(0, item.inx);
};
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
