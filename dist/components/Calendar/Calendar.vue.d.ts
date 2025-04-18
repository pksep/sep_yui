import { IDatePickerProps, IRangeForDatePicker } from './interfaces/interfaces';

declare const _default: import('vue').DefineComponent<__VLS_TypePropsToRuntimeProps<IDatePickerProps>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (value: Date | IRangeForDatePicker | null) => void;
    click: () => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_TypePropsToRuntimeProps<IDatePickerProps>>> & {
    onChange?: ((value: Date | IRangeForDatePicker | null) => any) | undefined;
    onClick?: (() => any) | undefined;
}, {}, {}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
