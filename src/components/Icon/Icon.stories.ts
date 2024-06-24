import { StoryFn } from '@storybook/vue3';
import Icon from './Icon.vue';
import { StorybookControl } from '../../common/storybook';
import { IconNameEnum } from './enum';

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
};

export default meta;

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
