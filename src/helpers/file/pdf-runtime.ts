import pdfWorker from 'pdfjs-dist/legacy/build/pdf.worker.mjs?url';
import {
  getDocument,
  GlobalWorkerOptions
} from 'pdfjs-dist/legacy/build/pdf.mjs';

// Слайдер загружает документ до создания мобильных превью страниц.
// Worker должен быть настроен уже при первом вызове getDocument.
GlobalWorkerOptions.workerSrc = pdfWorker;

export { getDocument };
