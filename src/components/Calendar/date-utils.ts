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
    dateTime.getFullYear(),
    dateTime.getMonth(),
    dateTime.getDate(),
    23,
    59,
    59,
    999
  );
  return lastMoment;
};
