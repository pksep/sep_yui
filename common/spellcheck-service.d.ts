export interface SpellingError {
    from: number;
    to: number;
}
export declare const checkSpelling: (text: string) => Promise<SpellingError[]>;
