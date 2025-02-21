export interface IRangeForDatePicker {
  end: Date | null;
  start: Date | null;
}
export interface IDatePickerProps {
  disabled?: boolean;
  range?: IRangeForDatePicker;
  isRange?: boolean;
  locale?: string;
  fromTodayTime?: boolean;
  setDate?: Date | null;
  startDate?: Date | null;
}

export interface IDatePickerChooserProps {
  disabled?: boolean;
  value: string;
  isActive: boolean;
}
