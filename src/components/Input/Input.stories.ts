import { StoryFn, Meta } from '@storybook/vue3';
import { StorybookControlEnum } from '../../common/storybook';
import { InputTypeEnum } from './enum/enum';
import Input from './Input.vue';

const meta = {
  title: 'Input/Input',
  component: Input,
  argTypes: {
    type: {
      control: { type: StorybookControlEnum.select },
      options: InputTypeEnum
    }
  },
  args: {
    placeholder: 'Введите текст',
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
  template: `<Input v-bind="args" :class="args.type" :disabled="args.type === 'disabled'" />`
});

export const InputDefault = Template.bind({});
InputDefault.args = {
  type: InputTypeEnum.inital
};


export const InputDisabled = Template.bind({});
InputDisabled.args = {
  type: InputTypeEnum.disabled
};


export const InputError = Template.bind({});
InputError.args = {
  type: InputTypeEnum.error
};

export const InputWarning = Template.bind({});
InputWarning.args = {
  type: InputTypeEnum.warning
};

export const InputSuccess = Template.bind({});
InputSuccess.args = {
  type: InputTypeEnum.success
};
