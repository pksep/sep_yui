import type { IDataTestIdProp } from '@/common/dataTestidProps';

export interface ISwitchProps extends IDataTestIdProp {
  items: string[];
  defaultValue?: string;
  isIcons?: boolean;
}

export interface IChangeSwitchEmit {
  index: number;
  value: string;
}
