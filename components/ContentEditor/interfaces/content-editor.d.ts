export interface IContentEditorEmit {
    (e: 'unmount-send', params: {
        content?: string;
        threadId?: string;
        answerCommentId?: string;
    }): void;
}
