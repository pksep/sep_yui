interface ClassObject {
    [key: string]: boolean;
}
type ClassArray = Array<string | ClassObject>;
type VueClasses = ClassObject | ClassArray | string;
export type TOptions = string[] | OptionsObject[];
export interface OptionsObject {
    key: string;
    value: string;
}
export interface IOptionsObjectWithHint extends OptionsObject {
    hint: string;
}
export interface IOptionsProps {
    options: string[] | OptionsObject[] | IOptionsObjectWithHint[];
    defaultOption?: string;
    class?: string;
    disabled?: boolean;
}
export interface ISelectListProps {
    isOpened: boolean;
    disableOpen?: boolean;
    headerClasses?: VueClasses;
    optionsClasses?: VueClasses;
    disabled?: boolean;
}
export interface IFilterProps extends Omit<IOptionsProps, 'options'> {
    options: TOptions;
    title: string;
    noOptionText?: string;
    enableClearAll?: boolean;
}
export interface IComboboxProps extends IOptionsProps {
    options: string[];
    placeholder?: string;
    disableOpen?: boolean;
}
export interface IBaseFilterProps extends Omit<IOptionsProps, 'options'> {
    options: OptionsObject[] | IOptionsObjectWithHint[];
    title: string;
    isSearch?: boolean;
    isPosibleToClear?: boolean;
    isShowMiniOptions?: boolean;
}
export interface IChoosenMiniOptionsProps {
    options: OptionsObject[] | IOptionsObjectWithHint[];
}
export interface IChoosenMiniOptionsEmits {
    (e: 'remove', key: string): void;
}
export {};
