import { IconNameEnum } from '../Icon/enum';

export type resultSearchType = {
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
  globalResultsFunction?: () => resultSearchType[];
  isShowResult?: boolean;
  isShowList?: boolean;
  isShowButtonHistory?: boolean;
  searchValue?: string;
}
