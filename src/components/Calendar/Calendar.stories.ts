import { StoryFn, Meta } from '@storybook/vue3';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';
import Calendar from './Calendar.vue';
import { getDate } from './date-utils';

const meta = {
  title: 'Calendar/Calendar',
  component: Calendar,
  argTypes: {
    initialAdditionalHours: {
      control: 'number',
      description:
        'Начальное смещение в дробных часах, включая отрицательные значения.'
    },
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

  /** Выбирает день через настоящий календарь, включая его shadow DOM. */
  const chooseDay = async (number: number): Promise<void> => {
    let day: HTMLButtonElement | undefined;

    // Ждём отрисовки web component перед нажатием на день.
    await waitFor(() => {
      day = Array.from(
        page
          .getByTestId('Calendar-DataPicker-Component')
          .querySelector('col-cal-dates')
          ?.shadowRoot?.querySelectorAll<HTMLButtonElement>(
            'button.day:not(.disabled)'
          ) ?? []
      ).find(item => item.textContent?.trim() === String(number));
      expect(day).toBeDefined();
    });
    await userEvent.click(day!);
  };

  // Повторный выбор того же дня сохраняет введённые часы и минуты.
  await chooseDay(4);
  await expect(hours).toHaveValue('15');
  await expect(minutes).toHaveValue('45');

  // Новый день сбрасывает прежнее время только в черновике.
  await chooseDay(5);
  await expect(hours).toHaveValue('08');
  await expect(minutes).toHaveValue('00');
  await expect(args.onChange).not.toHaveBeenCalled();
  await userEvent.click(page.getByRole('button', { name: 'Сохранить' }));
  await expect(args.onChange).toHaveBeenLastCalledWith(new Date(2024, 6, 5, 8));
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
  await expect(page.getByRole('textbox', { name: 'Часы' })).toHaveValue('08');
  await expect(page.getByRole('textbox', { name: 'Минуты' })).toHaveValue('0');
  await userEvent.click(page.getByRole('button', { name: 'Сбросить' }));
  await userEvent.click(page.getByRole('button', { name: 'Сохранить' }));
  await expect(args.onChange).toHaveBeenLastCalledWith(null);
};

export const DateAndTimeWithAddition = CalendarTemplate.bind({});
DateAndTimeWithAddition.args = {
  title: 'Начало работ по операции',
  isSelectTime: true,
  setDate: new Date(2024, 6, 4, 23, 45),
  onChange: fn()
};
DateAndTimeWithAddition.play = async ({
  canvasElement,
  args
}): Promise<void> => {
  const canvas = within(canvasElement);
  const page = within(canvasElement.ownerDocument.body);
  const trigger = canvas.getByTestId('Calendar-DataPicker-Choose-Time-Trigger');

  // Поле видно сразу; сохранение применяет смещение только один раз.
  await userEvent.click(trigger);
  await expect(
    page.queryByTestId('Calendar-DataPicker-Choose-Add-time')
  ).not.toBeInTheDocument();
  const duration = page.getByRole('textbox', {
    name: 'Смещение времени в часах'
  });
  await expect(duration).toHaveValue('0');
  await userEvent.clear(duration);
  await userEvent.type(duration, '1,50');
  await expect(page.getByRole('textbox', { name: 'Часы' })).toHaveValue('23');
  await expect(args.onChange).not.toHaveBeenCalled();
  await userEvent.keyboard('{Enter}');
  const expectedDate = new Date(2024, 6, 5, 1, 15);
  await expect(args.onChange).toHaveBeenLastCalledWith(expectedDate);
  await expect(args.onChange).toHaveBeenCalledTimes(1);

  // При повторном открытии поле остаётся видимым и начинается с нуля.
  await userEvent.click(trigger);
  const reopenedDuration = page.getByRole('textbox', {
    name: 'Смещение времени в часах'
  });
  await expect(reopenedDuration).toHaveValue('0');
  await userEvent.clear(reopenedDuration);
  await userEvent.type(reopenedDuration, '-1,50');
  await userEvent.keyboard('{Enter}');
  await expect(args.onChange).toHaveBeenLastCalledWith(
    new Date(2024, 6, 4, 23, 45)
  );

  // Отмена отбрасывает отрицательное смещение без изменения даты.
  await userEvent.click(trigger);
  await userEvent.type(
    page.getByRole('textbox', { name: 'Смещение времени в часах' }),
    '-2,25'
  );
  await userEvent.click(page.getByRole('button', { name: 'Отменить' }));
  await expect(args.onChange).toHaveBeenCalledTimes(2);

  await userEvent.click(trigger);
  await userEvent.click(page.getByRole('button', { name: 'Сбросить' }));
  await expect(
    page.getByRole('textbox', { name: 'Смещение времени в часах' })
  ).toHaveValue('0');
  await userEvent.click(page.getByRole('button', { name: 'Сохранить' }));
  await expect(args.onChange).toHaveBeenLastCalledWith(null);
};

export const DateAndTimeWithInitialAddition = CalendarTemplate.bind({});
DateAndTimeWithInitialAddition.args = {
  title: 'Начало работ по операции',
  isSelectTime: true,
  setDate: new Date(2024, 6, 4, 23, 45),
  initialAdditionalHours: 1.5,
  onChange: fn()
};
DateAndTimeWithInitialAddition.play = async ({
  canvasElement,
  args
}): Promise<void> => {
  const canvas = within(canvasElement);
  const page = within(canvasElement.ownerDocument.body);
  const trigger = canvas.getByTestId('Calendar-DataPicker-Choose-Time-Trigger');

  // Переданное смещение видно сразу и не сохраняет дату до подтверждения.
  await userEvent.click(trigger);
  const input = page.getByRole('textbox', { name: 'Смещение времени в часах' });
  await expect(input).toHaveValue('1.5');
  await expect(args.onChange).not.toHaveBeenCalled();
  await userEvent.clear(input);
  await userEvent.type(input, '2,25');
  await userEvent.click(trigger);
  await expect(input).toHaveValue('2.25');
  await userEvent.click(page.getByRole('button', { name: 'Отменить' }));
  await expect(args.onChange).not.toHaveBeenCalled();

  // После отмены новое открытие снова использует предложение родителя.
  await userEvent.click(trigger);
  await expect(
    page.getByRole('textbox', { name: 'Смещение времени в часах' })
  ).toHaveValue('1.5');
  await userEvent.click(page.getByRole('button', { name: 'Сохранить' }));
  await expect(args.onChange).toHaveBeenLastCalledWith(
    new Date(2024, 6, 5, 1, 15)
  );
  await expect(args.onChange).toHaveBeenCalledTimes(1);
};

export const DateAndTimeWithZeroInitialAddition = CalendarTemplate.bind({});
DateAndTimeWithZeroInitialAddition.args = {
  isSelectTime: true,
  setDate: new Date(2024, 6, 4, 10, 18),
  initialAdditionalHours: 0,
  onChange: fn()
};
DateAndTimeWithZeroInitialAddition.play = async ({
  canvasElement,
  args
}): Promise<void> => {
  const canvas = within(canvasElement);
  const page = within(canvasElement.ownerDocument.body);

  // Явный ноль сохраняет исходное время при подтверждении.
  await userEvent.click(
    canvas.getByTestId('Calendar-DataPicker-Choose-Time-Trigger')
  );
  await expect(
    page.getByRole('textbox', { name: 'Смещение времени в часах' })
  ).toHaveValue('0');
  await userEvent.click(page.getByRole('button', { name: 'Сохранить' }));
  await expect(args.onChange).toHaveBeenLastCalledWith(
    new Date(2024, 6, 4, 10, 18)
  );
};

export const DateAndTimeAdditionLimits = CalendarTemplate.bind({});
DateAndTimeAdditionLimits.args = {
  isSelectTime: true,
  setDate: new Date(2024, 6, 4, 23, 45),
  startDate: new Date(2024, 6, 4),
  endDate: new Date(2024, 6, 4),
  onChange: fn()
};
DateAndTimeAdditionLimits.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);
  const page = within(canvasElement.ownerDocument.body);

  await userEvent.click(
    canvas.getByTestId('Calendar-DataPicker-Choose-Time-Trigger')
  );
  const duration = page.getByRole('textbox', {
    name: 'Смещение времени в часах'
  });
  await userEvent.clear(duration);
  await userEvent.type(duration, '1,50');
  await expect(page.getByRole('button', { name: 'Сохранить' })).toBeDisabled();
  await userEvent.keyboard('{Enter}');
  await expect(args.onChange).not.toHaveBeenCalled();

  // 0,23 часа округляются до 14 минут и остаются в пределах выбранного дня.
  await userEvent.clear(duration);
  await userEvent.type(duration, '0,23');
  await expect(page.getByRole('button', { name: 'Сохранить' })).toBeEnabled();
  await userEvent.keyboard('{Enter}');
  await expect(args.onChange).toHaveBeenLastCalledWith(
    new Date(2024, 6, 4, 23, 59)
  );
};

export const DateAndTimeWithAdditionEnglish = CalendarTemplate.bind({});
DateAndTimeWithAdditionEnglish.args = {
  isSelectTime: true,
  locale: 'en-US',
  setDate: new Date(2024, 6, 4, 10, 18),
  onChange: fn()
};
DateAndTimeWithAdditionEnglish.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);
  const page = within(canvasElement.ownerDocument.body);

  await userEvent.click(
    canvas.getByTestId('Calendar-DataPicker-Choose-Time-Trigger')
  );
  const duration = page.getByRole('textbox', { name: 'Time offset in hours' });
  await userEvent.clear(duration);
  await userEvent.type(duration, '2.50');
  await userEvent.keyboard('{Enter}');
  await expect(args.onChange).toHaveBeenLastCalledWith(
    new Date(2024, 6, 4, 12, 48)
  );

  // Enter в основном поле сохраняет новую дату без прежней прибавки.
  await userEvent.click(
    canvas.getByTestId('Calendar-DataPicker-Choose-Time-Trigger')
  );
  const selectedHours = page.getByRole('textbox', { name: 'Hours' });
  await userEvent.clear(selectedHours);
  await userEvent.type(selectedHours, '13');
  await userEvent.keyboard('{Enter}');
  await expect(args.onChange).toHaveBeenLastCalledWith(
    new Date(2024, 6, 4, 13, 48)
  );
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
