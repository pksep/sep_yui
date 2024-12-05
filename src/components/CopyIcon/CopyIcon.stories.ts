import { StoryFn } from '@storybook/vue3';
import { StorybookControlEnum } from '../../common/storybook';
import { fn } from '@storybook/test';
import CopyIcon from './CopyIcon.vue';

const meta = {
  components: { CopyIcon },
  title: 'Icon/CopyIcon',
  component: CopyIcon,
  argTypes: {
    content: {
      control: { type: StorybookControlEnum.text },
      description: 'Контент для копии'
    }
  },
  tags: ['autodocs'],
  args: { onClick: fn() }
};

export default meta;

export const Default: StoryFn<typeof CopyIcon> = args => ({
  components: { CopyIcon },
  setup() {
    return { args };
  },
  template: '<CopyIcon v-bind="args"/>'
});
