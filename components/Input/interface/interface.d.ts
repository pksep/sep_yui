import { TextFieldEnum } from '../enum/enum';
import { IDataTestIdProp } from '../../../common/dataTestidProps';

export interface IInputProps extends IDataTestIdProp {
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
