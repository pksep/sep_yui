import { ISwitchProps } from '../../Switch/interface/interface';
import { IDataTestIdProp } from '../../../common/dataTestidProps';
import { IconNameEnum } from '../../Icon/enum/enum';
import { MenuTypeEnum } from '../enum/enum';

interface IUserType {
    name: string;
    role: string;
    avatar: string;
}
export interface IAdminPanel {
    user: IUserType;
}
export interface IMenuLanguagesProps {
    languages?: ISwitchProps;
}
export interface IThemeProps {
    isBlackTheme?: boolean;
}
export interface IMenuProps extends Partial<IAdminPanel>, IMenuLanguagesProps, IThemeProps, IDataTestIdProp {
    closeAfterClick?: boolean;
    menuOpen?: boolean;
    categories?: MenuTypeEnum[];
    texts?: Partial<Record<MenuTypeEnum, string>>;
}
export interface IMenuItemProps extends IDataTestIdProp {
    active?: boolean;
    disabled?: boolean;
    dataTestid: string;
    iconName: IconNameEnum;
    text: string;
    menuType: MenuTypeEnum;
}
export {};
