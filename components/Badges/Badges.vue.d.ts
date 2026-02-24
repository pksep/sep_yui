import { IBadgesProps } from './interface/interface';
import { BadgesTypeEnum } from './enum/enum';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IBadgesProps>, {
    type: BadgesTypeEnum;
    choosed: boolean;
    disabled: boolean;
    dataTestid: string;
}>>, {
    isSpanOverflow: import('vue').Ref<boolean, boolean>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    choose: (state: boolean, value?: string | undefined) => void;
    remove: (value: string) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IBadgesProps>, {
    type: BadgesTypeEnum;
    choosed: boolean;
    disabled: boolean;
    dataTestid: string;
}>>> & Readonly<{
    onChoose?: ((state: boolean, value?: string | undefined) => any) | undefined;
    onRemove?: ((value: string) => any) | undefined;
}>, {
    dataTestid: string;
    type: BadgesTypeEnum;
    disabled: boolean;
    choosed: boolean;
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
