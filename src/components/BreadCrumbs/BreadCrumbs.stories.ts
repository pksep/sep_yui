import { StoryFn, Meta } from '@storybook/vue3';
import BreadCrumbs from './BreadCrumbs';
import { StorybookControl } from '../../common/storybook';
import { ref, Ref } from 'vue';
import { IBreadCrumbsEmit } from './interface';
import { fn } from '@storybook/test';
import { action } from '@storybook/addon-actions';
interface ICrumbItem {
  path: string;
  title: string;
}

let crumbsItems: Ref<ICrumbItem[]> = ref([
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

const meta = {
  title: 'BreadCrumbs/BreadCrumbs',
  component: BreadCrumbs,
  argTypes: {
    items: {
      type: StorybookControl.object,
      defaultValue: crumbsItems,
      onClick: { action: 'clicked' }
    }
  },
  args: {
    onClick: { path: 'path', title: 'name' }
  },
  tags: ['autodocs']
} as Meta<typeof BreadCrumbs>;

export default meta;

const Template: StoryFn<typeof BreadCrumbs> = args => ({
  components: { BreadCrumbs },
  setup() {
    return { args, crumbsItems, breadCrumbsSelect };
  },
  template: `<div style="margin-top: 100px"><BreadCrumbs v-bind="args"  :items="crumbsItems"       :key="crumbsItems.length"
      @click="breadCrumbsSelect"/>
  </div>`
});

export const Default = Template.bind({});
Default.args = {
  key: crumbsItems.value.length,
  onclick: action('clicked')
};
