export interface IInputNumberProps {
  inputMessage: string;
  required?: boolean;
  min?: number;
  max?: number;
}

export interface IState {
  isPressed: boolean;
  inputElement: number | string;
}
