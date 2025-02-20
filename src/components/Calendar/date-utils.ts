export const getDate = (
  dateObject = {
    locale: 'ru-RU'
  } as Partial<{
    year: number;
    month: number;
    day: number;
    locale: string;
  }>
): Date | string => {
  const newDate = new Date();
  const dateCreator = new Date(
    dateObject?.year ?? newDate.getFullYear(),
    dateObject?.day ? dateObject?.day - 1 : newDate.getDate(),
    dateObject?.month ?? newDate.getMonth()
  );
  if (dateObject.locale != 'date') {
    return dateCreator.toLocaleDateString(dateObject.locale);
  }
  return dateCreator;
};

export const clearFunction = (dateValue: Date | string | undefined): void => {
  if (dateValue) dateValue = '';
};
