import { TextareaTypeEnum } from '../enum';
import { IDataTestIdProp } from '../../../common/dataTestidProps';
import { ISpellcheckProps } from '../../../common/spellcheck';

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
