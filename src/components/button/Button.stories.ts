import { StoryFn, Meta } from '@storybook/vue3';
import Button from './Button.vue';
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
