export interface IPdfPreviewProps {
    src: string | undefined;
    page?: number;
}
export interface IPdfPreviewEmit {
    (e: 'load'): void;
    (e: 'error', error: unknown): void;
}
