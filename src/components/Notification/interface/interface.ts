import { MessageTypeEnum } from '../enum/enum';
import type { IDataTestIdProp } from '@/common/dataTestidProps';

export interface IPushNotificationProps extends IDataTestIdProp {
  type: MessageTypeEnum;
  title?: string;
  pushKey: number;
  description?: string;
  timeout?: number;
  showPopover?: boolean;
}
