import { IconNameEnum } from './../enum/enum';
import { ColorsEnum } from '../../../common/colors';

export interface IIconPorps {
  height?: number;
  width?: number;
  name: IconNameEnum;
  color?: ColorsEnum | string;
}

export interface IVectorIcon {
  name: string;
  viewbox?: string;
  style: 'line' | 'solid';
  fill?: string;
  path: string;
}
