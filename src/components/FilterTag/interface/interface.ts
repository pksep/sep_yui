import { IconNameEnum } from '../../Icon/enum/enum';
import { BadgesTypeEnum } from '@/components/Badges/enum/enum.ts';
import type { IDataTestIdProp } from '@/common/dataTestidProps';

export interface IFilterTagOption extends IDataTestIdProp {
  value: string;
  type: BadgesTypeEnum;
  label: string;
}

export interface IFilterTagProps extends IDataTestIdProp {
  title?: string;
  iconName?: IconNameEnum;
  options: IFilterTagOption[];
  selectedValues?: string[];
  multiply?: boolean;
  maxShowCount?: number;
  showClearButton?: boolean;
  disallowNull?: boolean;
}
