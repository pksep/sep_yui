declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: import('vue').PropType<string | null | Date>;
    dataTestid: {
        type: import('vue').PropType<string>;
        default: string;
    };
    value: {
        type: import('vue').PropType<string>;
        required: true;
    };
    disabled: {
        type: import('vue').PropType<boolean>;
    };
    isRange: {
        type: import('vue').PropType<boolean>;
    };
    isSmall: {
        type: import('vue').PropType<boolean>;
    };
    isActive: {
        type: import('vue').PropType<boolean>;
        required: true;
    };
    isTimeSelect: {
        type: import('vue').PropType<boolean>;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    clear: () => void;
    click: () => void;
    change: (value: string | Date | null | undefined) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: import('vue').PropType<string | null | Date>;
    dataTestid: {
        type: import('vue').PropType<string>;
        default: string;
    };
    value: {
        type: import('vue').PropType<string>;
        required: true;
    };
    disabled: {
        type: import('vue').PropType<boolean>;
    };
    isRange: {
        type: import('vue').PropType<boolean>;
    };
    isSmall: {
        type: import('vue').PropType<boolean>;
    };
    isActive: {
        type: import('vue').PropType<boolean>;
        required: true;
    };
    isTimeSelect: {
        type: import('vue').PropType<boolean>;
    };
}>> & Readonly<{
    onChange?: ((value: string | Date | null | undefined) => any) | undefined;
    onClick?: (() => any) | undefined;
    onClear?: (() => any) | undefined;
}>, {
    dataTestid: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
