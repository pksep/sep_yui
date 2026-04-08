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
  toLastTime?: boolean;
  setDate?: Date | null;
  startDate?: Date | null;
  endDate?: Date | null;
  isSelectTime?: boolean;
}

export interface IDatePickerChooserProps extends IDatePickerBaseProps {
  value: string;
  isActive: boolean;
  isTimeSelect?: boolean;
}

export interface IRangeForDatePickerState {
  date: IRangeForDatePicker;
  isActive: boolean;
}

export interface IPopoverWrapperProps {
  placement?: 'top-start' | 'bottom-start';
  open?: boolean;
}

export interface PopoverWrapperInstance {
  close: () => void;
}
