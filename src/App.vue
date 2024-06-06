<template>
  <div style="padding: 0 20px 400px 20px">
    <h1 class="text">Badges</h1>
    <Badges :type="'default'" :text="'Все'" />
    <Badges :type="'blue'" :text="'Удалено'" />
    <Badges :type="'red'" choosed :text="'Отгружено'" />
    <Badges :type="'orange'" choosed :text="'Покупатели'" />
    <Badges :type="'pink'" choosed :text="'Ожидает'" />

    <h1 class="text">Filter</h1>
    <Filter :items="badgesItems" :title="'Статус'" :multiselect="true" />
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
    <div style="width: 1400px">
      <!-- <div class="table" style="margin-top: 10px">
      </div> -->
      <table class="table">
        <tr class="table__tr">
          <th class="table__th">№</th>
          <th class="table__th">Заказ</th>
          <th class="table__th">Артикул изделия</th>
          <th class="table__th">Наименование изделия</th>
          <th class="table__th">Комплектация/особенности заказа</th>
          <th class="table__th">Кол-во, шт.</th>
          <th class="table__th">Кол-во, дней</th>
          <th class="table__th">Осталось дней</th>
          <th class="table__th">Основание</th>
          <th class="table__th">Покупатель</th>
          <th class="table__th">Ур. комплектации</th>
          <th class="table__th">Комплектация по остаткам</th>
          <th class="table__th">Готовность к отгрузке в %</th>
          <th class="table__th">Статус</th>
          <th class="table__th">Дата План. отгрузки</th>
          <th class="table__th">Дата Факт. отгрузки</th>
          <th class="table__th">Примечание</th>
        </tr>
        <tr class="table__tr">
          <td class="table__td">...</td>
          <td class="table__td">sdfsdf</td>
          <td class="table__td">sdfsdf</td>
          <td class="table__td">hghfghfgh</td>
          <td class="table__td">Нет комплектации</td>
          <td class="table__td">1</td>
          <td class="table__td">12</td>
          <td class="table__td"><Icon :name="'help'" /></td>
          <td class="table__td">
            <Badges :type="'red'" :text="'text'" />
          </td>
          <td class="table__td">
            <img
              src="https://s8.hostingkartinok.com/uploads/images/2016/08/a131e3cfd554b650c83ab2f5327b8b27.jpg"
              alt=""
            />
          </td>
          <td class="table__td">f</td>
          <td class="table__td">dsfsdfsd</td>
          <td class="table__td">sdfsdf</td>
          <td class="table__td">sdf</td>
          <td class="table__td">sdfsdf</td>
          <td class="table__td">sdfsdf</td>
          <td class="table__td">hghfghfgh</td>
          <td class="table__td">1212asdfas</td>
        </tr>
        <tr class="table__tr">
          <td class="table__td">...</td>
          <td class="table__td">sdfsdf</td>
          <td class="table__td">sdfsdf</td>
          <td class="table__td">hghfghfgh</td>
          <td class="table__td">Нет комплектации</td>
          <td class="table__td">1</td>
          <td class="table__td">12</td>
          <td class="table__td">33</td>
          <td class="table__td">1</td>
          <td class="table__td">f</td>
          <td class="table__td">dsfsdfsd</td>
          <td class="table__td">sdfsdf</td>
          <td class="table__td">sdf</td>
          <td class="table__td">sdfsdf</td>
          <td class="table__td">sdfsdf</td>
          <td class="table__td">hghfghfgh</td>
          <td class="table__td">1212asdfas</td>
        </tr>
      </table>
    </div>
    <h1 class="text">Menu</h1>
    <Menu
      :name="'David Perov'"
      :role="'administrator'"
      :path="'https://sportishka.com/uploads/posts/2023-12/1702131190_sportishka-com-p-krasivie-mesta-v-prirode-oboi-3.jpg'"
      @switch="e => console.log('lang:', e)"
      @click="e => console.log('option:', e)"
      @toggle="e => console.log('themeChange:', e)"
    />
    <Colors />
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
import Menu from '@/components/Menu/Menu';
import Colors from '@/components/Colors/Colors';
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
