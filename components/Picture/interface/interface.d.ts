import { PictureEnum } from '../enums/enums';
import { IDataTestIdProp } from '../../../common/dataTestidProps';

export interface IPictureProps extends IDataTestIdProp {
    type: PictureEnum;
    alt?: string;
    url?: string;
    caption?: string;
}
