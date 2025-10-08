import { SizesEnum } from '../../../common/sizes.ts';
import { IDataTestIdProp } from '../../../common/dataTestidProps';

export interface IInputNumberProps extends IDataTestIdProp {
    inputMessage: string;
    modelValue?: number;
    required?: boolean;
    isInteger?: boolean;
    min?: number;
    max?: number;
    size?: SizesEnum.small | SizesEnum.medium;
    modelModifiers?: object;
}
export interface IState {
    isPressed: boolean;
    inputElement: number | string;
}
