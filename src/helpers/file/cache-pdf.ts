import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';

class CachePdf {
  private cache: Record<string, PDFDocumentProxy> = {};
  private cachePage: Record<string, PDFPageProxy> = {};
  private pending: Record<string, Promise<PDFDocumentProxy>> = {};

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

  async getOrLoad(
    key: string,
    load: () => Promise<PDFDocumentProxy>
  ): Promise<PDFDocumentProxy> {
    if (this.cache[key]) return this.cache[key];

    if (!this.pending[key]) {
      this.pending[key] = Promise.resolve()
        .then(load)
        .then(value => {
          this.cache[key] = value;
          return value;
        })
        .finally(() => {
          delete this.pending[key];
        });
    }

    return this.pending[key];
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
