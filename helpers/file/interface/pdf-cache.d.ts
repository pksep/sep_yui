import { PDFDocumentLoadingTask, PDFDocumentProxy } from 'pdfjs-dist';

export type TPdfLoadingTask = Pick<PDFDocumentLoadingTask, 'promise' | 'destroy'>;
export interface IPdfCacheLease {
    promise: Promise<PDFDocumentProxy>;
    release: () => void;
}
export interface IPdfCacheEntry {
    key: string;
    load: () => TPdfLoadingTask | Promise<TPdfLoadingTask>;
    promise: Promise<PDFDocumentProxy>;
    resolve: (document: PDFDocumentProxy) => void;
    reject: (error: unknown) => void;
    cancellation: Promise<void>;
    cancel: () => void;
    references: number;
    cancelled: boolean;
    state: 'queued' | 'loading' | 'ready';
    task?: TPdfLoadingTask;
}
