import { StoryFn, Meta } from '@storybook/vue3';
import Button from './Button.vue';
import Icon from './../icons/Icon';
import { SizesEnum } from '../../common/sizes';
import { StorybookControl } from '../../common/storybook';
import { ButtonType } from './enum';
import { fn } from '@storybook/test';

const meta = {
  title: 'Button/Button',
  component: Button,
  argTypes: {
    disabled: {
      control: { type: StorybookControl.boolean },
      defaultValue: false
    },
    pill: {
      control: { type: StorybookControl.boolean },
      defaultValue: false
    },
    size: {
      control: { type: StorybookControl.radio },
      options: SizesEnum
    },
    type: {
      control: { type: StorybookControl.select },
      options: ButtonType
    },
    content: {
      control: { type: StorybookControl.text },
      description: 'Кастомный контент кнопки',
      defaultValue: {
        summary: 'Button'
      }
    }
  },
  tags: ['autodocs'],
  args: { onClick: fn() }
  // decorators: [() => ({ template: '<div style="margin: 3em;"><story/></div>' })]
} as Meta<typeof Button>;

export default meta;

const Template: StoryFn<typeof Button> = args => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: `
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <Button v-bind="args">Button</Button>
    </div>
  `
});

export const Default: StoryFn<typeof Button> = args => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args">{{ args.content || "Button" }}</Button>'
});

export const Primary = Template.bind({});
Primary.args = {
  type: ButtonType.primary
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: ButtonType.secondary
};

export const Outline = Template.bind({});
Outline.args = {
  type: ButtonType.outline
};

export const Ghost = Template.bind({});
Ghost.args = {
  type: ButtonType.ghost
};

export const BtnWithIcon: StoryFn<typeof Button> = args => ({
  components: { Button, Icon },
  setup() {
    return { args };
  },
  template:
    '<Button v-bind="args"><Icon v-bind="args" type="notification"  name="left-icon" />{{ args.content || "Button" }}<Icon v-bind="args" type="notification"  name="right-icon" /></Button>'
});
