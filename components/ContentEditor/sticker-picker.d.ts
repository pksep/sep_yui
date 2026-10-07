export interface IStickerPickerItem {
    id: string;
    label: string;
    src: string;
    previewSrc?: string;
    keywords: readonly string[];
}
export declare const matchesStickerSearch: (sticker: IStickerPickerItem, query: string) => boolean;
