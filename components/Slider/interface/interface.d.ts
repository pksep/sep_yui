import { IDataTestIdProp } from '../../../common/dataTestidProps';

type SliderItem = {
    path: string;
};
type IFile = {
    path: string;
};
export interface ISliderProps extends IDataTestIdProp {
    items: SliderItem[];
    defaultIndex?: number;
}
export interface ISlider {
    files: IFile[];
    file: IFile | null;
    currentIndex: number;
    extension: null | string;
}
export {};
