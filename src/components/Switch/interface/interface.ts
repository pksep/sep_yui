import type { IDataTestIdProp } from '@/common/dataTestidProps';
import type { IconNameEnum } from '@/components/Icon/enum/enum';

export interface SwitchItem {
  label: string;
  value: string;
  icon?: IconNameEnum;
}

type ItemsType = Array<string | SwitchItem>;

export interface ISwitchProps extends IDataTestIdProp {
  items: ItemsType;
  defaultValue?: string;
  isIcons?: boolean;
  disabled?: boolean;
  theme?: 'default' | 'contrast';
}

export interface IChangeSwitchEmit {
  index: number;
  value: string;
}
