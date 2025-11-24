
declare function addSpanLink(content: string): void;
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: import('vue').PropType<string>;
    disableAttachFile: {
        type: import('vue').PropType<boolean>;
        required: true;
    };
}>, {
    addSpanLink: typeof addSpanLink;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "unmount-send": (params: {
        content?: string;
        threadId?: string;
        answerCommentId?: string;
    }) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: import('vue').PropType<string>;
    disableAttachFile: {
        type: import('vue').PropType<boolean>;
        required: true;
    };
}>> & Readonly<{
    "onUnmount-send"?: ((params: {
        content?: string;
        threadId?: string;
        answerCommentId?: string;
    }) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
