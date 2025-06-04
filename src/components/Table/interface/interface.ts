import type { IDataTestIdProp } from '@/common/dataTestidProps';

export interface ISectionTable<T> {
  title?: string;
  values: T[];
}

export type TTableRow = 'selected' | 'default';

export interface ITableRow extends IDataTestIdProp {
  type?: TTableRow;
}

export interface ISectionTableRow extends IDataTestIdProp {
  colspan: number | string;
}

export interface ITableTd extends IDataTestIdProp {
  colspan?: number | string;
  rowspan?: number | string;
}

export interface ITableProps extends IDataTestIdProp {
  isShowVerticalScroll?: boolean;
  isShowHorizontalScroll?: boolean;
}

export interface ITableEmit {
  (e: 'unmount-scroll', event: Event): void;
  (e: 'unmount-intersection'): void;
}
export interface IHeadTableRowProps extends IDataTestIdProp {}
