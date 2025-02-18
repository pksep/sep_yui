interface IRangeForDatePicker {
  end: Date;
  start: Date;
}
export interface IDatePickerProps {
  disabled?: boolean;
  range?: boolean | IRangeForDatePicker;
}

export interface IDatePickerChooserProps {
  disabled?: boolean;
  value: string | Date | IRangeForDatePicker;
  isActive: boolean;
}
