import { PictureEnum } from '../enums/enums';

export interface IPictureProps {
    type: PictureEnum;
    alt?: string;
    url?: string;
    caption?: string;
}
