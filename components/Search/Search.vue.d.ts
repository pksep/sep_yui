import { ISearchProps, ResultSearchType } from './interface/interface';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<ISearchProps>, {
    placeholder: string;
    height: string;
    modelValue: string;
    dataTestid: string;
    global: boolean;
    globalResultsFunction: () => never[];
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    enter: (value: string) => void;
    input: (value: string) => void;
    "update:modelValue": (value: string) => void;
    "choose-result": (value: ResultSearchType) => void;
    "scroll-paginate": () => void;
    choosed: (value: string) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<ISearchProps>, {
    placeholder: string;
    height: string;
    modelValue: string;
    dataTestid: string;
    global: boolean;
    globalResultsFunction: () => never[];
}>>> & Readonly<{
    onInput?: ((value: string) => any) | undefined;
    onChoosed?: ((value: string) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string) => any) | undefined;
    onEnter?: ((value: string) => any) | undefined;
    "onChoose-result"?: ((value: ResultSearchType) => any) | undefined;
    "onScroll-paginate"?: (() => any) | undefined;
}>, {
    height: string;
    dataTestid: string;
    placeholder: string;
    modelValue: string;
    global: boolean;
    globalResultsFunction: ResultSearchType[];
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
