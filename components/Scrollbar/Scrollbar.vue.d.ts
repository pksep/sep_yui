import { IScrollbarProps } from './interface/scroll';

declare function __VLS_template(): {
    default?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IScrollbarProps>, {
    dataTestid: string;
}>>, {
    scrollToTop: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    scroll: (value: Event) => void;
    "ps-scroll-y": (value: Event) => void;
    "ps-scroll-x": (value: Event) => void;
    "ps-scroll-up": (value: Event) => void;
    "ps-scroll-down": (value: Event) => void;
    "ps-scroll-left": (value: Event) => void;
    "ps-scroll-right": (value: Event) => void;
    "ps-y-reach-start": (value: Event) => void;
    "ps-y-reach-end": (value: Event) => void;
    "ps-x-reach-start": (value: Event) => void;
    "ps-x-reach-end": (value: Event) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IScrollbarProps>, {
    dataTestid: string;
}>>> & Readonly<{
    onScroll?: ((value: Event) => any) | undefined;
    "onPs-scroll-y"?: ((value: Event) => any) | undefined;
    "onPs-scroll-x"?: ((value: Event) => any) | undefined;
    "onPs-scroll-up"?: ((value: Event) => any) | undefined;
    "onPs-scroll-down"?: ((value: Event) => any) | undefined;
    "onPs-scroll-left"?: ((value: Event) => any) | undefined;
    "onPs-scroll-right"?: ((value: Event) => any) | undefined;
    "onPs-y-reach-start"?: ((value: Event) => any) | undefined;
    "onPs-y-reach-end"?: ((value: Event) => any) | undefined;
    "onPs-x-reach-start"?: ((value: Event) => any) | undefined;
    "onPs-x-reach-end"?: ((value: Event) => any) | undefined;
}>, {
    dataTestid: string;
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
