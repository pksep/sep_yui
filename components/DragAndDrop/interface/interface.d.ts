import { IDataTestIdProp } from '../../../common/dataTestidProps';

export interface IDragAndDropProps extends IDataTestIdProp {
    singleFileMode?: boolean;
    title?: string;
    type?: 'primary' | 'secondary';
}
