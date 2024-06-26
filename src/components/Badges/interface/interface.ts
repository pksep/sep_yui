import { BadgesTypeEnum } from './enum';

export interface IBadgesProps {
  text: string;
  type: BadgesTypeEnum;
  choosed: boolean;
  disabled?: boolean;
}
