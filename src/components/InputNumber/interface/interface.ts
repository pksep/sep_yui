import { SizesEnum } from '@/common/sizes.ts';

export interface IInputNumberProps {
  inputMessage: string;
  modelValue?: number;
  required?: boolean;
  min?: number;
  max?: number;
  size?: SizesEnum.small | SizesEnum.medium;
  modelModifiers: object;
}

export interface IState {
  isPressed: boolean;
  inputElement: number | string;
}
