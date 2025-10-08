import { MessageTypeEnum } from '../enum/enum';
import { IDataTestIdProp } from '../../../common/dataTestidProps';

export interface IPushNotificationProps extends IDataTestIdProp {
    type: MessageTypeEnum;
    title?: string;
    pushKey: number;
    description?: string;
    timeout?: number;
    showPopover?: boolean;
}
