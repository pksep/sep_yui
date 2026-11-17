import pdfWorker from 'pdfjs-dist/legacy/build/pdf.worker.mjs?url';
import {
  getDocument,
  GlobalWorkerOptions
} from 'pdfjs-dist/legacy/build/pdf.mjs';
import type { PDFDocumentLoadingTask } from 'pdfjs-dist';

// Слайдер загружает документ до создания мобильных превью страниц.
// Worker должен быть настроен уже при первом вызове getDocument.
GlobalWorkerOptions.workerSrc = pdfWorker;

/** Создаёт управляемую загрузку URL или локального файла после допуска очередью. */
export const createPdfLoadingTask = async (
  source: string,
  file?: File
): Promise<PDFDocumentLoadingTask> => {
  // File читаем по сохранённой ссылке, а не по изменившимся props компонента.
  if (file) {
    return getDocument({ data: new Uint8Array(await file.arrayBuffer()) });
  }

  return getDocument(source);
};

export { getDocument };
