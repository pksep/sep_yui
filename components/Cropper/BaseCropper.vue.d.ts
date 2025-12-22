import { IBaseCropperProps } from './interface';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IBaseCropperProps>, {
    max: number;
    min: number;
    step: number;
}>>, {
    cropImage: () => File | null;
    scalePlus: () => void;
    scaleMinus: () => void;
    setScale: (value: number) => void;
    startMove: (event: MouseEvent) => void;
    scaleImage: (event: WheelEvent) => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "unmount-scale": (value: number) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IBaseCropperProps>, {
    max: number;
    min: number;
    step: number;
}>>> & Readonly<{
    "onUnmount-scale"?: ((value: number) => any) | undefined;
}>, {
    max: number;
    min: number;
    step: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
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
