import { StoryFn } from '@storybook/vue3';
import Button from './Button.vue';
import Icon from '../Icon/Icon.vue';
import { SizesEnum } from '../../common/sizes';
import { ColorsEnum } from '../../common/colors';
import { StorybookControl } from '../../common/storybook';
import { ButtonType } from './enum/enum';
import { fn } from '@storybook/test';
import { IconNameEnum } from '../Icon/enum/enum';

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
    },
    iconName: {
      control: { type: StorybookControl.select },
      description: 'Имя иконки',
      options: IconNameEnum
    },
    iconPosition: {
      control: { type: StorybookControl.radio },
      options: ['left', 'right'],
      description: 'Позиция иконки',
      defaultValue: 'left'
    },
    iconColor: {
      control: { type: StorybookControl.select },
      description: 'Цвет иконки',
      options: ColorsEnum
    }
  },
  tags: ['autodocs'],
  args: { onClick: fn() }
};

export default meta;

const Template: StoryFn<typeof Button> = args => ({
  components: { Button, Icon },
  setup() {
    return { args };
  },
  template: `
    <div style="display: flex; flex-direction: row; gap: 12px;">
      <Button v-bind="args" :color="args.iconColor">
      <template v-slot:left-icon>
      <Icon v-if="args.iconPosition === 'left'" :name="args.iconName"/>
    </template>
    {{ args.content || 'Button' }}
      <template v-slot:right-icon>
      <Icon v-if="args.iconPosition === 'right'" :name="args.iconName"/>
    </template>
      </Button>
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

export const BtnWithIcon = Template.bind({});
BtnWithIcon.args = {
  type: ButtonType.primary,
  iconName: 'arrowLeft',
  iconPosition: 'left',
  content: 'Button with Icon'
};
