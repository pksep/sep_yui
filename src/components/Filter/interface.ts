import { FilterType } from './enum';

export interface IFilterProps {
  text?: string;
  type: FilterType;
  choosed: boolean;
}
