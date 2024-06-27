import { ISwitchProps } from '@/components/Switch/interface/interface';
export interface IMenuProps {
  name: string;
  role: string;
  path: string;
  items?: ISwitchProps;
  closeAfterClick: boolean;
}
