import { StoryFn, Meta } from '@storybook/vue3';
import Icon from './Icon.vue';
import { StorybookControl } from '../../common/storybook';
import { IconNameEnum } from './enum';
import '@/assets/icons/sprite.ts';

const meta = {
  title: 'Icon/Icon',
  component: Icon,
  argTypes: {
    height: {
      control: { type: StorybookControl.number },
      defaultValue: 24
    },
    width: {
      control: { type: StorybookControl.number },
      defaultValue: 24
    },
    name: {
      control: { type: StorybookControl.select },
      options: IconNameEnum
    },
    color: {
      control: { type: StorybookControl.color }
    }
  },
  tags: ['autodocs']
} as Meta<typeof Icon>;

export default meta;

const Template: StoryFn<typeof Icon> = args => ({
  components: { Icon },
  setup() {
    return { args };
  },
  template: `
    <div style="display: flex; flex-direction: row; gap: 12px; color: args.color">
      <Icon v-bind="args" />
    </div>
  `
});

export const Default: StoryFn<typeof Icon> = args => ({
  components: { Icon },
  setup() {
    return { args };
  },
  template: `
  <div :style="{color: args.color}">
  <Icon v-bind="args" />
  </div>
  `
});

Default.args = {
  name: IconNameEnum.notification
};
