import { IMenuProps } from './interface/interface';
import { MenuTypeEnum } from './enum/enum';
import { IChangeSwitchEmit } from '../Switch/interface/interface';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IMenuProps>, {
    dataTestid: string;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    click: (type: MenuTypeEnum) => void;
    themeChange: (value: boolean) => void;
    languageSwitch: (value: IChangeSwitchEmit) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IMenuProps>, {
    dataTestid: string;
}>>> & Readonly<{
    onClick?: ((type: MenuTypeEnum) => any) | undefined;
    onThemeChange?: ((value: boolean) => any) | undefined;
    onLanguageSwitch?: ((value: IChangeSwitchEmit) => any) | undefined;
}>, {
    dataTestid: string;
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
