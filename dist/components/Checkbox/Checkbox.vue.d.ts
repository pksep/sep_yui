import { ICheckboxProps } from './interface/interface';
import { CheckboxSizeEnum, CheckboxCircularEnum } from './enum/enum';

declare const _default: import('vue').DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<ICheckboxProps>, {
    size: CheckboxSizeEnum;
    circular: CheckboxCircularEnum;
    modelValue: boolean;
    disabled: boolean;
}>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (isChecked: boolean) => void;
    "update:modelValue": (value: boolean) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<ICheckboxProps>, {
    size: CheckboxSizeEnum;
    circular: CheckboxCircularEnum;
    modelValue: boolean;
    disabled: boolean;
}>>> & {
    onChange?: ((isChecked: boolean) => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
}, {
    disabled: boolean;
    size: CheckboxSizeEnum;
    modelValue: boolean;
    circular: CheckboxCircularEnum;
}, {}>;
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
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
