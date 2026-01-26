import { IDataTestIdProp } from '../../../common/dataTestidProps';
import { TTooltipPosition } from '../../Tooltip/interface/interface';

interface ClassObject {
    [key: string]: boolean;
}
type ClassArray = Array<string | ClassObject>;
type VueClasses = ClassObject | ClassArray | string;
export type TOptions = string[] | OptionsObject[];
export interface OptionsObject {
    key: string;
    value: string;
    used?: boolean;
}
export interface IOptionsObjectWithHint extends OptionsObject {
    hint: string;
}
export interface IOptionsProps extends IDataTestIdProp {
    options: string[] | OptionsObject[] | IOptionsObjectWithHint[];
    defaultOption?: string;
    class?: string;
    disabled?: boolean;
}
export interface ISelectListProps extends IDataTestIdProp {
    isOpened: boolean;
    isUseAnchor?: boolean;
    disableOpen?: boolean;
    headerClasses?: VueClasses;
    optionsClasses?: VueClasses;
    disabled?: boolean;
}
export interface IFilterProps extends Omit<IOptionsProps, 'options'> {
    options: TOptions;
    title: string;
    noOptionText?: string;
    enableClearAll?: boolean;
}
export interface IComboboxProps extends IOptionsProps {
    options: string[];
    placeholder?: string;
    disableOpen?: boolean;
}
export interface IBaseFilterProps extends Omit<IOptionsProps, 'options'> {
    options: OptionsObject[] | IOptionsObjectWithHint[];
    title: string;
    isSearch?: boolean;
    isPosibleToClear?: boolean;
    isShowMiniOptions?: boolean;
    isUseAnchor?: boolean;
    isOpened?: boolean;
    tooltipPosition?: TTooltipPosition;
    onUnmountPagination?: () => void;
}
export interface IBaseFilterEmit {
    (e: 'change', value: string | string[]): void;
    (e: 'unmount-open', value: boolean): void;
    (e: 'unmount-search', value: string): void;
    (e: 'unmount-search-enter', value: string): void;
    (e: 'unmount-pagination'): void;
}
export interface IChoosenMiniOptionsProps extends IDataTestIdProp {
    options: OptionsObject[] | IOptionsObjectWithHint[];
}
export interface IChoosenMiniOptionsEmits {
    (e: 'remove', key: string): void;
}
export {};
