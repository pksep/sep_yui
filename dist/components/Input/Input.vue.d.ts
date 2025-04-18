import { IInputProps } from './interface/interface.ts';
import { TextFieldEnum } from '../Input/enum/enum';

declare const _default: import('vue').DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IInputProps>, {
    type: TextFieldEnum;
    required: boolean;
    inputMessage: string;
    modelValue: string;
    hideClearButton: boolean;
}>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: string) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IInputProps>, {
    type: TextFieldEnum;
    required: boolean;
    inputMessage: string;
    modelValue: string;
    hideClearButton: boolean;
}>>> & {
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
}, {
    type: TextFieldEnum;
    required: boolean;
    modelValue: string;
    inputMessage: string;
    hideClearButton: boolean;
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
