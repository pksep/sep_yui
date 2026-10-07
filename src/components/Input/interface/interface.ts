import { TextFieldEnum } from '../enum/enum';
import type { IDataTestIdProp } from '@/common/dataTestidProps';
import type { ISpellcheckProps } from '@/common/spellcheck';

export interface IInputProps extends IDataTestIdProp, ISpellcheckProps {
  placeholder?: string;
  inputId?: string;
  ariaLabel?: string;
  ariaDescribedby?: string;
  inputMessage?: string;
  type?: TextFieldEnum;
  required?: boolean;
  modelValue?: string;
  hideClearButton?: boolean;
  autocomplete?: string;
  maxlength?: number;
  modelModifiers?: object;
}

export interface IInputEmit {
  (e: 'update:modelValue', value: string): void;
}
