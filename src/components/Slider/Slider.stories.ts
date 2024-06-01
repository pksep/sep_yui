import { StoryFn, Meta } from '@storybook/vue3';
import Slider from './Slider.vue';
import { StorybookControl } from '../../common/storybook';
import { fn } from '@storybook/test';

const meta = {
  title: 'Slider/Slider',
  component: Slider,
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
} as Meta<typeof Slider>;

export default meta;

const Template: StoryFn<typeof Slider> = args => ({
  components: { Slider },
  setup() {
    return { args };
  },
  template: `
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <Slider v-bind="args"/>
    </div>
  `
});

export const Default: StoryFn<typeof Slider> = args => ({
  components: { Slider },
  setup() {
    return { args };
  },
  template: '<Slider v-bind="args"/>'
});

export const PrimarySlider = Template.bind({});
PrimarySlider.args = {
  lang: false
};
