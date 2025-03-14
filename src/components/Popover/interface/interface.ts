import { IconNameEnum } from '../../Icon/enum/enum';
import { PopoverHoverEnum } from '../enums/enums';

export interface IPopoverOption {
  value: string;
  function: () => void;
}

export interface IPopoverProps {
  iconName?: IconNameEnum;
  options: IPopoverOption[];
}

export interface IPopoverHoverProps {
  position: PopoverHoverEnum;
}
