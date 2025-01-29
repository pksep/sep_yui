import { StoryFn, Meta } from '@storybook/vue3';
import Picture from './Picture.vue';
import { PictureEnum } from './enums/enums';

const meta = {
  title: 'Picture/Picture',
  component: Picture,
  argTypes: {},
  tags: ['autodocs']
} as Meta<typeof Picture>;

export default meta;

const Template: StoryFn<typeof Picture> = args => ({
  components: { Picture },
  setup() {
    return { args };
  },
  template: `<Picture v-bind="args" style="width: 500px;"
 />`
});

export const PictureDefault = Template.bind({});

PictureDefault.args = {
  type: PictureEnum.img,
  url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/elephant-660-480.jpg',
  alt: 'elephant'
};

export const PictureNotImage = Template.bind({});

PictureNotImage.args = {
  type: PictureEnum.docx,
  caption: '.sldrt'
};
