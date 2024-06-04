import { StoryFn, Meta } from '@storybook/vue3';
import Toggle from './Toggle.vue';
import { StorybookControl } from '../../common/storybook';
import { fn } from '@storybook/test';

const meta = {
  title: 'Toggle/Toggle',
  component: Toggle,
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
} as Meta<typeof Toggle>;

export default meta;

const Template: StoryFn<typeof Toggle> = args => ({
  components: { Toggle },
  setup() {
    return { args };
  },
  template: `
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <Toggle v-bind="args"/>
    </div>
  `
});

export const Default: StoryFn<typeof Toggle> = args => ({
  components: { Toggle },
  setup() {
    return { args };
  },
  template: '<Toggle v-bind="args"/>'
});

export const PrimaryToggle = Template.bind({});
PrimaryToggle.args = {
  lang: false
};
