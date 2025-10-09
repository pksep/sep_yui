import { StoryFn, Meta } from '@storybook/vue3';
import TimePicker from './TimePicker.vue';
import type { ITimePickerProps } from './interface/interface';

const meta = {
  title: 'TimePicker/TimePicker',
  component: TimePicker,
  argTypes: {},
  args: {},
  tags: ['autodocs']
} as Meta<typeof TimePicker>;

export default meta;

const Template: StoryFn<typeof TimePicker> = (args: ITimePickerProps) => ({
  components: { TimePicker },
  setup() {
    return { args };
  },
  template: `
      <TimePicker v-bind="args" />
  `
});

export const TimePickerDefault = Template.bind({});
