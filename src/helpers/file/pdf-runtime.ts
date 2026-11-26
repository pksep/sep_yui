import pdfWorker from 'pdfjs-dist/legacy/build/pdf.worker.mjs?url';
import {
  getDocument,
  GlobalWorkerOptions
} from 'pdfjs-dist/legacy/build/pdf.mjs';
import type { PDFDocumentLoadingTask } from 'pdfjs-dist';
import { PdfResourceFactory } from './pdf-resources';

// Слайдер загружает документ до создания мобильных превью страниц.
// Worker должен быть настроен уже при первом вызове getDocument.
GlobalWorkerOptions.workerSrc = pdfWorker;

/** Создаёт управляемую загрузку URL или локального файла после допуска очередью. */
export const createPdfLoadingTask = async (
  source: string,
  file?: File
): Promise<PDFDocumentLoadingTask> => {
  const options = {
    BinaryDataFactory: PdfResourceFactory,
    // Ресурсы передаём из приложения: worker не знает URL ассетов библиотеки.
    useWorkerFetch: false
  };

  // File читаем по сохранённой ссылке, а не по изменившимся props компонента.
  if (file) {
    return getDocument({
      ...options,
      data: new Uint8Array(await file.arrayBuffer())
    });
  }

  return getDocument({ ...options, url: source });
};

export { getDocument };
