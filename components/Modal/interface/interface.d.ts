import { IDataTestIdProp } from '../../../common/dataTestidProps';
import { ModalAnimateEnum } from '../enum';

export interface IDialogProps extends IDataTestIdProp {
    open: boolean;
    position?: 'right' | 'center' | 'bottom';
    width?: string;
    height?: string;
}
export interface IModalProps extends IDialogProps {
    animateType?: ModalAnimateEnum;
}
