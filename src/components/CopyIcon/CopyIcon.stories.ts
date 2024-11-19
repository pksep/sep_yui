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
      description: 'контент для копии',
      defaultValue: ''
    }
  },
  tags: ['autodocs'],
  args: { onClick: fn() }
};

export default meta;

const Template: StoryFn<typeof CopyIcon> = args => ({
  setup() {
    return { args };
  },
  template: `
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <CopyIcon :content="args.content"/>
    </div>
  `
});

export const Default: StoryFn<typeof CopyIcon> = args => ({
  components: { CopyIcon },
  setup() {
    return { args };
  },
  template: '<CopyIcon v-bind="args"/>'
});
