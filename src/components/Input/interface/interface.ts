import { TextFieldEnum } from '../enum/enum';

export interface IInputProps {
  placeholder?: string;
  inputMessage: string;
  type?: TextFieldEnum;
  required?: boolean;
  modelValue?: string;
  hideClearButton?: boolean;
  autocomplete?: string;
  modelModifiers: object;
}

export interface IInputEmit {
  (e: 'update:modelValue', value: string): void;
}
