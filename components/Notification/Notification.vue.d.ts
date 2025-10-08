import { MessageTypeEnum } from './enum/enum';
import { IPushNotificationProps } from './interface/interface';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IPushNotificationProps>, {
    type: MessageTypeEnum;
    description: string;
    timeout: number;
    showPopover: boolean;
    dataTestid: string;
}>>, {
    showPopover: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    close: () => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IPushNotificationProps>, {
    type: MessageTypeEnum;
    description: string;
    timeout: number;
    showPopover: boolean;
    dataTestid: string;
}>>> & Readonly<{
    onClose?: (() => any) | undefined;
}>, {
    dataTestid: string;
    type: MessageTypeEnum;
    showPopover: boolean;
    description: string;
    timeout: number;
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
