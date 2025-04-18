import { ToggleEnum } from './enums/enums.ts';

declare const _default: import('vue').DefineComponent<{
    modelValue: import('vue').PropType<boolean>;
    type: {
        type: import('vue').PropType<ToggleEnum>;
        default: ToggleEnum;
    };
    disabled: {
        type: import('vue').PropType<boolean>;
        default: boolean;
    };
    backgroundColor: {
        type: import('vue').PropType<string>;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (isChecked: boolean) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: import('vue').PropType<boolean>;
    type: {
        type: import('vue').PropType<ToggleEnum>;
        default: ToggleEnum;
    };
    disabled: {
        type: import('vue').PropType<boolean>;
        default: boolean;
    };
    backgroundColor: {
        type: import('vue').PropType<string>;
    };
}>> & {
    onChange?: ((isChecked: boolean) => any) | undefined;
}, {
    type: ToggleEnum;
    disabled: boolean;
}, {}>;
export default _default;
