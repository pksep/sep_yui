import { CheckboxSizeEnum, CheckboxCircularEnum } from '../enum/enum';

export interface ICheckboxProps {
  size?: CheckboxSizeEnum;
  circular?: CheckboxCircularEnum;
  checked?: boolean;
}
