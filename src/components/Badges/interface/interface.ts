import { BadgesTypeEnum } from './../enum/enum';
import type { IDataTestIdProp } from '@/common/dataTestidProps';

export interface IBadgesProps extends IDataTestIdProp {
  text: string;
  type: BadgesTypeEnum;
  choosed: boolean;
  disabled?: boolean;
}
