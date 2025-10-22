import type { IDataTestIdProp } from '@/common/dataTestidProps';
import { IconNameEnum } from '@/components/Icon/enum/enum';

export interface ISwitchProps extends IDataTestIdProp {
  items: IconNameEnum[];
  defaultValue?: IconNameEnum;
  isIcons?: boolean;
  theme?: 'default' | 'contrast';
}

export interface IChangeSwitchEmit {
  index: number;
  value: string;
}
