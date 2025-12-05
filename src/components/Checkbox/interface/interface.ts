import {
  CheckboxSizeEnum,
  CheckboxCircularEnum,
  CheckboxColorEnum
} from '../enum/enum';
import { IDataTestIdProp } from '@/common/dataTestidProps';

export interface ICheckboxProps extends IDataTestIdProp {
  size?: CheckboxSizeEnum;
  circular?: CheckboxCircularEnum;
  color?: CheckboxColorEnum;
  checked?: boolean;
  modelValue?: boolean;
  disabled?: boolean;
}
