import { IconNameEnum } from '../../Icon/enum/enum';
import { PopoverHoverEnum } from '../enums/enums';
import type { IDataTestIdProp } from '@/common/dataTestidProps';

export interface IPopoverOption {
    value: string;
    function: () => void;
}

export interface IPopoverProps extends IDataTestIdProp {
    iconName?: IconNameEnum;
    options: IPopoverOption[];
    tooltip?: string;
}

export interface IPopoverHoverProps extends IDataTestIdProp {
    position: PopoverHoverEnum;
}
