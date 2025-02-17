interface ClassObject {
  [key: string]: boolean;
}

type ClassArray = Array<string | ClassObject>;

type VueClasses = ClassObject | ClassArray | string;

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
  disableOpen?: boolean;
  headerClasses?: VueClasses;
  optionsClasses?: VueClasses;
  disabled?: boolean;
}

export interface IFilterProps extends Omit<IOptionsProps, 'options'> {
  options: string[] | OptionsObject[];
  title: string;
  noOptionText?: string;
}

export interface IComboboxProps extends IOptionsProps {
  placeholder?: string;
  disableOpen?: boolean;
}
