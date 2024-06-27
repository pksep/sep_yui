import { defineStore } from 'pinia';

export const useDropdownStore = defineStore('dropdown', {
  state: () => ({
    _option: localStorage.getItem('choosenOptionDropdown')
      ? JSON.parse(localStorage.getItem('choosenOptionDropdown') as string)
      : []
  }),
  getters: {
    getChooseOption: state => state._option
  },
  actions: {
    setChooseOption(value: string): void {
      if (value) {
        localStorage.setItem(
          'choosenOptionDropdown',
          JSON.stringify(this._option)
        );
      }
    }
  }
});
