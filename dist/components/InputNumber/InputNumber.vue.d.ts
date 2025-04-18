import { SizesEnum } from '../../common/sizes.ts';
import { IInputNumberProps } from './interface/interface.ts';

declare const _default: import('vue').DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IInputNumberProps>, {
    modelValue: number;
    min: number;
    max: number;
    size: SizesEnum;
}>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: number) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IInputNumberProps>, {
    modelValue: number;
    min: number;
    max: number;
    size: SizesEnum;
}>>> & {
    "onUpdate:modelValue"?: ((value: number) => any) | undefined;
}, {
    size: SizesEnum.small | SizesEnum.medium;
    modelValue: number;
    min: number;
    max: number;
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
