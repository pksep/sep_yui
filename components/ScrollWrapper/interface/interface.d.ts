export type TScrollWrapperStyle = '--scroll-border-radius' | '--scroll-bar-height' | '--scroll-bar-top-postion';
export interface IScrollWrapperProps {
    isShowVerticalScroll?: boolean;
    isShowHorizontalScroll?: boolean;
}
export interface IScrollWrapperEmit {
    (e: 'unmount-scroll', event: Event): void;
    (e: 'on-mounted'): void;
}
