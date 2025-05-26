import { IconNameEnum } from '../../Icon/enum/enum';
import type { IDataTestIdProp } from '@/common/dataTestidProps';

export type ResultSearchType = {
  nameArea: string;
  searchResult: string;
  icon?: IconNameEnum;
  [key: string]: unknown;
};

export interface ISearchProps extends IDataTestIdProp {
  defaultValue?: string;
  placeholder?: string;
  showHistory?: boolean;
  global?: boolean;
  options?: string[];
  globalResultsFunction?: ResultSearchType[];
  isShowList?: boolean;
  isShowButtonHistory?: boolean;
  searchValue?: string;
  width?: string;
  height?: string;
  modelValue: string;
}
