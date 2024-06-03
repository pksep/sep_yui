export interface IBreadCrumbsItem {
  path: string;
  title: string;
}

export interface IBreadCrumbsEmit extends IBreadCrumbsItem {
  inx: number;
}

export interface IBreadCrumbsProps {
  items: IBreadCrumbsItem[];
}
