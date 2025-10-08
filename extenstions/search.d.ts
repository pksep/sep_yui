import { Ref } from 'vue';

interface SearchComposable {
    getHistorySearch: Ref<string[]>;
    addHistorySearch: (value: string) => void;
    removeHistorySearch: (value: string) => void;
}
declare const useSearch: () => SearchComposable;
export { useSearch };
