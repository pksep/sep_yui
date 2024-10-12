import { StoryFn, Meta } from '@storybook/vue3';
import Search from './Search.vue';
import { StorybookControlEnum } from '../../common/storybook';
import { fn } from '@storybook/test';

const meta = {
  title: 'Search/Search',
  component: Search,
  argTypes: {
    showHistory: {
      control: { type: StorybookControlEnum.boolean }
    },
    placeholder: {
      control: { type: StorybookControlEnum.text }
    }
  },
  args: { onEnter: fn(), width: '470px' },
  tags: ['autodocs']
} as Meta<typeof Search>;

export default meta;

const Template: StoryFn<typeof Search> = args => ({
  components: { Search },
  setup() {
    return { args };
  },
  template: `
    <div :style="{ width: args.width }">
      <Search v-bind="args" />
    </div>`
});

export const Default = Template.bind({});

Default.args = {
  showHistory: true
};
