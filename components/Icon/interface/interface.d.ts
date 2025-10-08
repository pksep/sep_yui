import { IconNameEnum } from './../enum/enum';
import { ColorsEnum } from '../../../common/colors';
import { IDataTestIdProp } from '../../../common/dataTestidProps';

export interface IIconPorps extends IDataTestIdProp {
    height?: number;
    width?: number;
    name: IconNameEnum;
    color?: ColorsEnum | string;
}
export interface IVectorIcon {
    name: string;
    viewbox?: string;
    fill?: string;
    style: 'line' | 'solid';
    path: string;
}
