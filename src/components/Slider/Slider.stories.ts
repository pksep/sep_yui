import { StoryFn, Meta } from '@storybook/vue3';
import Slider from './Slider.vue';
// import { StorybookControl } from '../../common/storybook';
// import { fn } from '@storybook/test';

const meta = {
  title: 'Slider/Slider',
  component: Slider,
  argTypes: {},
  tags: ['autodocs']
} as Meta<typeof Slider>;

export default meta;

const Template: StoryFn<typeof Slider> = args => ({
  components: { Slider },
  setup() {
    return { args };
  },
  template: `<Slider v-bind="args"/>`
});

export const Default = Template.bind({});
