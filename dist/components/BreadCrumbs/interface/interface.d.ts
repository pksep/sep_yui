export type IBreadCrumbItems = {
    path: string;
    title: string;
};
export interface IBreadCrumbsItem {
    path: string;
    title: string;
    isSub?: boolean;
}
export interface IBreadCrumbsEmit extends IBreadCrumbsItem {
    inx: number;
}
export interface IBreadCrumbsProps {
    items: IBreadCrumbsItem[];
}
