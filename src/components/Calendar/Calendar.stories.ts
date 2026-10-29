import { StoryFn, Meta } from '@storybook/vue3';
import Calendar from './Calendar.vue';
import { getDate } from './date-utils';

const meta = {
  title: 'Calendar/Calendar',
  component: Calendar,
  argTypes: {
    title: {
      control: 'text',
      description:
        'Необязательный заголовок фильтра, отображаемый через Badges.'
    }
  },
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

export const OneItemWithTitle = CalendarTemplate.bind({});
OneItemWithTitle.args = {
  title: 'Установка начала работ',
  isSelectTime: true
};

export const SeveralItemsWithTitle = CalendarTemplate.bind({});
SeveralItemsWithTitle.args = {
  title: 'Начало работ по операции',
  isRange: true
};

export const OneItemWithLongTitle = CalendarTemplate.bind({});
OneItemWithLongTitle.args = {
  title: 'Дата требуемой готовности на операцию'
};

export const SeveralItemsWithLongTitle = CalendarTemplate.bind({});
SeveralItemsWithLongTitle.args = {
  title: 'Дата требуемой готовности на производственную операцию',
  isRange: true
};

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
  isRange: true
};

export const DisabledSeveralItems = CalendarTemplate.bind({});
DisabledSeveralItems.args = {
  disabled: true,
  isRange: true
};

export const SeveralItemsSetDates = CalendarTemplate.bind({});
SeveralItemsSetDates.args = {
  isRange: true,
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

export const SeveralItemsWithTodayTime = CalendarTemplate.bind({});
SeveralItemsWithTodayTime.args = {
  isRange: true,
  fromTodayTime: true
};

export const OneItemsLocale = CalendarTemplate.bind({});
OneItemsLocale.args = {
  locale: 'zh-HK'
};

export const SeveralItemsLocale = CalendarTemplate.bind({});
SeveralItemsLocale.args = {
  isRange: true,
  fromTodayTime: true,
  locale: 'zh-HK'
};

export const OneItemTableView = CalendarTemplate.bind({});
OneItemTableView.args = {
  isSmall: true
};
