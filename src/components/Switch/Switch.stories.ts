import { StoryFn, Meta } from '@storybook/vue3';
import Switch from './Switch.vue';
import { StorybookControl } from '../../common/storybook';
import { fn } from '@storybook/test';

const meta = {
  title: 'Switch/Switch',
  component: Switch,
  argTypes: {
    disabled: {
      control: { type: StorybookControl.boolean },
      defaultValue: false
    },
    lang: {
      control: { type: StorybookControl.boolean },
      defaultValue: false
    }
  },
  tags: ['autodocs'],
  args: { onClick: fn() }
} as Meta<typeof Switch>;

export default meta;

const Template: StoryFn<typeof Switch> = args => ({
  components: { Switch },
  setup() {
    return { args };
  },
  template: `
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <Switch v-bind="args"/>
    </div>
  `
});

export const Default: StoryFn<typeof Switch> = args => ({
  components: { Switch },
  setup() {
    return { args };
  },
  template: '<Switch v-bind="args"/>'
});

export const PrimarySwitch = Template.bind({});
PrimarySwitch.args = {
  lang: false
};
