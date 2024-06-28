export const trimText = (item: string, length: number = 33) =>
  item.length > length ? item.slice(0, length - 3) + '...' : item;
