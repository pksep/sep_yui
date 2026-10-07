export declare const DEFAULT_TEXT_COLOR = "var(--text-primary)";
export declare const TEXT_COLOR_ATTRIBUTE = "data-yui-color";
export declare const BACKGROUND_COLOR_ATTRIBUTE = "data-yui-background-color";
export declare const contentEditorColors: {
    label: string;
    value: string;
}[];
export declare const normalizeContentEditorColor: (value: unknown, allowDefault?: boolean) => string | null;
export declare const ContentEditorColor: import('@tiptap/core').Extension<import('@tiptap/extension-text-style').ColorOptions, any>;
export declare const ContentEditorBackgroundColor: import('@tiptap/core').Extension<import('@tiptap/extension-text-style').BackgroundColorOptions, any>;
export declare const normalizePastedContentEditorColors: (html: string) => string;
