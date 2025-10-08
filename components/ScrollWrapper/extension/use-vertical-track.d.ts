import { Ref } from 'vue';

declare const useVerticlTrack: (slotRef: Ref<HTMLElement | null>, scrollWrapperRef: Ref<HTMLElement | null>, barRef: Ref<HTMLElement | null>, trackRef: Ref<HTMLElement | null>) => {
    onDrag: (event: MouseEvent) => void;
    onTrackClick: (event: MouseEvent) => void;
    startDrag: (event: MouseEvent) => void;
    getProcentVerticalView: () => number;
    changeBarPosition: () => void;
    isDragging: Ref<boolean, boolean>;
    scrollVerticalHeightProcent: Ref<number, number>;
    setVerticalBarHeight: () => void;
    verticalTrackClass: import('vue').ComputedRef<{
        'scroll-wrapper__track_hide': boolean;
        'scroll-wrapper__track_drag': boolean;
    }[]>;
    isExistVerticalTrack: import('vue').ComputedRef<boolean>;
};
export default useVerticlTrack;
