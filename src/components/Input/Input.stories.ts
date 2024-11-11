import { StoryFn, Meta } from '@storybook/vue3';
import { StorybookControlEnum } from '../../common/storybook';
import { InputTypeEnum, TextFieldEnum } from './enum/enum';
import Input from './Input.vue';

const meta = {
  title: 'Input/Input',
  component: Input,
  argTypes: {
    class: {
      control: { type: StorybookControlEnum.select },
      options: InputTypeEnum
    },
    required: {
      control: { type: StorybookControlEnum.boolean },
      defaultValue: false
    }
  },
  args: {
    placeholder: 'Введите текст',
    type: TextFieldEnum.text,
    inputMessage: 'Текст'
  },
  tags: ['autodocs']
} as Meta<typeof Input>;

export default meta;

const Template: StoryFn<typeof Input> = args => ({
  components: { Input },
  setup() {
    return { args };
  },
  template: `<Input v-bind="args" :disabled="args.class === 'disabled'" />`
});

export const InputDefault = Template.bind({});
InputDefault.args = {
  class: InputTypeEnum.initial
};

export const InputDisabled = Template.bind({});
InputDisabled.args = {
  class: InputTypeEnum.disabled
};

export const InputError = Template.bind({});
InputError.args = {
  class: InputTypeEnum.error
};

export const InputWarning = Template.bind({});
InputWarning.args = {
  class: InputTypeEnum.warning
};

export const InputSuccess = Template.bind({});
InputSuccess.args = {
  class: InputTypeEnum.success
};
