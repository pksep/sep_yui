import { TextareaTypeEnum } from '../enum';

export interface ITextareaProps {
    placeholder?: string;
    inputMessage?: string;
    required?: boolean;
    maxlength?: number;
    modelValue: string;
    readonly?: boolean;
    type?: TextareaTypeEnum;
}
