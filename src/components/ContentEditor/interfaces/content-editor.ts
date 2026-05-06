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
  isMentionModalOpen?: boolean;
}
