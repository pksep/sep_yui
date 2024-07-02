import { SizesEnum } from '@/common/sizes';
import { ButtonTypeEnum } from '../enum/enum';

export interface IButtonProps {
  disabled: boolean;
  size: SizesEnum.small | SizesEnum.medium | SizesEnum.large;
  type: ButtonTypeEnum;
  pill?: boolean;
  backgroundColor?: string;
  color?: string;
}
