export interface ISpellcheckProps {
  spellcheck?: boolean;
  lang?: string;
}

export const getSpellcheckLanguage = (text: string): 'ru' | 'en' =>
  /[а-яё]/i.test(text) || !/[a-z]/i.test(text) ? 'ru' : 'en';
