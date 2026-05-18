interface Props {
    items: unknown[];
    selectedIndex: number;
    isModal?: boolean;
    isFixed?: boolean;
    positionStyle?: Record<string, string>;
    getKey: (item: unknown, index: number) => string | number;
    getLabel: (item: unknown) => string;
    getSubtitle: (item: unknown) => string;
    getAvatarUrl: (item: unknown) => string;
    getAvatarInitials: (item: unknown) => string;
    getIsOnline: (item: unknown) => boolean;
}
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_TypePropsToRuntimeProps<Props>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    select: (item: unknown) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_TypePropsToRuntimeProps<Props>>> & Readonly<{
    onSelect?: ((item: unknown) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
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
