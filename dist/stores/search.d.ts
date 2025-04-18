export declare const useSearchStore: import('pinia').StoreDefinition<"search", {
    _historySearch: any;
}, {
    getHistorySearch: (state: {
        _historySearch: any;
    } & import('pinia').PiniaCustomStateProperties<{
        _historySearch: any;
    }>) => any;
}, {
    addHistorySearch(value: string): void;
    removeHistorySearch(value: string): void;
}>;
