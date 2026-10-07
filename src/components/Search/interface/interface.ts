import { IconNameEnum } from '../../Icon/enum/enum';
import type { IDataTestIdProp } from '@/common/dataTestidProps';
import type { ISpellcheckProps } from '@/common/spellcheck';

export type ResultSearchType = {
  nameArea: string;
  searchResult: string;
  icon?: IconNameEnum;
  [key: string]: unknown;
};

export interface ISearchProps extends IDataTestIdProp, ISpellcheckProps {
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

export interface IHistoryProps extends Omit<ISearchProps, 'modelValue'> {
  modelValue: string[];
}
