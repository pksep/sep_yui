import { StoryFn, Meta } from '@storybook/vue3';
import Filter from '@/components/Filter/Filter';
import { StorybookControl } from '../../common/storybook';
import { FilterType } from './enum';
import { fn } from '@storybook/test';

const meta = {
  title: 'Filter/Filter',
  component: Filter,
  argTypes: {
    text: {
      control: { type: StorybookControl.text }
    },
    type: {
      control: { type: StorybookControl.select },
      options: FilterType,
      defaultValue: FilterType.default
    },
    choosed: {
      control: { type: StorybookControl.boolean },
      defaultValue: false
    },
    leftIcon: {
      control: { type: StorybookControl.text },
      description: 'SVG markup for left icon',
      defaultValue: ''
    },
    rightIcon: {
      control: { type: StorybookControl.text },
      description: 'SVG markup for right icon',
      defaultValue: ''
    }
  },
  tags: ['autodocs'],
  args: { onClick: fn() }
} as Meta<typeof Filter>;

export default meta;

const Template: StoryFn<typeof Filter> = args => ({
  components: { Filter },
  setup() {
    return { args };
  },
  template: `
  <div style="display: flex; flex-direction: row; gap: 12px;">
  <Filter v-bind="args">Все</Filter>
</div>
  `
});

export const Default: StoryFn<typeof Filter> = args => ({
  components: { Filter },
  setup() {
    return { args };
  },
  template: '<Filter v-bind="args">{{args.text || "Все"}}</Filter>'
});

export const BlueFilter = Template.bind({});
BlueFilter.args = {
  type: FilterType.blue,
  text: 'Удалено'
};

export const GreenFilter = Template.bind({});
GreenFilter.args = {
  type: FilterType.green,
  text: 'Отгружено'
};

export const OrangeFilter = Template.bind({});
OrangeFilter.args = {
  type: FilterType.orange,
  text: 'Заказано'
};

export const RedFilter = Template.bind({});
RedFilter.args = {
  type: FilterType.red,
  text: 'Просрочено'
};
