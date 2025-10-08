import { IDataTestIdProp } from '../../../common/dataTestidProps';

export interface IAvatar extends IDataTestIdProp {
    initials?: string;
    url?: string;
    isIcon?: boolean;
    alt?: string;
    defaultImage?: string;
}
