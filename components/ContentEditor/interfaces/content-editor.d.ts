export interface IContentEditorSendPayload {
    content?: string;
    files?: FileList;
    mediaFiles?: FileList;
}
export interface IContentEditorEmit {
    (e: 'unmount-send', params: IContentEditorSendPayload): void;
    (e: 'unmount-attach-file', files: FileList, onlyMedia: boolean): void;
    (e: 'mention-change', search: string | null): void;
}
export interface IContentEditorProps {
    activeAttachFile?: boolean;
    activeSelectUser?: boolean;
    activeSend?: boolean;
    disableSendOnEnter?: boolean;
    readClipboardText?: () => Promise<string> | string;
    isMentionModalOpen?: boolean;
    mentionItems?: unknown[];
    mentionConfig?: {
        getKey?: (item: unknown, index: number) => string | number;
        getLabel?: (item: unknown) => string;
        getSubtitle?: (item: unknown) => string;
        getAvatarUrl?: (item: unknown) => string;
        getAvatarInitials?: (item: unknown) => string;
        getIsOnline?: (item: unknown) => boolean;
        getInsertLabel?: (item: unknown) => string;
        getInsertAttrs?: (item: unknown) => Record<string, string>;
    };
    mentionItemKey?: (item: unknown, index: number) => string | number;
    mentionItemLabel?: (item: unknown) => string;
    mentionItemSubtitle?: (item: unknown) => string;
    mentionItemAvatarUrl?: (item: unknown) => string;
    mentionItemAvatarInitials?: (item: unknown) => string;
    mentionItemIsOnline?: (item: unknown) => boolean;
    mentionInsertLabel?: (item: unknown) => string;
    mentionInsertAttrs?: (item: unknown) => Record<string, string>;
}
