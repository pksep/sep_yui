import { ISwitchProps } from '@/components/Switch/interface/interface';

/**
 * TODO: дать осознанное название
 */
type userT = {
  name: string;
  role: string;
  avatar: string;
};

export interface IAdminPanel {
  user: userT;
}

export interface IMenuLanguagesProps {
  languages?: ISwitchProps;
}

export interface IThemeProps {
  isBlackTheme?: boolean;
}

export interface IMenuProps
  extends IAdminPanel,
    IMenuLanguagesProps,
    IThemeProps {
  closeAfterClick?: boolean;
}
