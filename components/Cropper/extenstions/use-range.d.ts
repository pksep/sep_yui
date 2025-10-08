export interface IOptionsRange {
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
}
declare const useRange: (options?: IOptionsRange) => {
    value: import('vue').Ref<number, number>;
    min: number;
    max: number;
    step: number;
    getCorrectValue: (value: number) => number;
};
export default useRange;
