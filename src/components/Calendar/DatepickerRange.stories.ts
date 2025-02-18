import { StoryFn, Meta } from '@storybook/vue3';
import DatePickerRange from './DatePickerRange.vue';

const meta = {
  title: 'Calendar/DatePickerRange',
  component: DatePickerRange,
  argTypes: {},
  tags: ['autodocs']
} as Meta<typeof DatePickerRange>;

export default meta;

const DataPickerRangeTemplate: StoryFn<typeof DatePickerRange> = args => ({
  components: { DatePickerRange },
  setup() {
    return { args };
  },
  template: `<DatePickerRange />`
});

export const Default = DataPickerRangeTemplate.bind({});
