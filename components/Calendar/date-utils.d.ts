export declare const getDate: (dateObject?: Partial<{
    year: number;
    month: number;
    day: number;
    locale: string;
}>) => Date | string | null;
export declare const isValidDate: (value: unknown) => boolean;
export declare const getLastTime: (date: Date | null) => Date;
export declare const getFirstTime: (date: Date) => Date;
/**
 * Converts a Date object to a string in the format `MMMM DD, YYYY`.
 *
 * @param {Date | null}  date - The Date object to be converted.
 * @param {string} locale - locale of return dates
 * @returns {string} The formatted date string in the format `MMMM DD, YYYY`.
 */
export declare const formatDates: (date: Date | null, locale: string) => string;
