import { StoryFn, Meta } from '@storybook/vue3';
import Switch from './Switch.vue';
// import { StorybookControl } from '../../common/storybook';
// import { fn } from '@storybook/test';

const meta = {
  title: 'Switch/Switch',
  component: Switch,
  argTypes: {},
  tags: ['autodocs']
} as Meta<typeof Switch>;

export default meta;

const Template: StoryFn<typeof Switch> = args => ({
  components: { Switch },
  setup() {
    return { args };
  },
  template: `<Switch v-bind="args"/>`
});

export const Default = Template.bind({});
