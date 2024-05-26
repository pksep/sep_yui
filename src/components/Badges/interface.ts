import { BadgesType } from './enum';

export interface IBadgesProps {
  text: BadgesType.text;
  type: BadgesType.default;
  choosed: boolean;
}
