import { IconNameEnum } from '../../Icon/enum/enum';
import { BadgesTypeEnum } from '@/components/Badges/enum/enum.ts';

export interface IFilterTagOption {
  value: string;
  type: BadgesTypeEnum;
  label: string;
}

export interface IFilterTagProps {
  title?: string;
  iconName?: IconNameEnum;
  options: IFilterTagOption[];
  selectedValues?: string[];
  maxShowCount?: number;
}
