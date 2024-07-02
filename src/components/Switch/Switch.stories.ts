import { StoryFn, Meta } from '@storybook/vue3';
import Switch from './Switch.vue';
import { StorybookControlEnum } from '../../common/storybook';

const items = ['text1', 'text2', 'text3'];

const meta = {
  title: 'Switch/Switch',
  component: Switch,
  argTypes: {
    items: {
      control: { type: StorybookControlEnum.object }
    }
  },
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
Default.args = {
  items: items
};
