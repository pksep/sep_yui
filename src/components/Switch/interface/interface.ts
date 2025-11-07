import type { IDataTestIdProp } from '@/common/dataTestidProps';

export interface SwitchItem {
  label: string;
  value: string;
}

type ItemsType = Array<string | SwitchItem>;

export interface ISwitchProps extends IDataTestIdProp {
  items: ItemsType;
  defaultValue?: string;
  isIcons?: boolean;
  theme?: 'default' | 'contrast';
}

export interface IChangeSwitchEmit {
  index: number;
  value: string;
}
