import { ISwitchProps } from '@/components/Switch/interface/interface';

type userT = {
  name: string;
  role: string;
  path: string;
};

export interface IAdminPanel {
  user: userT;
}

export interface IMenuLanguagesProps {
  languages?: ISwitchProps;
}

export interface IMenuProps extends IAdminPanel, IMenuLanguagesProps {
  closeAfterClick?: boolean;
}
