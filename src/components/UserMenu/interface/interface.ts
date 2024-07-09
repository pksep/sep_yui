import { ISwitchProps } from '@/components/Switch/interface/interface';

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

export interface IMenuProps
  extends IAdminPanel,
    IMenuLanguagesProps,
    IThemeProps {
  closeAfterClick?: boolean;
}
