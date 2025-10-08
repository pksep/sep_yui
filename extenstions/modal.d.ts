import { Ref } from 'vue';

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
export declare const useModal: () => UseModalReturn;
export {};
