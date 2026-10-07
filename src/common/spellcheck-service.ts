import SpellcheckWorker from './spellcheck.worker?worker';

export interface SpellingError {
  from: number;
  to: number;
}

interface SpellcheckResponse {
  id: number;
  errors: SpellingError[];
}

let worker: Worker | undefined;
let failed = false;
let requestId = 0;
const requests = new Map<number, (errors: SpellingError[]) => void>();

const stopWorker = () => {
  failed = true;
  worker?.terminate();
  worker = undefined;
  requests.forEach(resolve => resolve([]));
  requests.clear();
};

export const checkSpelling = (text: string): Promise<SpellingError[]> => {
  if (failed || !text.trim() || typeof Worker === 'undefined') {
    return Promise.resolve([]);
  }

  try {
    if (!worker) {
      worker = new SpellcheckWorker();
      worker.onmessage = ({ data }: MessageEvent<SpellcheckResponse>) => {
        requests.get(data.id)?.(data.errors);
        requests.delete(data.id);
      };
      worker.onerror = stopWorker;
      worker.onmessageerror = stopWorker;
    }

    const id = ++requestId;
    return new Promise(resolve => {
      requests.set(id, resolve);
      worker!.postMessage({ id, text });
    });
  } catch {
    stopWorker();
    return Promise.resolve([]);
  }
};
