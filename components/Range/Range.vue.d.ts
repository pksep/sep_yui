declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: import('vue').PropType<number>;
    dataTestid: {
        type: import('vue').PropType<string>;
        default: string;
    };
    disabled: {
        type: import('vue').PropType<boolean>;
        default: boolean;
    };
    max: {
        type: import('vue').PropType<number>;
        default: number;
    };
    min: {
        type: import('vue').PropType<number>;
        default: number;
    };
    step: {
        type: import('vue').PropType<number>;
        default: number;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "unmount-change": (value: number) => void;
    "unmount-input": (value: number) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: import('vue').PropType<number>;
    dataTestid: {
        type: import('vue').PropType<string>;
        default: string;
    };
    disabled: {
        type: import('vue').PropType<boolean>;
        default: boolean;
    };
    max: {
        type: import('vue').PropType<number>;
        default: number;
    };
    min: {
        type: import('vue').PropType<number>;
        default: number;
    };
    step: {
        type: import('vue').PropType<number>;
        default: number;
    };
}>> & Readonly<{
    "onUnmount-change"?: ((value: number) => any) | undefined;
    "onUnmount-input"?: ((value: number) => any) | undefined;
}>, {
    dataTestid: string;
    disabled: boolean;
    max: number;
    min: number;
    step: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
