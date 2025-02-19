export const getDate = (
  dateObject = {
    locale: 'ru-RU'
  } as Partial<{
    year: number;
    month: number;
    day: number;
    locale: string;
  }>
): string => {
  const newDate = new Date();
  return new Date(
    dateObject?.year ?? newDate.getFullYear(),
    dateObject?.day ? dateObject?.day - 1 : newDate.getDate(),
    dateObject?.month ?? newDate.getMonth()
  ).toLocaleDateString(dateObject.locale);
};
