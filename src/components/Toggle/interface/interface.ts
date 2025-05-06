import { IDataTestIdProp } from '../../../common/dataTestidProps.ts';
import { ToggleEnum } from '../enums/enums';

export interface IToggleProps extends IDataTestIdProp {
  disabled?: boolean;
  backgroundColor?: string;
  type?: ToggleEnum;
}
