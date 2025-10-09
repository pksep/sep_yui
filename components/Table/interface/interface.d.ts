import { IDataTestIdProp } from '../../../common/dataTestidProps';
import { IScrollWrapperProps } from '../../ScrollWrapper/interface/interface';

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
export interface ITableProps extends IDataTestIdProp, IScrollWrapperProps {
    tableId?: string;
    search?: {
        rowId?: string;
        headId?: string;
    };
    tbodyId?: string;
    theadId?: string;
    columnCount?: number;
}
export interface ITableEmit {
    (e: 'unmount-scroll', event: Event): void;
    (e: 'unmount-paginate', isCanPaginate: boolean): void;
}
export interface IHeadTableRowProps extends IDataTestIdProp {
}
export interface ITableSimpleProps extends IDataTestIdProp {
}
