import { StoryFn, Meta } from '@storybook/vue3';
import Slider from './Slider.vue';
import { StorybookControl } from '../../common/storybook';

const files = [
  {
    path: 'https://www.sunhome.ru/i/wallpapers/14/loshadi-v4.orig.jpg'
  },
  {
    path: 'https://videocdn.cdnpk.net/joy/content/video/free/video0467/large_preview/_import_61557331a47cb7.87464437.mp4?filename=1109668_stairs_standard_dawn_1920x1080.mp4'
  },
  {
    path: 'https://www.sunhome.ru/i/wallpapers/210/voronie-loshadi.orig.jpg'
  }
];

const meta = {
  title: 'Slider/Slider',
  component: Slider,
  argTypes: {
    defaultIndex: {
      control: { type: StorybookControl.number }
    },
    items: {
      control: { type: StorybookControl.object }
    }
  },
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
} as Meta<typeof Slider>;

export default meta;

const Template: StoryFn<typeof Slider> = args => ({
  components: { Slider },
  setup() {
    return { args };
  },
  template: `<Slider v-bind="args" />`
});

export const Default = Template.bind({});
Default.args = {
  items: files,
  defaultIndex: 0
};
