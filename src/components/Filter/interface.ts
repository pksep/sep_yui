import { IconNameEnum } from '../Icon/enum';
import { FilterType } from './enum';

export interface IFilterOption {
  value: string;
  type: string;
}

export interface IStateItem extends IFilterOption {
  choose: boolean;
}

export interface IFilterProps {
  title: string;
  iconName?: IconNameEnum;
  multiselect?: boolean;
  options: string[] | IFilterOption[];
  defaultValue?: string | string[];
  closeOnSelect?: boolean;
  searchable?: boolean;
  type: FilterType;
}
