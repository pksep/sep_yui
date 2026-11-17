import type { PDFDocumentProxy } from 'pdfjs-dist';
import type {
  IPdfCacheEntry,
  IPdfCacheLease,
  TPdfLoadingTask
} from './interface/pdf-cache';

export const MAX_PDF_DOCUMENTS = 4;
export const MAX_PARALLEL_PDF_LOADS = 2;

/** Ограничивает документы и workers, сохраняя используемые PDF до освобождения. */
export class CachePdf {
  private entries = new Map<string, IPdfCacheEntry>();
  private queue = new Set<IPdfCacheEntry>();
  private activeLoads = 0;
  private liveDocuments = 0;

  /** Возвращает общий документ и право использовать его до вызова release. */
  acquire(
    key: string,
    load: () => TPdfLoadingTask | Promise<TPdfLoadingTask>
  ): IPdfCacheLease {
    let entry = this.entries.get(key);

    if (!entry) {
      entry = this.createEntry(key, load);
      this.entries.set(key, entry);
      this.queue.add(entry);
    }

    // Порядок Map задаёт LRU; несколько превью одного PDF делят одну загрузку.
    entry.references += 1;
    this.entries.delete(key);
    this.entries.set(key, entry);
    this.pump();

    const acquired = entry;
    let released = false;

    return {
      promise: acquired.promise,
      release: (): void => {
        // finally рендеринга и размонтирование могут освобождать одну заявку.
        if (released) return;
        released = true;
        acquired.references -= 1;

        if (acquired.references === 0 && acquired.state !== 'ready') {
          acquired.cancelled = true;
          acquired.cancel();
          acquired.reject(new DOMException('PDF load cancelled', 'AbortError'));
          this.queue.delete(acquired);
          this.forget(acquired);
        }

        this.pump();
      }
    };
  }

  /** Создаёт заявку без запуска сети или worker до появления свободного места. */
  private createEntry(
    key: string,
    load: IPdfCacheEntry['load']
  ): IPdfCacheEntry {
    let resolve!: IPdfCacheEntry['resolve'];
    let reject!: IPdfCacheEntry['reject'];
    let cancel!: IPdfCacheEntry['cancel'];

    const promise = new Promise<PDFDocumentProxy>((onResolve, onReject) => {
      resolve = onResolve;
      reject = onReject;
    });
    const cancellation = new Promise<void>(onCancel => {
      cancel = onCancel;
    });

    // Отмена может опередить await потребителя; его promise всё равно отклонится.
    void promise.catch((): void => {});

    return {
      key,
      load,
      promise,
      resolve,
      reject,
      cancellation,
      cancel,
      references: 0,
      cancelled: false,
      state: 'queued'
    };
  }

  /** Запускает очередь в пределах общего числа документов и загрузок. */
  private pump(): void {
    while (this.activeLoads < MAX_PARALLEL_PDF_LOADS && this.queue.size) {
      if (this.liveDocuments >= MAX_PDF_DOCUMENTS) {
        const idle = [...this.entries.values()].find(
          entry => entry.state === 'ready' && entry.references === 0
        );

        if (idle) {
          this.forget(idle);
          // Новое место появится только после завершения worker.destroy().
          void this.dispose(idle);
        }

        return;
      }

      const entry = this.queue.values().next().value;
      if (!entry) return;

      this.queue.delete(entry);
      entry.state = 'loading';
      this.activeLoads += 1;
      this.liveDocuments += 1;
      void this.loadEntry(entry);
    }
  }

  /** Загружает один PDF; отменённый запрос освобождает worker до следующего. */
  private async loadEntry(entry: IPdfCacheEntry): Promise<void> {
    try {
      // Ожидаем даже отложенное чтение File, чтобы не создать worker после отмены.
      entry.task = await entry.load();

      const document = await Promise.race([
        entry.task.promise,
        entry.cancellation.then((): never => {
          throw new DOMException('PDF load cancelled', 'AbortError');
        })
      ]);

      if (entry.cancelled) return;

      entry.state = 'ready';
      entry.resolve(document);
    } catch (error) {
      entry.reject(error);
    } finally {
      if (entry.state !== 'ready') {
        this.forget(entry);
        await this.destroy(entry);
        this.liveDocuments -= 1;
      }

      this.activeLoads -= 1;
      this.pump();
    }
  }

  /** Удаляет только свою заявку, не затрагивая повторный запрос того же URL. */
  private forget(entry: IPdfCacheEntry): void {
    if (this.entries.get(entry.key) === entry) this.entries.delete(entry.key);
  }

  /** Уничтожает PDF вместе с внутренним кэшем страниц и его worker. */
  private async destroy(entry: IPdfCacheEntry): Promise<void> {
    try {
      await entry.task?.destroy();
    } catch (error) {
      console.error('Failed to destroy PDF worker', error);
    }
  }

  /** Освобождает слот только после завершения удаления неиспользуемого документа. */
  private async dispose(entry: IPdfCacheEntry): Promise<void> {
    await this.destroy(entry);
    this.liveDocuments -= 1;
    this.pump();
  }
}

const cachePdf = new CachePdf();

export default cachePdf;
