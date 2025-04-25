import { IconNameEnum } from '../../Icon/enum/enum';
import { PopoverHoverEnum } from '../enums/enums';
import type { IDataTestIdProp } from '@/common/dataTestidProps';
import { TTooltipPosition } from '@/components/Tooltip/interface/interface.ts';

export interface IPopoverOption {
  value: string;
  function: () => void;
}

export interface IPopoverProps extends IDataTestIdProp {
  isShow?: boolean;
  iconName?: IconNameEnum;
  options: IPopoverOption[];
  tooltip?: string;
  tooltipPosition?: TTooltipPosition;
}

export interface IPopoverHoverProps extends IDataTestIdProp {
  position: PopoverHoverEnum;
}
