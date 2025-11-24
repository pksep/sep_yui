export interface IContentEditorEmit {
  (
    e: 'unmount-send',
    params: {
      content?: string;
    }
  ): void;
  (e: 'unmount-attach-file', files: FileList, onlyMedia: boolean): void;
}
