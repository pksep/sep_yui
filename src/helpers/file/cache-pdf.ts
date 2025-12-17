import { PDFDocumentProxy } from 'pdfjs-dist';

class CachePdf {
  public cache: Record<string, PDFDocumentProxy> = {};

  setCache(key: string, value: PDFDocumentProxy): void {
    this.cache[key] = value;
  }

  getCache(key: string): PDFDocumentProxy | undefined {
    return this.cache[key];
  }
}

const cachePdf = new CachePdf();

export default cachePdf;
