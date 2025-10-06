import { ref, Ref } from 'vue';

interface SearchComposable {
  getHistorySearch: Ref<string[]>;
  addHistorySearch: (value: string) => void;
  removeHistorySearch: (value: string) => void;
}

const useSearch = (): SearchComposable => {
  const getHistorySearch = ref<string[]>(
    localStorage.getItem('historySearch')
      ? JSON.parse(localStorage.getItem('historySearch') as string)
      : []
  );

  const addHistorySearch = (value: string): void => {
    if (!value) return;

    getHistorySearch.value = getHistorySearch.value.filter(
      (el: string) => el !== value
    );
    getHistorySearch.value.unshift(value);

    if (getHistorySearch.value.length > 10) getHistorySearch.value.pop();

    localStorage.setItem(
      'historySearch',
      JSON.stringify(getHistorySearch.value)
    );
  };

  const removeHistorySearch = (value: string): void => {
    getHistorySearch.value = getHistorySearch.value.filter(
      (item: string) => item !== value
    );
    localStorage.setItem(
      'historySearch',
      JSON.stringify(getHistorySearch.value)
    );
  };

  return {
    getHistorySearch,
    addHistorySearch,
    removeHistorySearch
  };
};

export { useSearch };
