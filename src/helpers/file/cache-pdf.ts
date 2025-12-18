import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';

class CachePdf {
  private cache: Record<string, PDFDocumentProxy> = {};
  private cachePage: Record<string, PDFPageProxy> = {};

  /**
   * Записывает в кэш загруженные документ pdf файла
   * @param key
   * @param value
   */
  setCache(key: string, value: PDFDocumentProxy): void {
    this.cache[key] = value;
  }

  /**
   * Возвращает документ из кэша
   * @param key
   * @returns
   */
  getCache(key: string): PDFDocumentProxy | undefined {
    return this.cache[key];
  }

  /**
   * Записывает в кэш страницу
   * @param key
   * @param value
   */
  setPageCache(key: string, value: PDFPageProxy): void {
    this.cachePage[key] = value;
  }

  /**
   * Вовзращает страницу из кэша
   * @param key
   * @returns
   */
  getPageCache(key: string): PDFPageProxy | undefined {
    return this.cachePage[key];
  }
}

const cachePdf = new CachePdf();

export default cachePdf;
