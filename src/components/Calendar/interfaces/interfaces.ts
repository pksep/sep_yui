interface IRangeForDatePicker {
  end: string;
  start: string;
}
export interface IDatePickerProps {
  disabled?: boolean;
  range?: IRangeForDatePicker;
  locale?: string;
  fromTodayTime?: boolean;
  setDate?: Date;
  startDate?: Date | string;
}

export interface IDatePickerChooserProps {
  disabled?: boolean;
  value: string;
  isActive: boolean;
}
