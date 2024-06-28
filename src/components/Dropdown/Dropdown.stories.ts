import { StoryFn, Meta } from '@storybook/vue3';
import Dropdown from './Dropdown.vue';
import { StorybookControl } from '../../common/storybook';
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
      type: StorybookControl.object,
      defaultValue: optionsItems,
      onClick: { action: 'clicked' }
    }
  },
  tags: ['autodocs'],
  args: { onClick: fn() }
} as Meta<typeof Dropdown>;

export default meta;

const Template: StoryFn<typeof Dropdown> = args => ({
  components: { Dropdown },
  setup() {
    return { args };
  },
  template: `
  <div style="width: 200px;">
  <Dropdown v-bind="args" />
</div>
  `
});

export const Default = Template.bind({});

Default.args = {
  options: optionsItems
};
