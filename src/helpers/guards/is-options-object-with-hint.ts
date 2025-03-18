import { IOptionsObjectWithHint } from '@/components/Select/interface/interface';

const isOptionsObjectWithHint = (
  options: unknown
): options is IOptionsObjectWithHint => {
  return options !== null && typeof options === 'object' && 'hint' in options;
};

const isArrayOfOptionsObjectWithHint = (
  options: unknown
): options is IOptionsObjectWithHint[] => {
  return (
    options !== null &&
    Array.isArray(options) &&
    isOptionsObjectWithHint(options[0])
  );
};

export default isOptionsObjectWithHint;
export { isArrayOfOptionsObjectWithHint };
