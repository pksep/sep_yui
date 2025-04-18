import { MessageTypeEnum } from '../enum/enum';

export interface IPushNotificationProps {
    type: MessageTypeEnum;
    title?: string;
    pushKey: number;
    description?: string;
    timeout?: number;
    showPopover?: boolean;
}
