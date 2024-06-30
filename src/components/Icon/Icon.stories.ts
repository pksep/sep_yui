import { StoryFn } from '@storybook/vue3';
import Icon from './Icon.vue';
import { StorybookControlEnum } from '../../common/storybook';
import { IconNameEnum } from './enum/enum';

const meta = {
  title: 'Icon/Icon',
  component: Icon,
  argTypes: {
    height: {
      control: { type: StorybookControlEnum.number },
      defaultValue: 24
    },
    width: {
      control: { type: StorybookControlEnum.number },
      defaultValue: 24
    },
    name: {
      control: { type: StorybookControlEnum.select },
      options: IconNameEnum
    },
    color: {
      control: { type: StorybookControlEnum.color }
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
