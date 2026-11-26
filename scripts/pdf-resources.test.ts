import { expect, test } from 'bun:test';
import { resolve } from 'node:path';
import { createServer } from 'vite';

test('PDF resources include a valid scan decoder, standard fonts and CMaps', async (): Promise<void> => {
  const vite = await createServer({
    configFile: false,
    root: resolve(import.meta.dir, '..'),
    optimizeDeps: { noDiscovery: true, include: [] },
    server: { host: '127.0.0.1', port: 0 }
  });
  const originalFetch = globalThis.fetch;

  try {
    await vite.listen();

    const origin = vite.resolvedUrls?.local[0];
    if (!origin) throw new Error('Не удалось запустить сервер ресурсов PDF');

    // Браузер разрешает относительные URL относительно страницы, Node — нет.
    globalThis.fetch = (input, init): Promise<Response> =>
      originalFetch(
        typeof input === 'string' ? new URL(input, origin) : input,
        init
      );

    const { PdfResourceFactory } = (await vite.ssrLoadModule(
      '/src/helpers/file/pdf-resources.ts'
    )) as typeof import('../src/helpers/file/pdf-resources');
    const factory = new PdfResourceFactory();
    const decoder = await factory.fetch({
      kind: 'wasmUrl',
      filename: 'jbig2.wasm'
    });

    // Проверяем настоящий WASM, а не HTML-заглушку от SPA.
    expect(await WebAssembly.compile(decoder)).toBeInstanceOf(
      WebAssembly.Module
    );

    const font = await factory.fetch({
      kind: 'standardFontDataUrl',
      filename: 'LiberationSans-Regular.ttf'
    });
    expect([...font.slice(0, 4)]).toEqual([0, 1, 0, 0]);

    const cmap = await factory.fetch({
      kind: 'cMapUrl',
      filename: 'UniJIS-UTF16-H.bcmap'
    });
    expect(cmap.byteLength).toBeGreaterThan(100);

    await expect(
      factory.fetch({ kind: 'wasmUrl', filename: 'missing.wasm' })
    ).rejects.toThrow('Ресурс PDF.js не найден');
  } finally {
    globalThis.fetch = originalFetch;
    await vite.close();
  }
});
