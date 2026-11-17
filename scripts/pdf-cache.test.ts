import { describe, expect, mock, test } from 'bun:test';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import {
  CachePdf,
  MAX_PARALLEL_PDF_LOADS,
  MAX_PDF_DOCUMENTS
} from '../src/helpers/file/cache-pdf';
import type { TPdfLoadingTask } from '../src/helpers/file/interface/pdf-cache';
import type { IDeferred, IPdfFixture } from './interface/pdf-cache-test';

/** Управляет завершением загрузки или удаления без задержек и сети. */
const deferred = <T>(): IDeferred<T> => {
  let resolve!: IDeferred<T>['resolve'];
  let reject!: IDeferred<T>['reject'];
  const promise = new Promise<T>((onResolve, onReject) => {
    resolve = onResolve;
    reject = onReject;
  });

  return { promise, resolve, reject };
};

/** Создаёт непрозрачный документ: кэш управляет задачей, не методами PDF.js. */
const fixture = (blockDestroy = false): IPdfFixture => {
  const loading = deferred<PDFDocumentProxy>();
  const destruction = deferred<void>();
  const document = { numPages: 1 } as PDFDocumentProxy;
  const task: TPdfLoadingTask = {
    promise: loading.promise,
    destroy: mock(
      (): Promise<void> =>
        blockDestroy ? destruction.promise : Promise.resolve()
    )
  };

  return {
    document,
    task,
    load: mock((): TPdfLoadingTask => task),
    resolve: (): void => loading.resolve(document),
    reject: loading.reject,
    finishDestroy: (): void => destruction.resolve()
  };
};

/** Пропускает цепочку promise очереди, отмены и уничтожения worker. */
const settle = async (): Promise<void> => {
  for (let tick = 0; tick < 16; tick++) await Promise.resolve();
};

describe('bounded PDF cache', (): void => {
  test('shares loading and keeps a document while another consumer uses it', async (): Promise<void> => {
    const cache = new CachePdf();
    const pdf = fixture();
    const duplicate = fixture();
    const first = cache.acquire('same.pdf', pdf.load);
    const second = cache.acquire('same.pdf', duplicate.load);
    first.release();
    first.release();
    pdf.resolve();

    expect(await second.promise).toBe(pdf.document);
    expect(first.promise).toBe(second.promise);
    expect(pdf.load).toHaveBeenCalledTimes(1);
    expect(duplicate.load).not.toHaveBeenCalled();
    expect(pdf.task.destroy).not.toHaveBeenCalled();
    second.release();
  });

  test('runs only two document loads at a time', async (): Promise<void> => {
    const cache = new CachePdf();
    const files = Array.from({ length: 3 }, () => fixture());
    const leases = files.map((file, index) =>
      cache.acquire(`${index}`, file.load)
    );
    await settle();

    expect(MAX_PARALLEL_PDF_LOADS).toBe(2);
    expect(files[0].load).toHaveBeenCalledTimes(1);
    expect(files[1].load).toHaveBeenCalledTimes(1);
    expect(files[2].load).not.toHaveBeenCalled();
    files[0].resolve();
    await leases[0].promise;
    await settle();
    expect(files[2].load).toHaveBeenCalledTimes(1);
    files.forEach(file => file.resolve());
    await Promise.all(leases.map(lease => lease.promise));
    leases.forEach(lease => lease.release());
  });

  test('evicts the least recently used idle document and waits for worker destruction', async (): Promise<void> => {
    const cache = new CachePdf();
    const files = Array.from({ length: 5 }, () => fixture(true));

    for (let index = 0; index < MAX_PDF_DOCUMENTS; index++) {
      const lease = cache.acquire(`${index}`, files[index].load);
      files[index].resolve();
      await lease.promise;
      lease.release();
    }

    const reused = cache.acquire('0', files[0].load);
    await reused.promise;
    reused.release();
    const last = cache.acquire('4', files[4].load);
    await settle();
    expect(files[0].task.destroy).not.toHaveBeenCalled();
    expect(files[1].task.destroy).toHaveBeenCalledTimes(1);
    expect(files[4].load).not.toHaveBeenCalled();
    files[1].finishDestroy();
    await settle();
    expect(files[4].load).toHaveBeenCalledTimes(1);
    files[4].resolve();
    await last.promise;
    last.release();
  });

  test('waits rather than destroying four active documents', async (): Promise<void> => {
    const cache = new CachePdf();
    const files = Array.from({ length: 5 }, () => fixture());
    const leases = [];

    for (let index = 0; index < MAX_PDF_DOCUMENTS; index++) {
      const lease = cache.acquire(`${index}`, files[index].load);
      files[index].resolve();
      await lease.promise;
      leases.push(lease);
    }

    const next = cache.acquire('4', files[4].load);
    await settle();
    expect(files[4].load).not.toHaveBeenCalled();
    files.forEach(file => expect(file.task.destroy).not.toHaveBeenCalled());
    leases[0].release();
    await settle();
    expect(files[4].load).toHaveBeenCalledTimes(1);
    expect(files[1].task.destroy).not.toHaveBeenCalled();
    files[4].resolve();
    await next.promise;
    next.release();
    leases.forEach(lease => lease.release());
  });

  test('does not start cancelled requests from the queue', async (): Promise<void> => {
    const cache = new CachePdf();
    const first = fixture();
    const second = fixture();
    const queued = fixture();
    const a = cache.acquire('a', first.load);
    const b = cache.acquire('b', second.load);
    const c = cache.acquire('c', queued.load);
    c.release();
    await expect(c.promise).rejects.toMatchObject({ name: 'AbortError' });
    first.resolve();
    second.resolve();
    await Promise.all([a.promise, b.promise]);
    await settle();
    expect(queued.load).not.toHaveBeenCalled();
    a.release();
    b.release();
  });

  test('waits for cancellation cleanup before admitting the next load', async (): Promise<void> => {
    const cache = new CachePdf();
    const first = fixture(true);
    const second = fixture();
    const third = fixture();
    const a = cache.acquire('a', first.load);
    const b = cache.acquire('b', second.load);
    const c = cache.acquire('c', third.load);
    await settle();
    a.release();
    await expect(a.promise).rejects.toMatchObject({ name: 'AbortError' });
    await settle();
    expect(first.task.destroy).toHaveBeenCalledTimes(1);
    expect(third.load).not.toHaveBeenCalled();
    first.finishDestroy();
    await settle();
    expect(third.load).toHaveBeenCalledTimes(1);
    second.resolve();
    third.resolve();
    await Promise.all([b.promise, c.promise]);
    b.release();
    c.release();
  });

  test('destroys a task created after cancellation of deferred File reading', async (): Promise<void> => {
    const cache = new CachePdf();
    const source = deferred<TPdfLoadingTask>();
    const pdf = fixture();
    const lease = cache.acquire('local.pdf', () => source.promise);
    lease.release();
    await expect(lease.promise).rejects.toMatchObject({ name: 'AbortError' });
    source.resolve(pdf.task);
    await settle();
    expect(pdf.task.destroy).toHaveBeenCalledTimes(1);
  });

  test('allows retry after a failed load and isolates releases of old requests', async (): Promise<void> => {
    const cache = new CachePdf();
    const failed = fixture();
    const old = cache.acquire('retry.pdf', failed.load);
    await settle();
    failed.reject(new Error('network error'));
    await expect(old.promise).rejects.toThrow('network error');
    const retry = fixture();
    const current = cache.acquire('retry.pdf', retry.load);
    old.release();
    retry.resolve();
    expect(await current.promise).toBe(retry.document);
    current.release();
    expect(failed.task.destroy).toHaveBeenCalledTimes(1);
  });

  test('stays within four live documents across one hundred distinct files', async (): Promise<void> => {
    const cache = new CachePdf();
    const files: IPdfFixture[] = [];

    for (let index = 0; index < 100; index++) {
      const pdf = fixture();
      files.push(pdf);
      const lease = cache.acquire(`${index}.pdf`, pdf.load);
      pdf.resolve();
      await lease.promise;
      lease.release();
      await settle();
      const evicted = files.slice(
        0,
        Math.max(0, files.length - MAX_PDF_DOCUMENTS)
      );
      evicted.forEach(file =>
        expect(file.task.destroy).toHaveBeenCalledTimes(1)
      );
    }

    files
      .slice(-MAX_PDF_DOCUMENTS)
      .forEach(file => expect(file.task.destroy).not.toHaveBeenCalled());
  });
});
