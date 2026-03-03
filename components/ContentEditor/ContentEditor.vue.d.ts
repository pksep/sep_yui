
declare function __VLS_template(): {
    action?(_: {}): any;
};
declare const __VLS_component: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: import('vue').PropType<string>;
    activeAttachFile: {
        type: import('vue').PropType<boolean>;
    };
    activeSelectUser: {
        type: import('vue').PropType<boolean>;
    };
    activeSend: {
        type: import('vue').PropType<boolean>;
    };
    disableSendOnEnter: {
        type: import('vue').PropType<boolean>;
    };
    isMentionModalOpen: {
        type: import('vue').PropType<boolean>;
    };
}>, {
    addSpanLink: (content: string, attrs?: Record<string, string>) => void;
    focus: () => void;
    editor: import('vue').ShallowRef<import('@tiptap/vue-3').Editor | undefined, import('@tiptap/vue-3').Editor | undefined>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "unmount-send": (params: {
        content?: string;
    }) => void;
    "unmount-attach-file": (files: FileList, onlyMedia: boolean) => void;
    "mention-change": (search: string | null) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: import('vue').PropType<string>;
    activeAttachFile: {
        type: import('vue').PropType<boolean>;
    };
    activeSelectUser: {
        type: import('vue').PropType<boolean>;
    };
    activeSend: {
        type: import('vue').PropType<boolean>;
    };
    disableSendOnEnter: {
        type: import('vue').PropType<boolean>;
    };
    isMentionModalOpen: {
        type: import('vue').PropType<boolean>;
    };
}>> & Readonly<{
    "onUnmount-send"?: ((params: {
        content?: string;
    }) => any) | undefined;
    "onUnmount-attach-file"?: ((files: FileList, onlyMedia: boolean) => any) | undefined;
    "onMention-change"?: ((search: string | null) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
