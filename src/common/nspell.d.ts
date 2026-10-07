declare module 'nspell' {
  interface Dictionary {
    correct(word: string): boolean;
  }

  export default function nspell(aff: string, dic: string): Dictionary;
}
