import { BadgesTypeEnum } from './../enum/enum';

export interface IBadgesProps {
  text: string;
  type: BadgesTypeEnum;
  choosed: boolean;
  disabled?: boolean;
}
