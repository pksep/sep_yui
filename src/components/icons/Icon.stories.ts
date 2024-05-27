import { StoryFn, Meta } from '@storybook/vue3';
import Icon from './Icon.vue';
import { StorybookControl } from '../../common/storybook';
import { IconTypeEnum } from './enum';

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
    type: {
      control: { type: StorybookControl.select },
      options: IconTypeEnum
    }
  },
  tags: ['autodocs']
  // decorators: [() => ({ template: '<div style="margin: 3em;"><story/></div>' })]
} as Meta<typeof Icon>;

export default meta;

const Template: StoryFn<typeof Icon> = args => ({
  components: { Icon },
  setup() {
    return { args };
  },
  template: `
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <Icon v-bind="args" />
    </div>
  `
});

export const Default: StoryFn<typeof Icon> = args => ({
  components: { Icon },
  setup() {
    return { args };
  },
  template: '<Icon v-bind="args" />'
});

Default.args = {
  type: IconTypeEnum.notification
};
