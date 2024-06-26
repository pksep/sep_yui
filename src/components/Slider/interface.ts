/**
 * @fix type - удалить, будем получать автоматически
 **/
type SliderItem = { type?: string; path: string };

export interface ISliderProps {
  items: SliderItem[];
  defaultIndex?: number;
}
