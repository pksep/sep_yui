import { ToggleEnum } from './enums/enums.ts';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: import('vue').PropType<boolean>;
    dataTestid: {
        type: import('vue').PropType<string>;
        default: string;
    };
    type: {
        type: import('vue').PropType<ToggleEnum>;
        default: ToggleEnum;
    };
    backgroundColor: {
        type: import('vue').PropType<string>;
    };
    disabled: {
        type: import('vue').PropType<boolean>;
        default: boolean;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (isChecked: boolean) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: import('vue').PropType<boolean>;
    dataTestid: {
        type: import('vue').PropType<string>;
        default: string;
    };
    type: {
        type: import('vue').PropType<ToggleEnum>;
        default: ToggleEnum;
    };
    backgroundColor: {
        type: import('vue').PropType<string>;
    };
    disabled: {
        type: import('vue').PropType<boolean>;
        default: boolean;
    };
}>> & Readonly<{
    onChange?: ((isChecked: boolean) => any) | undefined;
}>, {
    dataTestid: string;
    type: ToggleEnum;
    disabled: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
