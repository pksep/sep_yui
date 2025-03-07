export interface ISectionTable<T> {
  title?: string;
  values: T[];
}

export type TTableRow = 'selected' | 'default';

export interface ITableRow {
  type: TTableRow;
}

export interface ISectionTableRow {
  colspan: number;
}

export interface ITableCell {
  colspan?: number | string;
  rowspan: number | string;
}
