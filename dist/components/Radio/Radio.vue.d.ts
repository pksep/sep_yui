import { IRadioProps } from './interface/interface';

declare const _default: <T>(__VLS_props: Awaited<typeof __VLS_setup>["props"], __VLS_ctx?: __VLS_Prettify<Pick<Awaited<typeof __VLS_setup>, "attrs" | "emit" | "slots">>, __VLS_expose?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
    props: __VLS_Prettify<__VLS_OmitKeepDiscriminatedUnion<(Partial<{}> & Omit<{} & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{}>>, never>) & (IRadioProps<T> & {
        modelValue?: any;
    }), keyof import('vue').VNodeProps | keyof import('vue').AllowedComponentProps>> & {} & (import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps);
    expose(exposed: import('vue').ShallowUnwrapRef<{}>): void;
    attrs: any;
    slots: ReturnType<() => {}>;
    emit: typeof __VLS_emit;
}>) => import('vue').VNode<import('vue').RendererNode, import('vue').RendererElement, {
    [key: string]: any;
}> & {
    __ctx?: Awaited<typeof __VLS_setup>;
};
export default _default;
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
