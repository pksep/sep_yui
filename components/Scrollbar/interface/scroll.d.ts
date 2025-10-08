import { IDataTestIdProp } from '../../../common/dataTestidProps';

export interface IScrollbarProps extends IDataTestIdProp {
    options?: Record<string, unknown>;
    tag?: string | undefined;
    class?: unknown;
    style?: unknown;
    thrumbStyle?: {
        y?: {
            background?: string;
            width?: string;
        };
        x?: {
            background?: string;
            width?: string;
        };
    };
    railStyle?: {
        y?: {
            background?: string;
            right?: string;
        };
        x?: {
            background?: string;
            right?: string;
        };
    };
}
