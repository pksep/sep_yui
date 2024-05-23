import { StoryFn, Meta, StoryObj } from '@storybook/vue3';
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
        summary: 'Hello'
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
      <Button v-bind="args" size="large">Hello</Button>
      <Button v-bind="args" size="medium">Button</Button>
      <Button v-bind="args" size="small">Button</Button>
    </div>
  `
});

export const Default: StoryFn<typeof Button> = args => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args">{{ args.content || "Hello" }}</Button>'
});

export const Primary = Template.bind({});

export const Secondary = Template.bind({});
