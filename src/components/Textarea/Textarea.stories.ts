import { StoryFn, Meta } from '@storybook/vue3';
import Textarea from './Textarea.vue';
import { InputTypeEnum } from '../Input/enum/enum';
import { StorybookControlEnum } from '../../common/storybook';

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
    title: 'Текст'
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
      <Textarea v-bind="args" :disabled="args.class === 'disabled'" />
  `
});

export const TextareaDefault = Template.bind({});
TextareaDefault.args = {
  class: InputTypeEnum.inital
};

export const TextareaDisabled = Template.bind({});
TextareaDisabled.args = {
  class: InputTypeEnum.disabled
};

export const TextareaError = Template.bind({});
TextareaError.args = {
  class: InputTypeEnum.error
};

export const TextareaWarning = Template.bind({});
TextareaWarning.args = {
  class: InputTypeEnum.warning
};

export const TextareaSuccess = Template.bind({});
TextareaSuccess.args = {
  class: InputTypeEnum.success
};
