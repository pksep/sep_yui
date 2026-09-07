export type EmojiPickerSelection = {
    i: string;
    n?: string[];
    r?: string;
    u?: string;
};
export type RecentEmoji = {
    n: string[];
    u: string;
};
export declare const emojiAdditionalGroups: Record<'recent', RecentEmoji[]>;
export declare const rememberEmojiSelection: (emoji: EmojiPickerSelection) => void;
export declare const emojiGroupIcons: {
    recent: string;
    smileys_people: string;
    animals_nature: string;
    food_drink: string;
    activities: string;
    symbols: string;
    objects: string;
    flags: string;
    travel_places: string;
};
export declare const emojiPickerStyle: {
    '--emoji-recent-icon': string;
};
export declare const emojiGroupNames: {
    recent: string;
    smileys_people: string;
    animals_nature: string;
    food_drink: string;
    activities: string;
    symbols: string;
    objects: string;
    flags: string;
    travel_places: string;
};
export declare const emojiGroupOrder: Array<keyof typeof emojiGroupNames>;
export declare const emojiStaticTexts: {
    placeholder: string;
    skinTone: string;
};
export declare const syncEmojiGroupControls: (pickerRoot: HTMLElement) => void;
export declare const resetEmojiGroupRendering: (pickerRoot: HTMLElement) => void;
export declare const syncEmojiGroupScroll: (event: Event) => void;
