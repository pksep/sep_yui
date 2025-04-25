import { TextareaTypeEnum } from '@/components/Textarea/enum';
import type { IDataTestIdProp } from '@/common/dataTestidProps';

export interface ITextareaProps extends IDataTestIdProp {
  placeholder?: string;
  inputMessage?: string;
  required?: boolean;
  maxlength?: number;
  modelValue: string;
  readonly?: boolean;
  type?: TextareaTypeEnum;
  modelModifiers: object;
}
