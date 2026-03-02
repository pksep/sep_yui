
declare function __VLS_template(): {
    action?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: import('vue').PropType<string>;
    activeAttachFile: {
        type: import('vue').PropType<boolean>;
        required: true;
    };
    activeSend: {
        type: import('vue').PropType<boolean>;
    };
    disableSendOnEnter: {
        type: import('vue').PropType<boolean>;
    };
}>, {
    addSpanLink: (content: string) => void;
    focus: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "unmount-send": (params: {
        content?: string;
    }) => void;
    "unmount-attach-file": (files: FileList, onlyMedia: boolean) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: import('vue').PropType<string>;
    activeAttachFile: {
        type: import('vue').PropType<boolean>;
        required: true;
    };
    activeSend: {
        type: import('vue').PropType<boolean>;
    };
    disableSendOnEnter: {
        type: import('vue').PropType<boolean>;
    };
}>> & Readonly<{
    "onUnmount-send"?: ((params: {
        content?: string;
    }) => any) | undefined;
    "onUnmount-attach-file"?: ((files: FileList, onlyMedia: boolean) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
