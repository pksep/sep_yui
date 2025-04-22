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
}

export interface IHeadTableRowProps extends IDataTestIdProp {}
