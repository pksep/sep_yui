export interface IPdfPreviewProps {
    src: string | undefined;
    page?: number;
    file?: File;
    resolutionScale?: number;
}
export interface IPdfPreviewEmit {
    (e: 'load'): void;
    (e: 'error', error: unknown): void;
}
