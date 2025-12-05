import { StoryFn, Meta } from '@storybook/vue3';
import { StorybookControlEnum } from '../../common/storybook';
import Checkbox from './Checkbox.vue';
import {
  CheckboxSizeEnum,
  CheckboxCircularEnum,
  CheckboxColorEnum
} from './enum/enum';

const meta = {
  title: 'Checkbox/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: StorybookControlEnum.select },
      options: CheckboxSizeEnum
    },
    circular: {
      control: { type: StorybookControlEnum.select },
      options: CheckboxCircularEnum
    },
    color: {
      control: { type: StorybookControlEnum.select },
      options: CheckboxColorEnum
    }
  }
} as Meta<typeof Checkbox>;

export default meta;

const Template: StoryFn<typeof Checkbox> = args => ({
  components: { Checkbox },
  setup() {
    return { args };
  },
  template: `
    <Checkbox v-bind="args" />
  `
});

export const Default = Template.bind({});
