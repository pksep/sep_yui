import type { IPdfResourceRequest } from './interface/pdf-resources';

// Vite переносит ресурсы вместе с библиотекой; URL не зависит от хоста ERP.
const resourceLoaders = {
  cMapUrl: import.meta.glob<string>(
    '../../../node_modules/pdfjs-dist/cmaps/*.bcmap',
    { query: '?url', import: 'default' }
  ),
  standardFontDataUrl: import.meta.glob<string>(
    '../../../node_modules/pdfjs-dist/standard_fonts/*.{pfb,ttf}',
    { query: '?url', import: 'default' }
  ),
  wasmUrl: import.meta.glob<string>(
    '../../../node_modules/pdfjs-dist/wasm/*.wasm',
    { query: '?url', import: 'default' }
  )
};

const resourceDirectories = {
  cMapUrl: 'cmaps',
  standardFontDataUrl: 'standard_fonts',
  wasmUrl: 'wasm'
};

/** Передаёт worker ресурсы той же версии PDF.js, что и сама библиотека. */
export class PdfResourceFactory {
  /** Загружает только декодер, шрифт или таблицу символов нужного документа. */
  async fetch({ kind, filename }: IPdfResourceRequest): Promise<Uint8Array> {
    const resourcePath = `../../../node_modules/pdfjs-dist/${resourceDirectories[kind]}/${filename}`;
    const load = resourceLoaders[kind][resourcePath];

    if (!load) {
      throw new Error(`Ресурс PDF.js не найден: ${kind}/${filename}`);
    }

    // В сборке библиотеки ресурс может быть data URL, а в dev — обычным URL.
    const url = await load();
    const response = await fetch(url, { credentials: 'omit' });

    if (!response.ok) {
      throw new Error(`Не удалось загрузить ресурс PDF.js: ${filename}`);
    }

    return new Uint8Array(await response.arrayBuffer());
  }
}
