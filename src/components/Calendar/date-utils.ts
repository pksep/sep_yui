import { getMonths } from 'col-cal';

export const getDate = (
  dateObject: Partial<{
    year: number;
    month: number;
    day: number;
    locale: string;
  }> = {}
): Date | string | null => {
  const newDate = new Date();
  const dateCreator = new Date(
    dateObject?.year ?? newDate.getFullYear(),
    dateObject?.day ? dateObject?.day - 1 : newDate.getDate(),
    dateObject?.month ?? newDate.getMonth()
  );
  if (!dateObject?.locale) dateObject.locale = 'date';
  if (dateObject?.locale != 'date') {
    return dateCreator.toLocaleDateString(dateObject.locale);
  }
  return dateCreator;
};

export const isValidDate = (value: unknown): boolean => {
  return value instanceof Date && !isNaN(value.getTime());
};

export const getLastTime = (date: Date | null): Date => {
  const dateTime = isValidDate(date) && date !== null ? date : new Date();

  const lastMoment = new Date(
    Date.UTC(
      dateTime.getFullYear(),
      dateTime.getMonth(),
      dateTime.getDate(),
      23,
      59,
      59,
      999
    )
  );
  return lastMoment;
};

export const getFirstTime = (date: Date): Date => {
  const dateTime = isValidDate(date) && date !== null ? date : new Date();

  const dateObject = {
    year: dateTime.getFullYear(),
    month: dateTime.getMonth(),
    day: dateTime.getDate()
  };
  return new Date(Date.UTC(dateObject.year, dateObject.month, dateObject.day));
};

/**
 * Converts a Date object to a string in the format `MMMM DD, YYYY`.
 *
 * @param {Date | null}  date - The Date object to be converted.
 * @param {string} locale - locale of return dates
 * @returns {string} The formatted date string in the format `MMMM DD, YYYY`.
 */
export const formatDates = (date: Date | null, locale: string): string => {
  if (!date) return '';
  if (locale !== 'ru-RU') {
    locale = 'en-US';
  }
  const localDate = new Date(date);

  const months = getMonths(locale);

  const day = localDate.getDate().toString().padStart(2, '0');
  const year = localDate.getFullYear().toString();

  return `${months[localDate.getMonth()]} ${day}, ${year}`;
};
