import { IconNameEnum } from '../../Icon/enum/enum';

export type ResultSearchType = {
  icon: IconNameEnum;
  nameArea: string;
  searchResult: string;
};

export interface ISearchProps {
  defaultValue?: string;
  placeholder?: string;
  showHistory?: boolean;
  global?: boolean;
  options?: string[];
  globalResultsFunction?: () => ResultSearchType[];
  isShowResult?: boolean;
  isShowList?: boolean;
  isShowButtonHistory?: boolean;
  searchValue?: string;
  width?: string;
  height?: string;
}
