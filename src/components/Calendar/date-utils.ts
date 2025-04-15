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

export const formatDate = (date: Date | null): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date provided');
  }

  const formatter = new Intl.DateTimeFormat('ru', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });

  const parts = formatter.formatToParts(date);
  let month = parts.find(part => part.type === 'month')?.value;
  const day = parts.find(part => part.type === 'day')?.value;
  const year = parts.find(part => part.type === 'year')?.value;

  if (!month || !day || !year) {
    throw new Error('Failed to extract date parts');
  }

  month = month.replace('.', '');
  month = month.charAt(0).toUpperCase() + month.slice(1);

  return `${month}, ${day} ${year}`;
};
