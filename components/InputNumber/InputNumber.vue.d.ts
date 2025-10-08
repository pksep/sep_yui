import { SizesEnum } from '../../common/sizes.ts';
import { IInputNumberProps } from './interface/interface.ts';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IInputNumberProps>, {
    modelValue: number;
    min: number;
    max: number;
    size: SizesEnum;
    dataTestid: string;
    isInteger: boolean;
    modelModifiers: () => {};
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: string | number) => void;
    focused: (event: FocusEvent) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IInputNumberProps>, {
    modelValue: number;
    min: number;
    max: number;
    size: SizesEnum;
    dataTestid: string;
    isInteger: boolean;
    modelModifiers: () => {};
}>>> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;
    onFocused?: ((event: FocusEvent) => any) | undefined;
}>, {
    dataTestid: string;
    size: SizesEnum.small | SizesEnum.medium;
    modelValue: number;
    max: number;
    min: number;
    modelModifiers: object;
    isInteger: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
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
