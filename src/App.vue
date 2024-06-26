<template>
  <div style="padding: 0 20px 400px 20px">
    <h1 class="text">Dropdown</h1>
    <div style="width: 200px">
      <Dropdown :options="optionsItems" />
    </div>
    <h1 class="text">Badges</h1>
    <Badges :type="BadgesTypeEnum.default" :text="'Все'" />
    <Badges :type="BadgesTypeEnum.blue" :text="'Удалено'" />
    <Badges :type="BadgesTypeEnum.red" choosed :text="'Отгружено'" />
    <Badges :type="BadgesTypeEnum.orange" choosed :text="'Покупатели'" />
    <Badges :type="BadgesTypeEnum.pink" choosed :text="'Ожидает'" />

    <h1 class="text">Filter</h1>
    <Filter :options="badgesItems" :title="'Статус'" :multiselect="true" />
    <br />
    <Filter
      :options="badgesItemsSeach"
      :title="'Покупатели'"
      :multiselect="true"
      :searchable="true"
      @scroll="e => console.log(e, 'e')"
    />
    <h1 class="text">Button</h1>
    <div class="buttons-wrapper">
      <Button :size="SizesEnum.small" :type="ButtonType.ghost"
        >Small Button</Button
      >
      <Button :size="SizesEnum.medium" :type="ButtonType.outline"
        >Medium Button</Button
      >
      <Button :size="SizesEnum.large" :type="ButtonType.primary"
        >Large Button</Button
      >
      <Button :size="SizesEnum.large" disabled
        ><Icon :name="IconNameEnum.help" /> Large Button</Button
      >
      <Button :size="SizesEnum.large" :type="ButtonType.secondary"
        ><Icon :name="IconNameEnum.help" :width="54" :height="54" /> Large Icon
        Button</Button
      >
    </div>

    <h1 class="text">Icon</h1>
    <div class="icons">
      <div v-for="item of iconNames" :key="item">
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
    <Table />
    <div style="width: 553px">
      <Search :show-history="true" :options="optionsBase" />
      <br />
      <Search
        :global="true"
        :show-history="false"
        :global-results-function="getAllResults"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Badges from '@/components/Badges/Badges.vue';
import Filter from '@/components/Filter/Filter.vue';
import Button from '@/components/Button/Button.vue';
import Icon from '@/components/Icon/Icon.vue';
import Toggle from '@/components/Toggle/Toggle.vue';
import Switch from '@/components/Switch/Switch.vue';
import Search from '@/components/Search/Search.vue';
import Slider from '@/components/Slider/Slider.vue';
import Table from '@/components/Table/Table.vue';
import Dropdown from '@/components/Dropdown/Dropdown.vue';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs.vue';
import { IconNameEnum } from '@/components/Icon/enum';
import '@/assets/icons/sprite';
import { BadgesTypeEnum } from './components/Badges/enum';
import { IBreadCrumbsEmit } from './components/BreadCrumbs/interface';
import { computed, ref } from 'vue';
import { SizesEnum } from './common/sizes';
import { ButtonType } from './components/Button/enum';

const array = ['Ru', 'En'];

const files = [
  {
    path: 'https://www.sunhome.ru/i/wallpapers/14/loshadi-v4.orig.jpg'
  },
  {
    path: 'https://videocdn.cdnpk.net/joy/content/video/free/video0467/large_preview/_import_61557331a47cb7.87464437.mp4?filename=1109668_stairs_standard_dawn_1920x1080.woff'
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
    type: BadgesTypeEnum.default
  },
  {
    value: 'Удалено',
    type: BadgesTypeEnum.pink
  },
  {
    value: 'Отгружено',
    type: BadgesTypeEnum.red
  },
  {
    value: 'Отгружено1',
    type: BadgesTypeEnum.red
  },
  {
    value: 'Отгружено2',
    type: BadgesTypeEnum.red
  }
];

const badgesItemsSeach = [
  {
    value: 'Все',
    type: BadgesTypeEnum.default
  },
  {
    value: 'Иванов И.С',
    type: BadgesTypeEnum.blue
  },
  {
    value: 'Синев И.А',
    type: BadgesTypeEnum.blue
  },
  {
    value: 'Цаплева Е.К',
    type: BadgesTypeEnum.blue
  },
  {
    value: 'Иванов И.С',
    type: BadgesTypeEnum.blue
  },
  {
    value: 'Синев И.А',
    type: BadgesTypeEnum.blue
  },
  {
    value: 'Цаплева Е.К',
    type: BadgesTypeEnum.blue
  }
];

const crumbsItems = ref([
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

const optionsItems = [
  'MainOptionMainOptionMainOption',
  'Option1MainOptionMainOption',
  'Option2MainOptionMainOption',
  'Option3',
  'Option4'
];

const optionsBase = [
  'База деталей',
  'База материалов',
  'База оборудования',
  'База сборочных единиц',
  'База инструментов'
];

const iconNames = computed(() => Object.values(IconNameEnum) as IconNameEnum[]);

const breadCrumbsSelect = (item: IBreadCrumbsEmit) => {
  crumbsItems.value = crumbsItems.value.slice(0, item.inx);
};

const getAllResults = () => {
  const arr = [
    {
      icon: IconNameEnum.exitBig,
      nameArea: 'База сборок',
      searchResult: 'Легко/Артикул детали'
    },
    {
      icon: IconNameEnum.exitBig,
      nameArea: 'Сборка по операциям',
      searchResult: 'Наименование/Артикул детали'
    },
    {
      icon: IconNameEnum.exitBig,
      nameArea: 'База оборудованияБаза оборудования',
      searchResult: 'Наименование/Артикул детали'
    },
    {
      icon: IconNameEnum.exitBig,
      nameArea: 'База оборудования1',
      searchResult: 'Наименование/Артикул детали'
    },
    {
      icon: IconNameEnum.exitBig,
      nameArea: 'База оборудования2',
      searchResult: 'Наименование/Артикул детали'
    },
    {
      icon: IconNameEnum.exitBig,
      nameArea: 'База оборудования3',
      searchResult: 'Наименование/Артикул детали'
    }
  ];

  return arr;
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
