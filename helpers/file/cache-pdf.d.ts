import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';

declare class CachePdf {
    private cache;
    private cachePage;
    /**
     * Записывает в кэш загруженные документ pdf файла
     * @param key
     * @param value
     */
    setCache(key: string, value: PDFDocumentProxy): void;
    /**
     * Возвращает документ из кэша
     * @param key
     * @returns
     */
    getCache(key: string): PDFDocumentProxy | undefined;
    /**
     * Записывает в кэш страницу
     * @param key
     * @param value
     */
    setPageCache(key: string, value: PDFPageProxy): void;
    /**
     * Вовзращает страницу из кэша
     * @param key
     * @returns
     */
    getPageCache(key: string): PDFPageProxy | undefined;
}
declare const cachePdf: CachePdf;
export default cachePdf;
