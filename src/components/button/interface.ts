import { SizesEnum } from '@/common/sizes';
import { ButtonType } from './enum';

export interface IButtonProps {
  disabled: boolean;
  size: SizesEnum.small | SizesEnum.medium | SizesEnum.large;
  type: ButtonType;
  pill?: boolean;
  backgroundColor?: string;
}
