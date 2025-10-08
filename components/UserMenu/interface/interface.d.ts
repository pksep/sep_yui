import { ISwitchProps } from '../../Switch/interface/interface';
import { IDataTestIdProp } from '../../../common/dataTestidProps';

type userType = {
    name: string;
    role: string;
    avatar: string;
};
export interface IAdminPanel {
    user: userType;
}
export interface IMenuLanguagesProps {
    languages?: ISwitchProps;
}
export interface IThemeProps {
    isBlackTheme?: boolean;
}
export interface IMenuProps extends IAdminPanel, IMenuLanguagesProps, IThemeProps, IDataTestIdProp {
    closeAfterClick?: boolean;
}
export {};
