import { IDataTestIdProp } from '../../../common/dataTestidProps';
import { IModalEmit, IModalProps } from '../../Modal/interface/interface';

export type SliderPathError = {
    error?: string;
    message?: string;
};
export type SliderPath = string | SliderPathError;
export type SliderItem = {
    path: SliderPath;
    name?: string;
    file?: File;
};
export type IFile = {
    path: string;
    name?: string;
    file?: File;
};
export interface ISliderProps extends IDataTestIdProp {
    items: SliderItem[];
    defaultIndex?: number;
}
export interface ISliderModalProps extends IDataTestIdProp, IModalProps {
    items: IFile[];
    defaultIndex?: number;
}
export interface ISliderModalEmit extends IModalEmit {
}
export interface ISlider {
    files: SliderItem[];
    file: SliderItem | null;
    currentIndex: number;
    extension: null | string;
    filePath: null | string;
    isShowSliderModal: boolean;
    indexModal: number;
    isLoad: boolean;
    isError: boolean;
    errorText: string | null;
}
