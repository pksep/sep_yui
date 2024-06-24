export const trimText = (item: string, length: number = 33) => {
  return item.length > length ? item.slice(0, length - 3) + '...' : item;
};
