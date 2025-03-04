import { StoryFn, Meta } from '@storybook/vue3';
import Popover from './Popover.vue';
import { StorybookControlEnum } from '../../common/storybook';

const options = [
  {
    value: 'value1',
    function: () => console.log('function1')
  },
  {
    value: 'value2 value2 value2',
    function: () => console.log('function2')
  }
];

const meta = {
  title: 'Popover/Popover',
  component: Popover,
  argTypes: {
    title: {
      control: { type: StorybookControlEnum.text }
    },
    options: {
      control: { type: StorybookControlEnum.object }
    }
  },
  tags: ['autodocs']
} as Meta<typeof Popover>;

export default meta;

const Template: StoryFn<typeof Popover> = args => ({
  components: { Popover },
  setup() {
    return { args };
  },
  template: `
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <Popover v-bind="args" />
    </div>
  `
});

export const Default = Template.bind({});

Default.args = {
  options: options
};
