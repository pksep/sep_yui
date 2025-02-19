import { StoryFn, Meta } from '@storybook/vue3';
import Calendar from './Calendar.vue';
import { getDate } from './date-utils';

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
  template: `<Calendar v-bind="args" />`
});

export const OneItem = CalendarTemplate.bind({});

export const OneItemSetDates = CalendarTemplate.bind({});
OneItemSetDates.args = {
  setDate: getDate({
    year: 2020,
    month: 12,
    day: 10
  })
};

export const DisabledOneItem = CalendarTemplate.bind({});
DisabledOneItem.args = {
  disabled: true
};

export const SeveralItems = CalendarTemplate.bind({});
SeveralItems.args = {
  range: true
};

export const SeveralItemsSetDates = CalendarTemplate.bind({});
SeveralItemsSetDates.args = {
  range: {
    start: getDate({
      year: 2020,
      month: 12,
      day: 10
    }),
    end: getDate({
      year: 2020,
      month: 1,
      day: 11
    })
  }
};
