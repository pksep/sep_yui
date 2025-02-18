export const getDate = (
  year?: number,
  month?: number,
  day?: number
): string => {
  const newDate = new Date();
  return new Date(
    year ?? newDate.getFullYear(),
    month ?? newDate.getMonth(),
    day ?? newDate.getDate()
  ).toLocaleDateString('ru-RU');
};
