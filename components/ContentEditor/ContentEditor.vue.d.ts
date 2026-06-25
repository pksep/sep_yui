
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
    readClipboardText: {
        type: import('vue').PropType<() => Promise<string> | string>;
    };
    isMentionModalOpen: {
        type: import('vue').PropType<boolean>;
    };
    activeSelectSlash: {
        type: import('vue').PropType<boolean>;
    };
    mentionItems: {
        type: import('vue').PropType<unknown[]>;
    };
    slashItems: {
        type: import('vue').PropType<unknown[]>;
    };
    mentionConfig: {
        type: import('vue').PropType<{
            getKey?: (item: unknown, index: number) => string | number;
            getLabel?: (item: unknown) => string;
            getSubtitle?: (item: unknown) => string;
            getAvatarUrl?: (item: unknown) => string;
            getAvatarDefaultImage?: (item: unknown) => string;
            getAvatarInitials?: (item: unknown) => string;
            getIsOnline?: (item: unknown) => boolean;
            getInsertLabel?: (item: unknown) => string;
            getInsertAttrs?: (item: unknown) => Record<string, string>;
        }>;
    };
    slashConfig: {
        type: import('vue').PropType<{
            getKey?: (item: unknown, index: number) => string | number;
            getLabel?: (item: unknown) => string;
            getSubtitle?: (item: unknown) => string;
            getAvatarUrl?: (item: unknown) => string;
            getAvatarDefaultImage?: (item: unknown) => string;
            getAvatarInitials?: (item: unknown) => string;
            getIsOnline?: (item: unknown) => boolean;
            getInsertLabel?: (item: unknown) => string;
        }>;
    };
    mentionItemKey: {
        type: import('vue').PropType<(item: unknown, index: number) => string | number>;
    };
    mentionItemLabel: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    mentionItemSubtitle: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    mentionItemAvatarUrl: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    mentionItemAvatarDefaultImage: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    mentionItemAvatarInitials: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    mentionItemIsOnline: {
        type: import('vue').PropType<(item: unknown) => boolean>;
    };
    mentionInsertLabel: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    mentionInsertAttrs: {
        type: import('vue').PropType<(item: unknown) => Record<string, string>>;
    };
    slashItemKey: {
        type: import('vue').PropType<(item: unknown, index: number) => string | number>;
    };
    slashItemLabel: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    slashItemSubtitle: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    slashItemAvatarUrl: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    slashItemAvatarDefaultImage: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    slashItemAvatarInitials: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    slashItemIsOnline: {
        type: import('vue').PropType<(item: unknown) => boolean>;
    };
    slashInsertLabel: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
}>, {
    addSpanLink: (content: string, attrs?: Record<string, string>) => void;
    focus: () => void;
    editor: import('vue').ShallowRef<import('@tiptap/vue-3').Editor | undefined, import('@tiptap/vue-3').Editor | undefined>;
    emitAttachFiles: (files: FileList | File[], onlyMedia?: boolean) => Promise<void>;
    queueAttachFiles: (files: FileList | File[], onlyMedia: boolean) => Promise<void>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "unmount-send": (params: import('./interfaces/content-editor').IContentEditorSendPayload) => void;
    "unmount-attach-file": (files: FileList, onlyMedia: boolean) => void;
    "mention-change": (search: string | null) => void;
    "slash-change": (search: string | null) => void;
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
    readClipboardText: {
        type: import('vue').PropType<() => Promise<string> | string>;
    };
    isMentionModalOpen: {
        type: import('vue').PropType<boolean>;
    };
    activeSelectSlash: {
        type: import('vue').PropType<boolean>;
    };
    mentionItems: {
        type: import('vue').PropType<unknown[]>;
    };
    slashItems: {
        type: import('vue').PropType<unknown[]>;
    };
    mentionConfig: {
        type: import('vue').PropType<{
            getKey?: (item: unknown, index: number) => string | number;
            getLabel?: (item: unknown) => string;
            getSubtitle?: (item: unknown) => string;
            getAvatarUrl?: (item: unknown) => string;
            getAvatarDefaultImage?: (item: unknown) => string;
            getAvatarInitials?: (item: unknown) => string;
            getIsOnline?: (item: unknown) => boolean;
            getInsertLabel?: (item: unknown) => string;
            getInsertAttrs?: (item: unknown) => Record<string, string>;
        }>;
    };
    slashConfig: {
        type: import('vue').PropType<{
            getKey?: (item: unknown, index: number) => string | number;
            getLabel?: (item: unknown) => string;
            getSubtitle?: (item: unknown) => string;
            getAvatarUrl?: (item: unknown) => string;
            getAvatarDefaultImage?: (item: unknown) => string;
            getAvatarInitials?: (item: unknown) => string;
            getIsOnline?: (item: unknown) => boolean;
            getInsertLabel?: (item: unknown) => string;
        }>;
    };
    mentionItemKey: {
        type: import('vue').PropType<(item: unknown, index: number) => string | number>;
    };
    mentionItemLabel: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    mentionItemSubtitle: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    mentionItemAvatarUrl: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    mentionItemAvatarDefaultImage: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    mentionItemAvatarInitials: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    mentionItemIsOnline: {
        type: import('vue').PropType<(item: unknown) => boolean>;
    };
    mentionInsertLabel: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    mentionInsertAttrs: {
        type: import('vue').PropType<(item: unknown) => Record<string, string>>;
    };
    slashItemKey: {
        type: import('vue').PropType<(item: unknown, index: number) => string | number>;
    };
    slashItemLabel: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    slashItemSubtitle: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    slashItemAvatarUrl: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    slashItemAvatarDefaultImage: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    slashItemAvatarInitials: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
    slashItemIsOnline: {
        type: import('vue').PropType<(item: unknown) => boolean>;
    };
    slashInsertLabel: {
        type: import('vue').PropType<(item: unknown) => string>;
    };
}>> & Readonly<{
    "onUnmount-send"?: ((params: import('./interfaces/content-editor').IContentEditorSendPayload) => any) | undefined;
    "onUnmount-attach-file"?: ((files: FileList, onlyMedia: boolean) => any) | undefined;
    "onMention-change"?: ((search: string | null) => any) | undefined;
    "onSlash-change"?: ((search: string | null) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
