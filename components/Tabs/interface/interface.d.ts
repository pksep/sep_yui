import { IDataTestIdProp } from '../../../common/dataTestidProps';

export interface ITabsEmit {
    (e: 'unmount-tab', id: number): void;
}
export interface ITabsProps extends IDataTestIdProp {
    defaultActiveTabId?: number;
    tabCount: number;
}
