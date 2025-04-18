declare const _default: import('vue').DefineComponent<{
    modelValue: import('vue').PropType<number>;
    disabled: {
        type: import('vue').PropType<boolean>;
        default: boolean;
    };
    min: {
        type: import('vue').PropType<number>;
        default: number;
    };
    max: {
        type: import('vue').PropType<number>;
        default: number;
    };
    step: {
        type: import('vue').PropType<number>;
        default: number;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "unmount-change": (value: number) => void;
    "unmount-input": (value: number) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: import('vue').PropType<number>;
    disabled: {
        type: import('vue').PropType<boolean>;
        default: boolean;
    };
    min: {
        type: import('vue').PropType<number>;
        default: number;
    };
    max: {
        type: import('vue').PropType<number>;
        default: number;
    };
    step: {
        type: import('vue').PropType<number>;
        default: number;
    };
}>> & {
    "onUnmount-change"?: ((value: number) => any) | undefined;
    "onUnmount-input"?: ((value: number) => any) | undefined;
}, {
    disabled: boolean;
    min: number;
    max: number;
    step: number;
}, {}>;
export default _default;
