interface IDatePickerBaseProps {
  isRange?: boolean;
  isTable?: boolean;
  disabled?: boolean;
}

export interface IRangeForDatePicker {
  end: Date | null;
  start: Date | null;
}

export interface IDatePickerProps extends IDatePickerBaseProps {
  range?: IRangeForDatePicker;
  locale?: string;
  fromTodayTime?: boolean;
  setDate?: Date | null;
  startDate?: Date | null;
}

export interface IDatePickerChooserProps extends IDatePickerBaseProps {
  value: string;
  isActive: boolean;
}
