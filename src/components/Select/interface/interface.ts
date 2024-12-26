interface OptionsObject {
  key: string;
  value: string;
}

export interface IOptionsProps {
  options: string[];
  defaultOption?: string;
  class?: string;
}

export interface ISelectListProps {
  isOpened: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cn?: any;
}

export interface IFilterProps extends Omit<IOptionsProps, 'options'> {
  options: string[] | OptionsObject[];
  title: string;
  noOptionText?: string;
}
