import { OptionsObject } from '@/components/Select/interface/interface';

export default function isOptionsObject(
  value: unknown
): value is OptionsObject {
  return value !== null && typeof value === 'object' && 'key' in value;
}

export function isArrayOptionsObject(value: unknown): value is OptionsObject[] {
  return (
    value !== null &&
    Array.isArray(value) &&
    typeof value[0] === 'object' &&
    'key' in value[0]
  );
}
