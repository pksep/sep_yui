import { StoryFn, Meta } from '@storybook/vue3';
import Search from './Search.vue';
import { StorybookControl } from '../../common/storybook';
import { action } from '@storybook/addon-actions';

const meta = {
  title: 'Search/Search',
  component: Search,
  argTypes: {
    showHistory: {
      control: { type: StorybookControl.boolean }
    },
    placeholder: {
      control: { type: StorybookControl.text }
    },
    onEnter: { type: StorybookControl.text, action: 'entered' }
  },
  tags: ['autodocs']
} as Meta<typeof Search>;

export default meta;

const Template: StoryFn<typeof Search> = args => ({
  components: { Search },
  setup() {
    return { args };
  },
  template: `<Search v-bind="args" /> `
});

export const Default = Template.bind({});

Default.args = {
  showHistroy: true,
  placeholder: 'Динозавры воскресли и стали курьерами доставки еды',
  onEnter: action('onEnter')
};
