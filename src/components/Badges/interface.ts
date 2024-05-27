import { BadgesType } from './enum';

export interface IBadgesProps {
  text: BadgesType.all;
  type: BadgesType.default;
  choosed: boolean;
}
