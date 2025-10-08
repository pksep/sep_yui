type ScrollbarEmitsKeys = 'scroll' | 'ps-scroll-y' | 'ps-scroll-x' | 'ps-scroll-up' | 'ps-scroll-down' | 'ps-scroll-left' | 'ps-scroll-right' | 'ps-y-reach-start' | 'ps-y-reach-end' | 'ps-x-reach-start' | 'ps-x-reach-end';
export type ScrollbarEmits = {
    [EventName in ScrollbarEmitsKeys]: [value: Event];
};
export {};
