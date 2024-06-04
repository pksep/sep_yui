import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
  state: () => ({
    _historySearch: localStorage.getItem('historySearch')
      ? JSON.parse(localStorage.getItem('historySearch') as string)
      : []
  }),
  getters: {
    getHistorySearch: state => state._historySearch
  },
  actions: {
    addHistorySearch(value: string): void {
      if (value) {
        if (this._historySearch[0] === value) return;
        this._historySearch.unshift(value);
      }

      if (this._historySearch.length > 10) this._historySearch.pop();

      localStorage.setItem(
        'historySearch',
        JSON.stringify(this._historySearch)
      );
    },
    removeHistorySearch(value: string): void {
      this._historySearch = this._historySearch.filter(
        (item: string) => item !== value
      );
      localStorage.setItem(
        'historySearch',
        JSON.stringify(this._historySearch)
      );
    }
  }
});
