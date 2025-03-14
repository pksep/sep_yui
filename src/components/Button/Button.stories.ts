import { StoryFn } from '@storybook/vue3';
import Button from './Button.vue';
import Icon from '../Icon/Icon.vue';
import { SizesEnum } from '../../common/sizes';
import { ColorsEnum } from '../../common/colors';
import { StorybookControlEnum } from '../../common/storybook';
import { ButtonTypeEnum } from './enum/enum';
import { fn } from '@storybook/test';
import { IconNameEnum } from '../Icon/enum/enum';

const meta = {
  title: 'Button/Button',
  component: Button,
  argTypes: {
    disabled: {
      control: { type: StorybookControlEnum.boolean },
      defaultValue: false
    },
    pill: {
      control: { type: StorybookControlEnum.boolean },
      defaultValue: false
    },
    size: {
      control: { type: StorybookControlEnum.radio },
      options: SizesEnum
    },
    type: {
      control: { type: StorybookControlEnum.select },
      options: ButtonTypeEnum
    },
    content: {
      control: { type: StorybookControlEnum.text },
      description: 'Кастомный контент кнопки',
      defaultValue: {
        summary: 'Button'
      }
    },
    iconName: {
      control: { type: StorybookControlEnum.select },
      description: 'Имя иконки',
      options: IconNameEnum
    },
    iconPosition: {
      control: { type: StorybookControlEnum.radio },
      options: ['left', 'right'],
      description: 'Позиция иконки',
      defaultValue: 'left'
    },
    iconColor: {
      control: { type: StorybookControlEnum.select },
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
      <Icon width="16" height="16" v-if="args.iconPosition === 'left'" :name="args.iconName"/>
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
  type: ButtonTypeEnum.primary
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: ButtonTypeEnum.secondary
};

export const Outline = Template.bind({});
Outline.args = {
  type: ButtonTypeEnum.outline
};

export const Ghost = Template.bind({});
Ghost.args = {
  type: ButtonTypeEnum.ghost
};

export const Reject = Template.bind({});
Ghost.args = {
  type: ButtonTypeEnum.reject
};

export const BtnWithIcon = Template.bind({});
BtnWithIcon.args = {
  type: ButtonTypeEnum.primary,
  iconName: 'plus',
  iconPosition: 'left',
  content: 'Button with Icon'
};

export const BtnWithCloudIcon = Template.bind({});
BtnWithCloudIcon.args = {
  type: ButtonTypeEnum.outline,
  iconName: 'upload-cloud',
  iconPosition: 'left',
  content: 'Button with CloudIcon'
};

export const BtnWithArchiveIcon = Template.bind({});
BtnWithArchiveIcon.args = {
  type: ButtonTypeEnum.primary,
  iconName: 'archive',
  iconPosition: 'left',
  content: 'Button with archive'
};

export const BtnWithEditingIcon = Template.bind({});
BtnWithEditingIcon.args = {
  type: ButtonTypeEnum.primary,
  iconName: 'editing',
  iconPosition: 'left',
  content: 'Button with editing'
};
