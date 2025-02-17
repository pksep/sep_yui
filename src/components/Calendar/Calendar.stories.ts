import { StoryFn, Meta } from '@storybook/vue3';
import Calendar from './Calendar.vue';

const meta = {
  title: 'Calendar/Calendar',
  component: Calendar,
  argTypes: {},
  tags: ['autodocs']
} as Meta<typeof Calendar>;

export default meta;

const CalendarTemplate: StoryFn<typeof Calendar> = args => ({
  components: { Calendar },
  setup() {
    return { args };
  },
  template: `<Calendar />`
});

export const Default = CalendarTemplate.bind({});
