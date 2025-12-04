
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: import('vue').PropType<string>;
    activeAttachFile: {
        type: import('vue').PropType<boolean>;
        required: true;
    };
}>, {
    addSpanLink: (content: string) => void;
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
}>> & Readonly<{
    "onUnmount-send"?: ((params: {
        content?: string;
    }) => any) | undefined;
    "onUnmount-attach-file"?: ((files: FileList, onlyMedia: boolean) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
