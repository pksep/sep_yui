import { StoryFn, Meta } from '@storybook/vue3';
import Filter from './Filter.vue';
import { StorybookControlEnum } from '../../common/storybook';
import { fn } from '@storybook/test';

const optionsItems = ['Покупатель 1', 'Покупатель 2', 'Покупатель 3'];

const optionsObjectItems = [
  {
    key: 'buyer1',
    value: 'Покупатель 1'
  },
  {
    key: 'buyer2',
    value: 'Покупатель 2'
  },
  {
    key: 'buyer3',
    value: 'Покупатель 3'
  }
];

const meta = {
  title: 'Select/Filter',
  component: Filter,
  argTypes: {
    optionsItems: {
      type: StorybookControlEnum.object,
      defaultValue: optionsItems,
      onClick: { action: 'clicked' }
    }
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
    title: 'Ответственный:',
    defaultOption: 'Не выбран'
  }
} as Meta<typeof Filter>;

export default meta;

const Template: StoryFn<typeof Filter> = args => ({
  components: { Filter },
  setup() {
    return { args };
  },
  template: `
    <Filter v-bind="args" />
  `
});

export const Default = Template.bind({});

Default.args = {
  options: optionsItems
};

export const WithObjects = Template.bind({});

WithObjects.args = {
  options: optionsObjectItems
};
