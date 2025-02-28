import { IconNameEnum } from '../../Icon/enum/enum';

export interface IPopoverOption {
  value: string;
  function: () => void;
}

export interface IPopoverProps {
  iconName?: IconNameEnum;
  options: IPopoverOption[];
}
