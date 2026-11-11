import { IDataTestIdProp } from '../../../common/dataTestidProps';

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
    /** Необязательный заголовок фильтра над полем выбора даты. */
    title?: string;
    range?: IRangeForDatePicker;
    /** Нижняя граница выбора периода, не заполняющая выбранные даты. */
    minDate?: Date | null;
    locale?: string;
    fromTodayTime?: boolean;
    toLastTime?: boolean;
    setDate?: Date | null;
    startDate?: Date | null;
    endDate?: Date | null;
    isSelectTime?: boolean;
}
export type DateTimePickerUnit = 'hours' | 'minutes';
export interface IDateTimePickerAddition {
    isOpen: boolean;
    value: number;
}
export interface IDateTimePickerAdditionalField {
    unit: DateTimePickerUnit;
    label: string;
    inputLabel: string;
    max: number;
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
    /** Keep wide calendar panels inside the viewport, including in dialogs. */
    fitViewport?: boolean;
}
export interface PopoverWrapperInstance {
    close: () => void;
}
export {};
