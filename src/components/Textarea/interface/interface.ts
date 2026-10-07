import { TextareaTypeEnum } from '@/components/Textarea/enum';
import type { IDataTestIdProp } from '@/common/dataTestidProps';
import type { ISpellcheckProps } from '@/common/spellcheck';

export interface ITextareaProps extends IDataTestIdProp, ISpellcheckProps {
  placeholder?: string;
  inputMessage?: string;
  required?: boolean;
  maxlength?: number;
  modelValue: string;
  readonly?: boolean;
  type?: TextareaTypeEnum;
  modelModifiers: object;
}
