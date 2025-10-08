import { IDataTestIdProp } from '../../../common/dataTestidProps';

export interface IRadioProps<T> extends IDataTestIdProp {
    name: string;
    value: T;
    disabled?: boolean;
}
