export type TTooltipPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'left-top'
  | 'left-center'
  | 'left-bottom'
  | 'right-top'
  | 'right-center'
  | 'right-bottom';
export type TTooltipSize = 'small' | 'medium' | 'large';
export type TTooltipType = 'white' | 'black' | 'blue';

export interface ITooltipProps {
  hint: string;
  isShow?: boolean;
  isCanShow?: boolean;
  position?: TTooltipPosition;
  size?: TTooltipSize;
  type?: TTooltipType;
}
