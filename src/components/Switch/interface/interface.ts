export interface ISwitchProps {
  items: string[];
  defaultValue?: string;
}

export interface IChangeSwitchEmit {
  index: number;
  value: string;
}
