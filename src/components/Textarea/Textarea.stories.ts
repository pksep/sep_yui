import { StoryFn, Meta } from '@storybook/vue3';
import Textarea from './Textarea.vue';
import { InputTypeEnum } from '../Input/enum/enum';
import { StorybookControlEnum, TextFieldTypes } from '../../common/storybook';

const meta = {
  title: 'Textarea/Textarea',
  component: Textarea,
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
    type: TextFieldTypes.text,
    inputMessage: 'Текст'
  },
  tags: ['autodocs']
} as Meta<typeof Textarea>;

export default meta;

const Template: StoryFn<typeof Textarea> = args => ({
  components: { Textarea },
  setup() {
    return { args };
  },
  template: `
      <Textarea v-bind="args"/>
  `
});

export const TextAreaDefault = Template.bind({});
TextAreaDefault.args = {
  class: InputTypeEnum.inital
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
