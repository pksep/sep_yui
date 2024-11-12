import { StoryFn, Meta } from '@storybook/vue3';
import { StorybookControlEnum } from '../../common/storybook';
import { InputTypeEnum } from './enum/enum';
import InputNumber from './InputNumber.vue';

const meta = {
  title: 'InputNumber/InputNumber',
  component: InputNumber,
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
    inputMessage: 'Текст'
  },
  tags: ['autodocs']
} as Meta<typeof InputNumber>;

export default meta;

const Template: StoryFn<typeof InputNumber> = args => ({
  components: { InputNumber },
  setup() {
    return { args };
  },
  template: `<InputNumber v-bind="args" :disabled="args.class === 'disabled'" />`
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

export const InputOrdinary = Template.bind({});
InputOrdinary.args = {
  class: InputTypeEnum.ordinary
};
