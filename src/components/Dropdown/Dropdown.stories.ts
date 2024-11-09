import { StoryFn, Meta } from '@storybook/vue3';
import Dropdown from './Dropdown.vue';
import { StorybookControlEnum } from '../../common/storybook';
import { fn } from '@storybook/test';

const optionsItems = [
  'MainOptionMainOptionMainOption',
  'Option1MainOptionMainOption',
  'Option2MainOptionMainOption',
  'Option3',
  'Option4'
];

const meta = {
  title: 'Dropdown/Dropdown',
  component: Dropdown,
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
    width: '200px'
  }
} as Meta<typeof Dropdown>;

export default meta;

const Template: StoryFn<typeof Dropdown> = args => ({
  components: { Dropdown },
  setup() {
    return { args };
  },
  template: `
  <Dropdown v-bind="args" />
  `
});

export const Default = Template.bind({});

Default.args = {
  options: optionsItems
};
