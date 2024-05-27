import { BadgesType } from './enum';

export interface IBadgesProps {
  text: string;
  type: BadgesType.default;
  choosed: boolean;
}
