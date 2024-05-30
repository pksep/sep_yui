import { IconNameEnum } from '../Icon/enum';
import { FilterType } from './enum';

type TypeItems = string | { value: string; type: string };
export interface IFilterProps {
  title: FilterType;
  iconName?: IconNameEnum;
  multiselect?: boolean;
  items: TypeItems[];
  defaultValue?: string | string;
}
