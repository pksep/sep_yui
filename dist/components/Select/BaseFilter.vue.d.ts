import { OptionsObject } from './interface/interface';

declare const _default: import('vue').DefineComponent<{
    modelValue: import('vue').PropType<string | string[]>;
    title: {
        type: import('vue').PropType<string>;
        required: true;
    };
    class: {
        type: import('vue').PropType<string>;
    };
    disabled: {
        type: import('vue').PropType<boolean>;
    };
    options: {
        type: import('vue').PropType<OptionsObject[] | import('./interface/interface').IOptionsObjectWithHint[]>;
        required: true;
    };
    defaultOption: {
        type: import('vue').PropType<string>;
        default: string;
    };
    isSearch: {
        type: import('vue').PropType<boolean>;
        default: boolean;
    };
    isPosibleToClear: {
        type: import('vue').PropType<boolean>;
        default: boolean;
    };
    isShowMiniOptions: {
        type: import('vue').PropType<boolean>;
        default: boolean;
    };
}, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (value: string | string[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: import('vue').PropType<string | string[]>;
    title: {
        type: import('vue').PropType<string>;
        required: true;
    };
    class: {
        type: import('vue').PropType<string>;
    };
    disabled: {
        type: import('vue').PropType<boolean>;
    };
    options: {
        type: import('vue').PropType<OptionsObject[] | import('./interface/interface').IOptionsObjectWithHint[]>;
        required: true;
    };
    defaultOption: {
        type: import('vue').PropType<string>;
        default: string;
    };
    isSearch: {
        type: import('vue').PropType<boolean>;
        default: boolean;
    };
    isPosibleToClear: {
        type: import('vue').PropType<boolean>;
        default: boolean;
    };
    isShowMiniOptions: {
        type: import('vue').PropType<boolean>;
        default: boolean;
    };
}>> & {
    onChange?: ((value: string | string[]) => any) | undefined;
}, {
    defaultOption: string;
    isSearch: boolean;
    isPosibleToClear: boolean;
    isShowMiniOptions: boolean;
}, {}>;
export default _default;
