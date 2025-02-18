import { StoryFn, Meta } from '@storybook/vue3';
import DatePicker from './DatePicker.vue';

const meta = {
  title: 'Calendar/DatePicker',
  component: DatePicker,
  argTypes: {},
  tags: ['autodocs']
} as Meta<typeof DatePicker>;

export default meta;

const DataPickerTemplate: StoryFn<typeof DatePicker> = args => ({
  components: { DatePicker },
  setup() {
    return { args };
  },
  template: `<DatePicker v-bind="args" />`
});

export const OneItem = DataPickerTemplate.bind({});

export const Disabled = DataPickerTemplate.bind({});
Disabled.args = {
  disabled: true
};

export const Range = DataPickerTemplate.bind({});
Range.args = {
  range: true
};
