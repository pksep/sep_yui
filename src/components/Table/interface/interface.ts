export interface ISectionTable<T> {
  title?: string;
  values: T[];
}

export type TTableRow = 'selected' | 'default';

export interface ITableRow {
  type?: TTableRow;
}

export interface ISectionTableRow {
  colspan: number | string;
}

export interface ITableTd {
  colspan?: number | string;
  rowspan?: number | string;
}

export interface ITableProps {
  isShowVerticalScroll?: boolean;
}

export interface ITableEmit {
  (e: 'unmount-scroll', event: Event): void;
  (e: 'unmount-intersection'): void;
}
