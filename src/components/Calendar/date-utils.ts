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

export const getUTCLastDateTimeMoscow = (): Date | null => {
  const now = new Date();

  const moscowOffsetMinutes = 3 * 60;

  const utcTimeInMinutes = now.getTime() + now.getTimezoneOffset() * 60000;

  const moscowTime = new Date(utcTimeInMinutes + moscowOffsetMinutes * 60000);

  const lastMoment = new Date(
    moscowTime.getFullYear(),
    moscowTime.getMonth(),
    moscowTime.getDate(),
    23,
    59,
    59,
    999
  );
  return lastMoment;
};
