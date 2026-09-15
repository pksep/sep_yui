export interface IUserSelectOption {
  key: string;
  value: string;
  hint: string;
  fullName: string;
  serviceNumber: string;
  image: string | null;
}

export interface IUserOptionAvatarProps {
  image?: string | null;
  name: string;
  size?: number;
  borderRadius?: string;
}

export interface IUserMultiSelectProps {
  dataTestid?: string;
  defaultOption?: string;
  options?: IUserSelectOption[];
  title?: string;
  variant?: 'default' | 'task-card';
  isPosibleToClear?: boolean;
  fixedOptions?: boolean;
}
