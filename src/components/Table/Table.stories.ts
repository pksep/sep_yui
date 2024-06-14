import { StoryFn, Meta } from '@storybook/vue3';
import Table from './Table.vue';
import { StorybookControl } from '../../common/storybook';
import { fn } from '@storybook/test';

const meta = {
  title: 'Table/Table',
  component: Table,
  argTypes: {
    defaultIndex: {
      control: { type: StorybookControl.number }
    }
  },
  args: { onClick: fn() },
  tags: ['autodocs']
} as Meta<typeof Table>;

export default meta;

const Template: StoryFn<typeof Table> = args => ({
  components: { Table },
  setup() {
    return { args };
  },
  template: `<Table v-bind="args" />`
});

export const Default = Template.bind({});
