
declare const _default: import('vue').DefineComponent<{
    modelValue: import('vue').PropType<Date | null>;
    disabled: {
        type: import('vue').PropType<boolean>;
    };
    range: {
        type: import('vue').PropType<import('./interfaces/interfaces').IRangeForDatePicker>;
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
    startDate: {
        type: import('vue').PropType<Date | null>;
    };
    endDate: {
        type: import('vue').PropType<Date | null>;
    };
    isRange: {
        type: import('vue').PropType<boolean>;
    };
    isSmall: {
        type: import('vue').PropType<boolean>;
    };
}, {
    clearChoose: () => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    clear: () => void;
    change: (value: Date | null) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: import('vue').PropType<Date | null>;
    disabled: {
        type: import('vue').PropType<boolean>;
    };
    range: {
        type: import('vue').PropType<import('./interfaces/interfaces').IRangeForDatePicker>;
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
    startDate: {
        type: import('vue').PropType<Date | null>;
    };
    endDate: {
        type: import('vue').PropType<Date | null>;
    };
    isRange: {
        type: import('vue').PropType<boolean>;
    };
    isSmall: {
        type: import('vue').PropType<boolean>;
    };
}>> & {
    onChange?: ((value: Date | null) => any) | undefined;
    onClear?: (() => any) | undefined;
}, {
    locale: string;
}, {}>;
export default _default;
