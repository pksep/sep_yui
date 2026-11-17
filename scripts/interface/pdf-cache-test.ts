import type { PDFDocumentProxy } from 'pdfjs-dist';
import type { TPdfLoadingTask } from '../../src/helpers/file/interface/pdf-cache';

export interface IDeferred<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (error: unknown) => void;
}

export interface IPdfFixture {
  document: PDFDocumentProxy;
  task: TPdfLoadingTask;
  load: () => TPdfLoadingTask;
  resolve: () => void;
  reject: (error: unknown) => void;
  finishDestroy: () => void;
}
