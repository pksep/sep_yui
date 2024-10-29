import { MessageTypes } from '../enum/enum';

interface CustomMessageFields {
  title?: string;
  description: string;
}

export interface IPushNotificationProps {
  messageType: MessageTypes;
  messageField: CustomMessageFields;
  width: string;
}
