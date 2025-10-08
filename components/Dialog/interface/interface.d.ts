import { IDataTestIdProp } from '../../../common/dataTestidProps';

export interface IDialogProps extends IDataTestIdProp {
    open: boolean;
    width?: string;
    height?: string;
    noClose?: boolean;
}
