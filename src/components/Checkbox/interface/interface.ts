import { CheckboxSizeEnum, CheckboxCircularEnum } from '../enum/enum';
import { IDataTestIdProp } from '@/common/dataTestidProps';

export interface ICheckboxProps extends IDataTestIdProp {
  size?: CheckboxSizeEnum;
  circular?: CheckboxCircularEnum;
  checked?: boolean;
  modelValue?: boolean;
  disabled?: boolean;
}
