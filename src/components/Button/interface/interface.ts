import { SizesEnum } from '@/common/sizes';
import { ButtonTypeEnum } from '../enum/enum';
import type { IDataTestIdProp } from '@/common/dataTestidProps';

export interface IButtonProps extends IDataTestIdProp {
  disabled?: boolean;
  size?:
    | SizesEnum.small
    | SizesEnum.medium
    | SizesEnum.large
    | SizesEnum.little;
  type?: ButtonTypeEnum;
  pill?: boolean;
  backgroundColor?: string;
  color?: string;
}
