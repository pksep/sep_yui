import { IDataTestIdProp } from '../../../common/dataTestidProps.ts';

export interface IRadioProps extends IDataTestIdProp {
  name: string;
  modelValue: string;
  disabled?: boolean;
}
