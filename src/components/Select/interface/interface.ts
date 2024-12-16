export interface IOptionsProps {
  options: string[];
  defaultOption?: string;
  class?: string;
}

export interface ISelectListProps {
  isOpened: boolean;
  cn?: string | object;
}

export interface IFilterProps extends IOptionsProps {
  title: string;
}
