import { defineStore } from 'pinia';

export const useModalStore = defineStore('modals', {
  state: () => ({
    _countOpenedModal: 0 as number,
    _openedModals: [] as HTMLDialogElement[],
    _lastOpenedModal: null as null | HTMLDialogElement
  }),

  getters: {
    countOpenedModal: state => state._countOpenedModal,
    openedModals: state => state._openedModals,
    lastOpenedModal: state => state._lastOpenedModal
  },

  actions: {
    /**
     * Добавить модальное окно в список открытых окон
     *
     */
    addOpenedModal(dialog: HTMLDialogElement): void {
      // Добавляем в массив открытх окон
      this._openedModals.push(dialog);
      // устанавливаем как последнее
      this.setLastOpeneModal(dialog);

      // увеличиваем число открыт модальных окон
      this.incrementCountModal();
    },

    reduceOpenedModal(): void {
      // убираем последнее модальное окно из открытых окон
      this._openedModals.pop();

      // уменьшаем количество открытых модальных окон
      this.decrementCountModal();
      // Если есть еще открыте окна, то устанавливаем последнее в массиве как последнее открытое
      if (this._openedModals.length)
        this.setLastOpeneModal(
          this._openedModals[this._openedModals.length - 1]
        );
    },

    // установка модального окна как последнее открытого
    setLastOpeneModal(dialog: HTMLDialogElement): void {
      this._lastOpenedModal = dialog;
    },

    incrementCountModal(): void {
      this._countOpenedModal += 1;
    },

    decrementCountModal(): void {
      if (this._countOpenedModal >= 0) this._countOpenedModal - +1;
    }
  }
});
