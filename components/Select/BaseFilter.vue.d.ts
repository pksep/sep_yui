import { OptionsObject } from './interface/interface';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: import('vue').PropType<string | string[]>;
    dataTestid: {
        type: import('vue').PropType<string>;
        default: string;
    };
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
    tooltipPosition: {
        type: import('vue').PropType<import('../Tooltip/interface/interface').TTooltipPosition>;
        default: string;
    };
    defaultOption: {
        type: import('vue').PropType<string>;
        default: string;
    };
    isOpened: {
        type: import('vue').PropType<boolean>;
        default: boolean;
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
    onUnmountPagination: {
        type: import('vue').PropType<() => void>;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (value: string | string[]) => void;
    "unmount-open": (value: boolean) => void;
    "unmount-search": (value: string) => void;
    "unmount-search-enter": (value: string) => void;
    "unmount-pagination": () => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: import('vue').PropType<string | string[]>;
    dataTestid: {
        type: import('vue').PropType<string>;
        default: string;
    };
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
    tooltipPosition: {
        type: import('vue').PropType<import('../Tooltip/interface/interface').TTooltipPosition>;
        default: string;
    };
    defaultOption: {
        type: import('vue').PropType<string>;
        default: string;
    };
    isOpened: {
        type: import('vue').PropType<boolean>;
        default: boolean;
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
    onUnmountPagination: {
        type: import('vue').PropType<() => void>;
    };
}>> & Readonly<{
    onChange?: ((value: string | string[]) => any) | undefined;
    "onUnmount-open"?: ((value: boolean) => any) | undefined;
    "onUnmount-search"?: ((value: string) => any) | undefined;
    "onUnmount-search-enter"?: ((value: string) => any) | undefined;
    "onUnmount-pagination"?: (() => any) | undefined;
}>, {
    dataTestid: string;
    tooltipPosition: import('../Tooltip/interface/interface').TTooltipPosition;
    defaultOption: string;
    isOpened: boolean;
    isSearch: boolean;
    isPosibleToClear: boolean;
    isShowMiniOptions: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
