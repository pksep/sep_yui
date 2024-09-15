export interface IInputProps {
  placeholder: string;
  inputMessage: string;
  inputType: 'text' | 'email' | 'password' | 'tel' | 'url' | 'week';
  required: boolean;
}
