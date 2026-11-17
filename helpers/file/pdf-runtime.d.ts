import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { PDFDocumentLoadingTask } from 'pdfjs-dist';

/** Создаёт управляемую загрузку URL или локального файла после допуска очередью. */
export declare const createPdfLoadingTask: (source: string, file?: File) => Promise<PDFDocumentLoadingTask>;
export { getDocument };
