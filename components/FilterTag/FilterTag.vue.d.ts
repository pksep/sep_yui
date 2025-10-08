import { IFilterTagProps, IFilterTagOption } from './interface/interface';
import { IconNameEnum } from '../Icon/enum/enum';

declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IFilterTagProps>, {
    iconName: IconNameEnum;
    options: () => never[];
    selectedValues: () => never[];
    maxShowCount: number;
    multiply: boolean;
    showClearButton: boolean;
    dataTestid: string;
    disallowNull: boolean;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    change: (value: string[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<IFilterTagProps>, {
    iconName: IconNameEnum;
    options: () => never[];
    selectedValues: () => never[];
    maxShowCount: number;
    multiply: boolean;
    showClearButton: boolean;
    dataTestid: string;
    disallowNull: boolean;
}>>> & Readonly<{
    onChange?: ((value: string[]) => any) | undefined;
}>, {
    dataTestid: string;
    options: IFilterTagOption[];
    multiply: boolean;
    iconName: IconNameEnum;
    selectedValues: string[];
    maxShowCount: number;
    showClearButton: boolean;
    disallowNull: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
