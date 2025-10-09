import { ITableProps } from './interface/interface';

declare function __VLS_template(): {
    default?(_: {}): any;
    colspan?(_: {}): any;
    head?(_: {}): any;
    search?(_: {}): any;
    "body-group"?(_: {}): any;
    body?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<ITableProps>, {
    dataTestid: string;
    isShowHorizontalScroll: boolean;
    isShowVerticalScroll: boolean;
}>>, {
    scrollToTop: () => void;
    setHeightSlot: (() => void) | undefined;
    tbodyRef: import('vue').Ref<HTMLElement | null, HTMLElement | null>;
    tableRef: import('vue').Ref<HTMLElement | null, HTMLElement | null>;
    theadRef: import('vue').Ref<HTMLElement | null, HTMLElement | null>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "unmount-scroll": (event: Event) => void;
    "unmount-paginate": (isCanPaginate: boolean) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<ITableProps>, {
    dataTestid: string;
    isShowHorizontalScroll: boolean;
    isShowVerticalScroll: boolean;
}>>> & Readonly<{
    "onUnmount-scroll"?: ((event: Event) => any) | undefined;
    "onUnmount-paginate"?: ((isCanPaginate: boolean) => any) | undefined;
}>, {
    dataTestid: string;
    isShowVerticalScroll: boolean;
    isShowHorizontalScroll: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
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
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
