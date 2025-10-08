import { Ref } from 'vue';

declare const useHorizontalTrack: (slotRef: Ref<HTMLElement | null>, scrollWrapperRef: Ref<HTMLElement | null>, barRef: Ref<HTMLElement | null>, trackRef: Ref<HTMLElement | null>) => {
    onDrag: (event: MouseEvent) => void;
    onTrackClick: (event: MouseEvent) => void;
    startDrag: (event: MouseEvent) => void;
    getPercentHorizontalView: () => number;
    changeBarPosition: () => void;
    isDragging: Ref<boolean, boolean>;
    scrollHorizontalWidthPercent: Ref<number, number>;
    setHorizontalBarWidth: () => void;
    horizontalTrackClass: import('vue').ComputedRef<{
        'scroll-wrapper__track_hide': boolean;
        'scroll-wrapper__track_drag': boolean;
    }[]>;
    isExistHorizontalTrack: import('vue').ComputedRef<boolean>;
};
export default useHorizontalTrack;
