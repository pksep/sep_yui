interface IRangeForDatePicker {
    end: Date;
    start: Date;
}
export interface IDatePickerProps {
    disabled?: boolean;
    range?: boolean | IRangeForDatePicker;
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
