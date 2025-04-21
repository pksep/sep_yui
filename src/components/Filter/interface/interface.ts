import { IconNameEnum } from '../../Icon/enum/enum';
import type { IDataTestIdProp } from '@/common/dataTestidProps';

export interface IFilterOption {
  value: string;
  type: string;
}

export interface IStateItem extends IFilterOption {
  choose: boolean;
}

export interface IFilterProps extends IDataTestIdProp {
  title: string;
  iconName?: IconNameEnum;
  multiselect?: boolean;
  options: string[] | IFilterOption[];
  defaultValue?: string | string[];
  closeOnSelect?: boolean;
  searchable?: boolean;
}
