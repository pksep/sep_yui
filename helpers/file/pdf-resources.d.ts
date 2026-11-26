import { IPdfResourceRequest } from './interface/pdf-resources';

/** Передаёт worker ресурсы той же версии PDF.js, что и сама библиотека. */
export declare class PdfResourceFactory {
    /** Загружает только декодер, шрифт или таблицу символов нужного документа. */
    fetch({ kind, filename }: IPdfResourceRequest): Promise<Uint8Array>;
}
