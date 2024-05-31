import { IconNameEnum } from '../Icon/enum';

export interface IPropsItem {
  value: string;
  type: string;
}

export interface IStateItem extends IPropsItem {
  choose: boolean;
}

export interface IFilterProps {
  title: string;
  iconName?: IconNameEnum;
  multiselect?: boolean;
  items: string[] | IPropsItem[];
  defaultValue?: string | string[];
}
