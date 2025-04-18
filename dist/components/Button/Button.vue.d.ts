import { SizesEnum } from '../../common/sizes';
import { IButtonProps } from './interface/interface';
import { ButtonTypeEnum } from './enum/enum';

declare function __VLS_template(): {
    "left-icon"?(_: {}): any;
    default?(_: {}): any;
    "right-icon"?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IButtonProps>, {
    disabled: boolean;
    size: SizesEnum;
    type: ButtonTypeEnum;
    pill: boolean;
    color: string;
}>, {}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    click: (event: MouseEvent | KeyboardEvent) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IButtonProps>, {
    disabled: boolean;
    size: SizesEnum;
    type: ButtonTypeEnum;
    pill: boolean;
    color: string;
}>>> & {
    onClick?: ((event: MouseEvent | KeyboardEvent) => any) | undefined;
}, {
    color: string;
    type: ButtonTypeEnum;
    disabled: boolean;
    size: SizesEnum.small | SizesEnum.medium | SizesEnum.large;
    pill: boolean;
}, {}>;
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
