export interface ISwitchProps {
    items: string[];
    defaultValue?: string;
    isIcons?: boolean;
}
export interface IChangeSwitchEmit {
    index: number;
    value: string;
}
