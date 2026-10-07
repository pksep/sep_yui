export interface ISpellcheckProps {
    spellcheck?: boolean;
    lang?: string;
}
export declare const getSpellcheckLanguage: (text: string) => "ru" | "en";
