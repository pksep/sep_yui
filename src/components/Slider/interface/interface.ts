type SliderItem = { path: string };

type IFile = { path: string };

export interface ISliderProps {
  items: SliderItem[];
  defaultIndex?: number;
}

export interface ISlider {
  files: IFile[];
  file: IFile | null;
  currentIndex: number;
  extension: null | string;
}
