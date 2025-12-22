import { IDataTestIdProp } from '../../../common/dataTestidProps';
import { IModalEmit, IModalProps } from '../../Modal/interface/interface';

export type SliderItem = {
    path: string;
};
export type IFile = {
    path: string;
};
export interface ISliderProps extends IDataTestIdProp {
    items: SliderItem[];
    defaultIndex?: number;
}
export interface ISliderModalProps extends IDataTestIdProp, IModalProps, ISliderProps {
}
export interface ISliderModalEmit extends IModalEmit {
}
export interface ISlider {
    files: IFile[];
    file: IFile | null;
    currentIndex: number;
    extension: null | string;
    filePath: null | string;
    isShowSliderModal: boolean;
    indexModal: number;
}
