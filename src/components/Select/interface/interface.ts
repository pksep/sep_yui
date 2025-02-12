export interface OptionsObject {
  key: string;
  value: string;
}

export interface IOptionsProps {
  options: string[];
  defaultOption?: string;
  class?: string;
  disabled?: boolean;
}

export interface ISelectListProps {
  isOpened: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cn?: any;
  disableOpen?: boolean;
  disabled?: boolean;
}

export interface IFilterProps extends Omit<IOptionsProps, 'options'> {
  options: string[] | OptionsObject[];
  title: string;
  noOptionText?: string;
}

export interface IComboboxProps extends IOptionsProps {
  placeholder?: string;
}
