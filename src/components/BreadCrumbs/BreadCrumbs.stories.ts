import { StoryFn } from '@storybook/vue3';
import BreadCrumbs from './BreadCrumbs.vue';
import { StorybookControlEnum } from '../../common/storybook';
import { ref, Ref } from 'vue';
import { IBreadCrumbItems, IBreadCrumbsEmit } from './interface/interface';

const crumbsItems: Ref<IBreadCrumbItems[]> = ref([
  {
    path: '/assembly',
    title: 'Главная'
  },
  {
    path: '',
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
    path: '/story/breadcrumbs',
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

const meta = {
  title: 'BreadCrumbs/BreadCrumbs',
  component: BreadCrumbs,
  argTypes: {
    items: {
      type: StorybookControlEnum.object,
      defaultValue: crumbsItems
    }
  },
  args: {
    onClick: { path: 'path', title: 'name' }
  },
  tags: ['autodocs']
};

export default meta;

const Template: StoryFn<typeof BreadCrumbs> = args => ({
  components: { BreadCrumbs },
  setup() {
    return { args, crumbsItems, breadCrumbsSelect };
  },
  template: `<div style="margin-top: 100px"><BreadCrumbs v-bind="args" :items="crumbsItems"       :key="crumbsItems.length"
      @click="breadCrumbsSelect"/>
  </div>`
});

export const Default = Template.bind({});
Default.args = {
  key: crumbsItems.value.length,
  items: crumbsItems
};
