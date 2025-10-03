import { IDataTestIdProp } from '@/common/dataTestidProps';
import { ToggleEnum } from '../enums/enums';

export interface IToggleProps extends IDataTestIdProp {
  disabled?: boolean;
  backgroundColor?: string;
  type?: ToggleEnum;
}
