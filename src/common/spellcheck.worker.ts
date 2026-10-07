import nspell from 'nspell';
import ruAff from 'dictionary-ru/index.aff?raw';
import ruDic from 'dictionary-ru/index.dic?raw';
import enAff from 'dictionary-en/index.aff?raw';
import enDic from 'dictionary-en/index.dic?raw';
import type { SpellingError } from './spellcheck-service';

const dictionaries = new Map<'ru' | 'en', ReturnType<typeof nspell>>();
const cache = new Map<string, boolean>();
const acceptedWords = new Set(['ок', 'ok']);

const correct = (word: string, language: 'ru' | 'en') => {
  if (acceptedWords.has(word.toLowerCase())) return true;
  const key = `${language}:${word}`;
  const cached = cache.get(key);
  if (cached !== undefined) return cached;

  let dictionary = dictionaries.get(language);
  if (!dictionary) {
    dictionary = nspell(
      language === 'ru' ? ruAff : enAff,
      language === 'ru' ? ruDic : enDic
    );
    dictionaries.set(language, dictionary);
  }

  const result = dictionary.correct(word.replace(/’/g, "'"));
  if (cache.size >= 10000) cache.clear();
  cache.set(key, result);
  return result;
};

self.onmessage = ({ data }: MessageEvent<{ id: number; text: string }>) => {
  const errors: SpellingError[] = [];
  const ignored = [
    ...data.text.matchAll(
      /(?:[a-z][a-z\d+.-]*:\/\/|www\.)\S+|[^\s@]+@[^\s@]+\.[^\s@]+|[@#][\p{L}\p{N}_]+/giu
    )
  ].map(match => ({ from: match.index!, to: match.index! + match[0].length }));
  let ignoredIndex = 0;

  for (const match of data.text.matchAll(/[\p{L}\p{N}_]+(?:['’][\p{L}]+)*/gu)) {
    const word = match[0];
    const from = match.index!;
    while (ignored[ignoredIndex]?.to <= from) ignoredIndex++;
    if (
      ignored[ignoredIndex] &&
      ignored[ignoredIndex].from < from + word.length
    ) {
      continue;
    }

    if (word.length < 2 || word.length > 64 || /^[A-ZА-ЯЁ]{2,4}$/.test(word)) {
      continue;
    }

    const language = /^[а-яё]+$/i.test(word)
      ? 'ru'
      : /^[a-z]+(?:['’][a-z]+)*$/i.test(word)
        ? 'en'
        : null;

    if (language && !correct(word, language)) {
      errors.push({ from, to: from + word.length });
    }
  }

  self.postMessage({ id: data.id, errors });
};
