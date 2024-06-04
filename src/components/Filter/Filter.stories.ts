import { StoryFn, Meta } from '@storybook/vue3';
import Filter from './Filter.vue';
import { StorybookControl } from '../../common/storybook';
import { BadgesType } from '@/components/Badges/enum';

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
    value: 'Просрочено',
    type: BadgesType.red
  },
  {
    value: 'Покупатель',
    type: BadgesType.blue
  },
  {
    value: 'Заказано',
    type: BadgesType.orange
  },
  {
    value: 'Отгружено',
    type: BadgesType.green
  }
];

const meta = {
  title: 'Filter/Filter',
  component: Filter,
  argTypes: {
    title: {
      control: { type: StorybookControl.text }
    },
    items: {
      control: { type: StorybookControl.object }
    }
  },
  tags: ['autodocs']
} as Meta<typeof Filter>;

export default meta;

const Template: StoryFn<typeof Filter> = args => ({
  components: { Filter },
  setup() {
    return { args };
  },
  template: `
    <div style="display: flex; flex-direction: row; gap: 12px; color: args.color">
      <Filter v-bind="args" />
    </div>
  `
});

export const Default = Template.bind({});

Default.args = {
  title: 'Статус',
  items: badgesItems
};
