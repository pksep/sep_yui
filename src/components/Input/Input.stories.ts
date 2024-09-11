import { StoryFn, Meta } from '@storybook/vue3';
import Input from './Input.vue';

const meta = {
  title: 'Input/Input',
  component: Input,
  argTypes: {},
  tags: ['autodocs']
} as Meta<typeof Input>;

export default meta;

const Template: StoryFn<typeof Input> = args => ({
  components: { Input },
  setup() {
    return { args };
  },
  template: `<Input v-bind="args" />`
});

export const Default = Template.bind({});
