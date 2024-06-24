import { StoryFn, Meta } from '@storybook/vue3';
import Filter from './Filter.vue';
import { StorybookControl } from '../../common/storybook';
import { BadgesTypeEnum } from '../../components/Badges/enum';

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
    value: 'Просрочено',
    type: BadgesTypeEnum.red
  },
  {
    value: 'Покупатель',
    type: BadgesTypeEnum.blue
  },
  {
    value: 'Заказано',
    type: BadgesTypeEnum.orange
  },
  {
    value: 'Отгружено',
    type: BadgesTypeEnum.green
  }
];

const meta = {
  title: 'Filter/Filter',
  component: Filter,
  argTypes: {
    title: {
      control: { type: StorybookControl.text }
    },
    options: {
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
  options: badgesItems
};
