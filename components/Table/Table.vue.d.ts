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
    scrollWrapperRef: import('vue').Ref<({
        $: import('vue').ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            isShowVerticalScroll: boolean;
            isShowHorizontalScroll: boolean;
        }> & Omit<{
            readonly isShowVerticalScroll: boolean;
            readonly isShowHorizontalScroll: boolean;
            readonly "onUnmount-scroll"?: ((event: Event) => any) | undefined;
            readonly "onUnmount-paginate"?: ((isCanPagiante: boolean) => any) | undefined;
            readonly "onOn-mounted"?: (() => any) | undefined;
        } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, "isShowVerticalScroll" | "isShowHorizontalScroll">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import('vue').Slot<any> | undefined;
        }>;
        $root: import('vue').ComponentPublicInstance | null;
        $parent: import('vue').ComponentPublicInstance | null;
        $host: Element | null;
        $emit: ((event: "unmount-scroll", event: Event) => void) & ((event: "unmount-paginate", isCanPagiante: boolean) => void) & ((event: "on-mounted") => void);
        $el: any;
        $options: import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
            isShowVerticalScroll: {
                type: import('vue').PropType<boolean>;
                default: boolean;
            };
            isShowHorizontalScroll: {
                type: import('vue').PropType<boolean>;
                default: boolean;
            };
        }>> & Readonly<{
            "onUnmount-scroll"?: ((event: Event) => any) | undefined;
            "onUnmount-paginate"?: ((isCanPagiante: boolean) => any) | undefined;
            "onOn-mounted"?: (() => any) | undefined;
        }>, {
            scrollToTop: () => void;
            setHeightSlot: () => void;
            slotRef: import('vue').Ref<HTMLElement | null, HTMLElement | null>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
            "unmount-scroll": (event: Event) => void;
            "unmount-paginate": (isCanPagiante: boolean) => void;
            "on-mounted": () => void;
        }, string, {
            isShowVerticalScroll: boolean;
            isShowHorizontalScroll: boolean;
        }, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & {
            beforeCreate?: (() => void) | (() => void)[];
            created?: (() => void) | (() => void)[];
            beforeMount?: (() => void) | (() => void)[];
            mounted?: (() => void) | (() => void)[];
            beforeUpdate?: (() => void) | (() => void)[];
            updated?: (() => void) | (() => void)[];
            activated?: (() => void) | (() => void)[];
            deactivated?: (() => void) | (() => void)[];
            beforeDestroy?: (() => void) | (() => void)[];
            beforeUnmount?: (() => void) | (() => void)[];
            destroyed?: (() => void) | (() => void)[];
            unmounted?: (() => void) | (() => void)[];
            renderTracked?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
            renderTriggered?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
            errorCaptured?: ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void)[];
        };
        $forceUpdate: () => void;
        $nextTick: typeof import('vue').nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import('@vue/reactivity').OnCleanup]) => any : (...args: [any, any, import('@vue/reactivity').OnCleanup]) => any, options?: import('vue').WatchOptions): import('vue').WatchStopHandle;
    } & Readonly<{
        isShowVerticalScroll: boolean;
        isShowHorizontalScroll: boolean;
    }> & Omit<Readonly<import('vue').ExtractPropTypes<{
        isShowVerticalScroll: {
            type: import('vue').PropType<boolean>;
            default: boolean;
        };
        isShowHorizontalScroll: {
            type: import('vue').PropType<boolean>;
            default: boolean;
        };
    }>> & Readonly<{
        "onUnmount-scroll"?: ((event: Event) => any) | undefined;
        "onUnmount-paginate"?: ((isCanPagiante: boolean) => any) | undefined;
        "onOn-mounted"?: (() => any) | undefined;
    }>, "scrollToTop" | "setHeightSlot" | "slotRef" | ("isShowVerticalScroll" | "isShowHorizontalScroll")> & import('vue').ShallowUnwrapRef<{
        scrollToTop: () => void;
        setHeightSlot: () => void;
        slotRef: import('vue').Ref<HTMLElement | null, HTMLElement | null>;
    }> & {} & import('vue').ComponentCustomProperties & {} & {
        $slots: {
            default?(_: {}): any;
        };
    }) | null, ({
        $: import('vue').ComponentInternalInstance;
        $data: {};
        $props: Partial<{
            isShowVerticalScroll: boolean;
            isShowHorizontalScroll: boolean;
        }> & Omit<{
            readonly isShowVerticalScroll: boolean;
            readonly isShowHorizontalScroll: boolean;
            readonly "onUnmount-scroll"?: ((event: Event) => any) | undefined;
            readonly "onUnmount-paginate"?: ((isCanPagiante: boolean) => any) | undefined;
            readonly "onOn-mounted"?: (() => any) | undefined;
        } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, "isShowVerticalScroll" | "isShowHorizontalScroll">;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import('vue').Slot<any> | undefined;
        }>;
        $root: import('vue').ComponentPublicInstance | null;
        $parent: import('vue').ComponentPublicInstance | null;
        $host: Element | null;
        $emit: ((event: "unmount-scroll", event: Event) => void) & ((event: "unmount-paginate", isCanPagiante: boolean) => void) & ((event: "on-mounted") => void);
        $el: any;
        $options: import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
            isShowVerticalScroll: {
                type: import('vue').PropType<boolean>;
                default: boolean;
            };
            isShowHorizontalScroll: {
                type: import('vue').PropType<boolean>;
                default: boolean;
            };
        }>> & Readonly<{
            "onUnmount-scroll"?: ((event: Event) => any) | undefined;
            "onUnmount-paginate"?: ((isCanPagiante: boolean) => any) | undefined;
            "onOn-mounted"?: (() => any) | undefined;
        }>, {
            scrollToTop: () => void;
            setHeightSlot: () => void;
            slotRef: import('vue').Ref<HTMLElement | null, HTMLElement | null>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
            "unmount-scroll": (event: Event) => void;
            "unmount-paginate": (isCanPagiante: boolean) => void;
            "on-mounted": () => void;
        }, string, {
            isShowVerticalScroll: boolean;
            isShowHorizontalScroll: boolean;
        }, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & {
            beforeCreate?: (() => void) | (() => void)[];
            created?: (() => void) | (() => void)[];
            beforeMount?: (() => void) | (() => void)[];
            mounted?: (() => void) | (() => void)[];
            beforeUpdate?: (() => void) | (() => void)[];
            updated?: (() => void) | (() => void)[];
            activated?: (() => void) | (() => void)[];
            deactivated?: (() => void) | (() => void)[];
            beforeDestroy?: (() => void) | (() => void)[];
            beforeUnmount?: (() => void) | (() => void)[];
            destroyed?: (() => void) | (() => void)[];
            unmounted?: (() => void) | (() => void)[];
            renderTracked?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
            renderTriggered?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
            errorCaptured?: ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void)[];
        };
        $forceUpdate: () => void;
        $nextTick: typeof import('vue').nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import('@vue/reactivity').OnCleanup]) => any : (...args: [any, any, import('@vue/reactivity').OnCleanup]) => any, options?: import('vue').WatchOptions): import('vue').WatchStopHandle;
    } & Readonly<{
        isShowVerticalScroll: boolean;
        isShowHorizontalScroll: boolean;
    }> & Omit<Readonly<import('vue').ExtractPropTypes<{
        isShowVerticalScroll: {
            type: import('vue').PropType<boolean>;
            default: boolean;
        };
        isShowHorizontalScroll: {
            type: import('vue').PropType<boolean>;
            default: boolean;
        };
    }>> & Readonly<{
        "onUnmount-scroll"?: ((event: Event) => any) | undefined;
        "onUnmount-paginate"?: ((isCanPagiante: boolean) => any) | undefined;
        "onOn-mounted"?: (() => any) | undefined;
    }>, "scrollToTop" | "setHeightSlot" | "slotRef" | ("isShowVerticalScroll" | "isShowHorizontalScroll")> & import('vue').ShallowUnwrapRef<{
        scrollToTop: () => void;
        setHeightSlot: () => void;
        slotRef: import('vue').Ref<HTMLElement | null, HTMLElement | null>;
    }> & {} & import('vue').ComponentCustomProperties & {} & {
        $slots: {
            default?(_: {}): any;
        };
    }) | null>;
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
