import { TextFieldTypes } from "../enum/enum"

export interface IInputProps {
  placeholder?: string;
  inputMessage: string;
  type: TextFieldTypes;
  required?: boolean;
}
