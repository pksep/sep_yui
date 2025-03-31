export interface IRangeProps {
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

export interface IRangeEmit {
  (e: 'unmount-change', value: number): void;
  (e: 'unmount-input', value: number): void;
}
