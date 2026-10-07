export interface IStickerPickerItem {
  id: string;
  label: string;
  src: string;
  previewSrc?: string;
  keywords: readonly string[];
}

const words = (value: string): string[] =>
  value
    .normalize('NFKC')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .match(/[\p{L}\p{N}]+/gu) || [];

export const matchesStickerSearch = (
  sticker: IStickerPickerItem,
  query: string
): boolean => {
  const terms = words(query);
  if (!terms.length) return true;

  const aliases = words(
    [sticker.label, 'робот robot sep', ...sticker.keywords].join(' ')
  );
  return terms.every(term => aliases.some(alias => alias.startsWith(term)));
};
