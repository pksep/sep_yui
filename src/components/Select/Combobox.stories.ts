import { StoryFn, Meta } from '@storybook/vue3';
import Combobox from './Combobox.vue';
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
  title: 'Select/Combobox',
  component: Combobox,
  argTypes: {
    optionsItems: {
      type: StorybookControlEnum.object,
      onClick: { action: 'clicked' }
    }
  },
  tags: ['autodocs'],
  args: {
    onClick: fn()
  }
} as Meta<typeof Combobox>;

export default meta;

const Template: StoryFn<typeof Combobox> = args => ({
  components: { Combobox },
  setup() {
    return { args };
  },
  template: `
    <Combobox v-bind="args" />
  `
});

export const Default = Template.bind({});

Default.args = {
  options: optionsItems
};
