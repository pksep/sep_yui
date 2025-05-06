import type { IDataTestIdProp } from '@/common/dataTestidProps';
import { ModalAnimateEnum } from '@/components/Modal/enum';

export interface IDialogProps extends IDataTestIdProp {
  open: boolean;
  width?: string;
  height?: string;
}

export interface IModalProps extends IDialogProps {
  animateType?: ModalAnimateEnum;
}
