import { ITextareaProps } from './interface/interface';
import { TextareaTypeEnum } from './enum';

declare const _default: import('vue').DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<ITextareaProps>, {
    required: boolean;
    modelValue: string;
    readonly: boolean;
    type: TextareaTypeEnum;
}>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: string) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<ITextareaProps>, {
    required: boolean;
    modelValue: string;
    readonly: boolean;
    type: TextareaTypeEnum;
}>>> & {
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
}, {
    type: TextareaTypeEnum;
    required: boolean;
    modelValue: string;
    readonly: boolean;
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
