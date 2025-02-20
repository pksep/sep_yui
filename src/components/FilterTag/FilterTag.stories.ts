import { StoryFn, Meta } from '@storybook/vue3';
import FilterTag from './FilterTag.vue';
import { StorybookControlEnum } from '../../common/storybook';
import { BadgesTypeEnum } from '../Badges/enum/enum';

const badgesItems = [
  {
    value: 'value1',
    type: BadgesTypeEnum.pink,
    label: 'Удалено'
  },
  {
    value: 'value2',
    type: BadgesTypeEnum.red,
    label: 'Просрочено'
  },
  {
    value: 'value3',
    type: BadgesTypeEnum.blue,
    label: 'Покупатель'
  }
];

const meta = {
  title: 'Filter/FilterTag',
  component: FilterTag,
  argTypes: {
    title: {
      control: { type: StorybookControlEnum.text }
    },
    options: {
      control: { type: StorybookControlEnum.object }
    }
  },
  tags: ['autodocs']
} as Meta<typeof FilterTag>;

export default meta;

const Template: StoryFn<typeof FilterTag> = args => ({
  components: { FilterTag },
  setup() {
    return { args };
  },
  template: `
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <FilterTag v-bind="args" />
    </div>
  `
});

export const Default = Template.bind({});

Default.args = {
  title: 'Статус',
  options: badgesItems
};
