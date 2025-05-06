import { IDataTestIdProp } from '../../../common/dataTestidProps.ts';

export interface IRadioProps<T> extends IDataTestIdProp {
  name: string;
  value: T;
  disabled?: boolean;
}
