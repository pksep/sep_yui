import { IOptionsObjectWithHint } from '../../components/Select/interface/interface';

declare const isOptionsObjectWithHint: (options: unknown) => options is IOptionsObjectWithHint;
declare const isArrayOfOptionsObjectWithHint: (options: unknown) => options is IOptionsObjectWithHint[];
export default isOptionsObjectWithHint;
export { isArrayOfOptionsObjectWithHint };
