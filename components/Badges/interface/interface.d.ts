import { BadgesTypeEnum } from './../enum/enum';
import { IDataTestIdProp } from '../../../common/dataTestidProps';

export interface IBadgesProps extends IDataTestIdProp {
    text: string;
    type?: BadgesTypeEnum;
    choosed?: boolean;
    disabled?: boolean;
}
