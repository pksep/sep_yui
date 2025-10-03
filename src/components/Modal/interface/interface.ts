import type { IDataTestIdProp } from '@/common/dataTestidProps';
import { ModalAnimateEnum } from '@/components/Modal/enum';

export interface IDialogProps extends IDataTestIdProp {
  open: boolean;
  position?: 'right' | 'center';
  width?: string;
  height?: string;
}

export interface IModalProps extends IDialogProps {
  animateType?: ModalAnimateEnum;
}
