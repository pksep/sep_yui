export interface IContentEditorEmit {
    (e: 'unmount-send', params: {
        content?: string;
    }): void;
    (e: 'unmount-attach-file', files: FileList, onlyMedia: boolean): void;
    (e: 'mention-change', search: string | null): void;
}
export interface IContentEditorProps {
    activeAttachFile?: boolean;
    activeSelectUser?: boolean;
    activeSend?: boolean;
    disableSendOnEnter?: boolean;
    isMentionModalOpen?: boolean;
}
