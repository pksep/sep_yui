import { StoryFn, Meta } from '@storybook/vue3';
import Search from './Search.vue';
import { StorybookControl } from '../../common/storybook';

const meta = {
  title: 'Search/Search',
  component: Search,
  argTypes: {
    showHistory: {
      control: { type: StorybookControl.boolean }
    },
    placeholder: {
      control: { type: StorybookControl.text }
    }
  },
  tags: ['autodocs']
} as Meta<typeof Search>;

export default meta;

const Template: StoryFn<typeof Search> = args => ({
  components: { Search },
  setup() {
    return { args };
  },
  template: `
    <div style="display: flex; flex-direction: row; gap: 12px; color: args.color">
      <Search v-bind="args"/>
    </div>
  `
});

export const Default = Template.bind({});

Default.args = {
  showHistroy: true,
  placeholder: 'Динозавры уже здесь'
};
