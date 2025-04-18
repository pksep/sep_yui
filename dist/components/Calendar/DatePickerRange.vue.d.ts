import { IRangeForDatePicker } from './interfaces/interfaces';

declare const _default: import('vue').DefineComponent<{
    startDate: import('vue').PropType<any>;
    endDate: import('vue').PropType<any>;
    disabled: {
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
    setDate: {
        type: import('vue').PropType<Date | null>;
    };
    isRange: {
        type: import('vue').PropType<boolean>;
    };
    isSmall: {
        type: import('vue').PropType<boolean>;
    };
}, {
    clear: () => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (value: IRangeForDatePicker) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    startDate: import('vue').PropType<any>;
    endDate: import('vue').PropType<any>;
    disabled: {
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
    setDate: {
        type: import('vue').PropType<Date | null>;
    };
    isRange: {
        type: import('vue').PropType<boolean>;
    };
    isSmall: {
        type: import('vue').PropType<boolean>;
    };
}>> & {
    onChange?: ((value: IRangeForDatePicker) => any) | undefined;
}, {
    locale: string;
}, {}>;
export default _default;
