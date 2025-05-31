import { IDataTestIdProp } from '@/common/dataTestidProps';

interface IDatePickerBaseProps extends IDataTestIdProp {
  isRange?: boolean;
  isSmall?: boolean;
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
  lastDate?: boolean;
  setDate?: Date | null;
  startDate?: Date | null;
  endDate?: Date | null;
}

export interface IDatePickerChooserProps extends IDatePickerBaseProps {
  value: string;
  isActive: boolean;
}
