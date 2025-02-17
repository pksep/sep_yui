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
  template: `<DatePicker />`
});

export const Default = DataPickerTemplate.bind({});
