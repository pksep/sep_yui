import { StoryFn, Meta } from '@storybook/vue3';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';
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

export const DateAndTimeWithConfirmation = CalendarTemplate.bind({});
DateAndTimeWithConfirmation.args = {
  title: 'Начало работ по операции',
  isSelectTime: true,
  setDate: new Date(2024, 6, 4, 9, 11),
  onChange: fn()
};
DateAndTimeWithConfirmation.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);
  const page = within(canvasElement.ownerDocument.body);
  const trigger = canvas.getByTestId('Calendar-DataPicker-Choose-Time-Trigger');

  await userEvent.click(trigger);
  await expect(
    page.getByRole('group', { name: 'Установка даты' })
  ).toBeVisible();
  const hours = page.getByRole('textbox', { name: 'Часы' });
  const minutes = page.getByRole('textbox', { name: 'Минуты' });
  await expect(hours).toHaveFocus();
  await userEvent.clear(hours);
  await userEvent.type(hours, '15');
  await userEvent.clear(minutes);
  await userEvent.type(minutes, '45');

  let day: HTMLButtonElement | undefined;
  await waitFor(() => {
    day = Array.from(
      page
        .getByTestId('Calendar-DataPicker-Component')
        .querySelector('col-cal-dates')
        ?.shadowRoot?.querySelectorAll<HTMLButtonElement>(
          'button.day:not(.disabled)'
        ) ?? []
    ).find(item => item.textContent?.trim() === '5');
    expect(day).toBeDefined();
  });
  await userEvent.click(day!);
  await expect(args.onChange).not.toHaveBeenCalled();
  await userEvent.click(page.getByRole('button', { name: 'Сохранить' }));
  await expect(args.onChange).toHaveBeenLastCalledWith(
    new Date(2024, 6, 5, 15, 45)
  );
  await expect(trigger).toHaveFocus();

  await userEvent.click(trigger);
  const clockSwitch = page.getByTestId('Calendar-DataPicker-Clock-Switch');
  await userEvent.click(clockSwitch.querySelector('svg path') ?? clockSwitch);
  await expect(clockSwitch).toHaveAttribute('aria-pressed', 'true');
  await userEvent.click(clockSwitch.querySelector('svg path') ?? clockSwitch);
  await expect(clockSwitch).toHaveAttribute('aria-pressed', 'false');
  await userEvent.click(page.getByRole('button', { name: 'Сбросить' }));
  await expect(args.onChange).toHaveBeenCalledTimes(1);
  await userEvent.click(page.getByRole('button', { name: 'Отменить' }));
  await userEvent.click(trigger);
  await expect(page.getByRole('textbox', { name: 'Часы' })).toHaveValue('15');
  await expect(page.getByRole('textbox', { name: 'Минуты' })).toHaveValue('45');
  await userEvent.click(page.getByRole('button', { name: 'Сбросить' }));
  await userEvent.click(page.getByRole('button', { name: 'Сохранить' }));
  await expect(args.onChange).toHaveBeenLastCalledWith(null);
};

export const SeveralItemsWithTitle = CalendarTemplate.bind({});
SeveralItemsWithTitle.args = {
  title: 'Начало работ по операции',
  isRange: true
};

export const RangeWithConfirmation = CalendarTemplate.bind({});
RangeWithConfirmation.args = {
  title: 'Начало работ по операции',
  isRange: true,
  range: {
    start: new Date(2024, 6, 4),
    end: new Date(2024, 6, 14)
  },
  onChange: fn()
};
RangeWithConfirmation.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);
  const page = within(canvasElement.ownerDocument.body);
  const trigger = canvas.getByTestId(
    'Calendar-DataPickerRange-Component-Start-Choose-HeaderBtn-Trigger'
  );
  const chooseDay = async (type: 'Start' | 'End', day: number) => {
    const calendar = page.getByTestId(
      `Calendar-DataPickerRange-Component-${type}-Component`
    );
    let button: HTMLButtonElement | undefined;
    await waitFor(() => {
      button = Array.from(
        calendar
          .querySelector('col-cal-dates')
          ?.shadowRoot?.querySelectorAll<HTMLButtonElement>(
            'button.day:not(.disabled)'
          ) ?? []
      ).find(item => item.textContent?.trim() === String(day));
      expect(button).toBeDefined();
    });
    await userEvent.click(button!);
  };

  await userEvent.click(trigger);
  await expect(page.getAllByRole('group')).toHaveLength(2);
  await chooseDay('Start', 5);
  await chooseDay('End', 10);
  await expect(args.onChange).not.toHaveBeenCalled();
  await userEvent.click(page.getByRole('button', { name: 'Сохранить' }));
  await expect(args.onChange).toHaveBeenLastCalledWith({
    start: new Date(2024, 6, 5),
    end: new Date(2024, 6, 10)
  });

  await userEvent.click(trigger);
  await chooseDay('Start', 6);
  await userEvent.click(page.getByRole('button', { name: 'Отменить' }));
  await expect(args.onChange).toHaveBeenCalledTimes(1);
  await expect(trigger).toHaveFocus();

  await userEvent.click(trigger);
  await userEvent.click(page.getByRole('button', { name: 'Сбросить' }));
  await expect(args.onChange).toHaveBeenCalledTimes(1);
  await userEvent.click(page.getByRole('button', { name: 'Сохранить' }));
  await expect(args.onChange).toHaveBeenLastCalledWith({
    start: null,
    end: null
  });
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
