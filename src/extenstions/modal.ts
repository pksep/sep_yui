import { ref, Ref } from 'vue';

interface UseModalReturn {
  countOpenedModal: Ref<number>;
  openedModals: Ref<HTMLDialogElement[]>;
  lastOpenedModal: Ref<HTMLDialogElement | null>;
  addOpenedModal: (dialog: HTMLDialogElement) => void;
  reduceOpenedModal: () => void;
  setLastOpenedModal: (dialog: HTMLDialogElement) => void;
  incrementCountModal: () => void;
  decrementCountModal: () => void;
}

export const useModal = (): UseModalReturn => {
  const countOpenedModal = ref(0);
  const openedModals = ref([] as HTMLDialogElement[]);
  const lastOpenedModal = ref<null | HTMLDialogElement>(null);

  /**
   * Add a modal window to the list of open windows
   */
  const addOpenedModal = (dialog: HTMLDialogElement): void => {
    // Add to the array of open windows
    openedModals.value.push(dialog);
    // Set as the last one
    setLastOpenedModal(dialog);

    // Increase the number of open modal windows
    incrementCountModal();
  };

  const reduceOpenedModal = (): void => {
    // Remove the last modal window from the open windows
    openedModals.value.pop();

    // Decrease the number of open modal windows
    decrementCountModal();
    // If there are still open windows, set the last one in the array as the last opened
    if (openedModals.value.length) {
      setLastOpenedModal(openedModals.value[openedModals.value.length - 1]);
    } else {
      lastOpenedModal.value = null;
    }
  };

  // Set the modal window as the last opened
  const setLastOpenedModal = (dialog: HTMLDialogElement): void => {
    lastOpenedModal.value = dialog;
  };

  const incrementCountModal = (): void => {
    countOpenedModal.value += 1;
  };

  const decrementCountModal = (): void => {
    if (countOpenedModal.value > 0) {
      countOpenedModal.value -= 1;
    }
  };

  return {
    countOpenedModal,
    openedModals,
    lastOpenedModal,
    addOpenedModal,
    reduceOpenedModal,
    setLastOpenedModal,
    incrementCountModal,
    decrementCountModal
  };
};
