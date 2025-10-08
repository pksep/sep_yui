import { IRangeForDatePicker } from './interfaces/interfaces';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    startDate: import('vue').PropType<Date | null>;
    endDate: import('vue').PropType<Date | null>;
    dataTestid: {
        type: import('vue').PropType<string>;
        default: string;
    };
    disabled: {
        type: import('vue').PropType<boolean>;
    };
    isRange: {
        type: import('vue').PropType<boolean>;
    };
    isSmall: {
        type: import('vue').PropType<boolean>;
    };
    range: {
        type: import('vue').PropType<IRangeForDatePicker>;
    };
    locale: {
        type: import('vue').PropType<string>;
        default: string;
    };
    fromTodayTime: {
        type: import('vue').PropType<boolean>;
    };
    toLastTime: {
        type: import('vue').PropType<boolean>;
    };
    setDate: {
        type: import('vue').PropType<Date | null>;
    };
}>, {
    clear: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (value: IRangeForDatePicker) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    startDate: import('vue').PropType<Date | null>;
    endDate: import('vue').PropType<Date | null>;
    dataTestid: {
        type: import('vue').PropType<string>;
        default: string;
    };
    disabled: {
        type: import('vue').PropType<boolean>;
    };
    isRange: {
        type: import('vue').PropType<boolean>;
    };
    isSmall: {
        type: import('vue').PropType<boolean>;
    };
    range: {
        type: import('vue').PropType<IRangeForDatePicker>;
    };
    locale: {
        type: import('vue').PropType<string>;
        default: string;
    };
    fromTodayTime: {
        type: import('vue').PropType<boolean>;
    };
    toLastTime: {
        type: import('vue').PropType<boolean>;
    };
    setDate: {
        type: import('vue').PropType<Date | null>;
    };
}>> & Readonly<{
    onChange?: ((value: IRangeForDatePicker) => any) | undefined;
}>, {
    dataTestid: string;
    locale: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
