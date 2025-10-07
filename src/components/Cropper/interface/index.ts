import { IDialogProps } from '../../../components/Modal/interface/interface';

export interface IBaseCropperProps {
  image: File | null;
  max?: number;
  min?: number;
  step?: number;
}

export interface IBaseCropperEmit {
  (e: 'unmount-scale', value: number): void;
}

export interface IModalCropperdAvatar extends IDialogProps {
  image: File | null;
}
